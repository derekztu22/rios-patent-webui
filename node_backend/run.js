const express = require('express')
const fs = require('fs')
const axios = require('axios')
const shell = require('shelljs');
const { setTimeout } = require('core-js');
const { Parser } = require('@json2csv/plainjs')

// Consts
const app = express();
const port = 23457;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const csvParser = new Parser()

// Global var
var taskList = {};
var templateBegin, templateEnd;
var HDFSFileList = {};

// Startup settings
fs.readFile('./scala_templates/stable/begin.tp', 'utf-8', (err, data) => {
    if (err) return console.log(err.message);
    templateBegin = data;
})
fs.readFile('./scala_templates/stable/end.tp', 'utf-8', (err, data) => {
    if (err) return console.log(err.message);
    templateEnd = data;
})

// Functions
function parseFileNames(inputString) {
    var lines = inputString.trim().split('\n');
    var filenames = [];

    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var filePath = line.split(' ').pop();
        var fileNameWithExtension = filePath.split('/').pop();
        var fileName = fileNameWithExtension.split('.csv')[0]; // 移除文件扩展名.csv
        filenames.push(
            {
                tableName: fileName,
                tableHDFSPath: filePath
            }
        );
    }

    return filenames;
}

function addSpaces(inputString) {
    var lines = inputString.split('\n');
    var outputString = '';

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        outputString += '        ' + line + '\n'
    }

    return outputString;
}

async function loadHDFSFileList() {
    var fileList = {
        "csv": [],
        "g_brf_sum_text": [],
        "g_claims": [],
        "g_detail_desc_text": [],
        "g_draw_desc_text": []
    }
    for (const [key, value] of Object.entries(fileList)) {
        var shellRes = await shell.exec(`hdfs dfs -ls /patent/uspto/${key}`)
        fileList[key] = parseFileNames(shellRes)
    }
    HDFSFileList = fileList;
}

function refreshHDFSFileList() {
    loadHDFSFileList()
    setTimeout(refreshHDFSFileList, 1000 * 1800)
}

function GenNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
}

// Routers
app.get('/getHDFSTableList', async (req, res) => {
    console.log("Call /getHDFSTablesList");
    // shellRes = shell.exec("hdfs dfs -ls /patent/uspto/csv")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({
        tableList: HDFSFileList[req.query.tableType]
    })
})

app.get('/getTemplate', (req, res) => {
    console.log("Call /getTemplate");
    fullFilename = './scala_templates/' + req.query.filename + '.scala'
    fs.readFile(fullFilename, 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(data)
        console.log('Load ' + fullFilename)
    })
})

app.get('/submitTask', async (req, res) => {
    console.log("Call /submitTask");
    fullTask = templateBegin + addSpaces(req.query.executeCode) + templateEnd
    console.log(fullTask)
    // await sleep(2000)
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.send({
    //     success:true,
    //     data: {
    //         taskID:123456
    //     }
    // })

    query = {
        className: "ExecObj",
        packageName: "org.rioslab.spark.core.exec"
    }
    queryRouter = "http://localhost:19527/patent/publications/submit?"
    for (const [key, value] of Object.entries(query)) {
        queryRouter += "&" + key + "=" + value
    }
    console.log("Post " + queryRouter)
    const response = await axios.post(queryRouter,
        {
            code: fullTask
        });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
})

app.get('/runTask', async (req, res) => {
    console.log("Call /runTask");
    queryID = req.query.queryID
    console.log(queryID)

    query = {
        className: "ExecObj",
        packageName: "org.rioslab.spark.core.exec"
    }
    queryRouter = "http://localhost:19527/patent/publications/run?"
    for (const [key, value] of Object.entries(query)) {
        queryRouter += "&" + key + "=" + value
    }
    console.log("Post " + queryRouter)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: true })

    runAxios = axios.create()
    runAxios.defaults.timeout = 1000 * 60 * 10
    const response = await runAxios.post(queryRouter);
    taskList[queryID] = response.data

    // await sleep(30000)
    // taskList[queryID] = { data: { output: "fake data" }, success: true }

    console.log(queryID + " finished, add to TaskList")
})

app.get('/taskStatus', async (req, res) => {
    console.log("Call /taskStatus");
    queryID = req.query.queryID
    console.log("taskList: " + Object.keys(taskList))

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (queryID in taskList) {
        res.send({
            status: true,
            data: taskList[queryID]
        })
        delete taskList[queryID]
        console.log(queryID + " removed from TaskList")
    }
    else {
        res.send({
            status: false,
            data: null
        })
    }
})

app.get('/getTaskData', async (req, res) => {
    console.log("Call /getTaskData");
    const response = await axios.get("http://localhost:19527/patent/publications/query",
        {
            params: { taskID: req.query.taskID }
        });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
    const csv = csvParser.parse(a)
    const csvFile = `./task_data/${taskID}.csv`
    fs.open(csvFile, "w", (err, fd) => {
        if (err) {
            console.log(err.message);
        } else {
            fs.write(fd, csv, (err, bytes) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(bytes + ` bytes written to ${csvFile}`);
                }
            })
        }
    })
})

app.get('/downloadTaskData', async (req, res) => {
    console.log("Call /downloadTaskData");
    res.setHeader("Access-Control-Allow-Origin", "*");
    let dlFile = `./task_data/${req.query.taskID}.csv`
    console.log("Request " + dlFile)
    res.download(dlFile, function (error) {
        if (err) {
            console.log(error)
        }
    })
})

app.get('/patentSearch', async (req, res) => {
    console.log("Call /patentSearch");
    var SpringServer = "http://localhost:19527/patent/publications/"
    const response = await axios.get(SpringServer + req.query.patentID);
    console.log(response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data.data)
})

app.listen(port, () => { console.log(`node backend listening on port ${port}`) })
setTimeout(refreshHDFSFileList, 0)