const express = require('express')
const fs = require('fs')
const axios = require('axios')
const shell = require('shelljs');

const app = express()
const port = 23457

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var taskList = {};

var templateBegin, templateEnd
fs.readFile('./scala_templates/stable/begin.tp', 'utf-8', (err, data) => {
    if (err) return console.log(err.message);
    templateBegin = data;
})
fs.readFile('./scala_templates/stable/end.tp', 'utf-8', (err, data) => {
    if (err) return console.log(err.message);
    templateEnd = data;
})

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

app.get('/getHDFSTableList', async (req, res) => {
    console.log("Call /getHDFSTablesList");
    shellRes = shell.exec("hdfs dfs -ls /patent/uspto/csv")
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({
        tableList: parseFileNames(shellRes)
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

app.get('/getTable', (req, res) => {
    console.log("Call /getTable");
    headData = [
        { tableTitle: "id" },
        { tableTitle: "姓名" },
        { tableTitle: "性别" },
        { tableTitle: "年龄" },
        { tableTitle: "地址" },
        { tableTitle: "联系方式" },
    ];
    tableData = [
        [{ value: "id20200719" },
        { value: "小明" },
        { value: "男" },
        { value: "20" },
        { value: "北京昌平" },
        { value: "18812349874" },
        ],
        [{ value: "id20220102" },
        { value: "小红" },
        { value: "女" },
        { value: "18" },
        { value: "北京海淀" },
        { value: "18856432547" },
        ],
        [{ value: "id20220717" },
        { value: "小蓝" },
        { value: "未知" },
        { value: "21" },
        { value: "北京朝阳" },
        { value: "16634219856" },
        ],
    ];
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({
        headData: headData,
        tableData: tableData
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