const express = require('express')
const fs = require('fs')
const axios = require('axios')
const shell = require('shelljs');

const app = express()
const port = 23457

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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

app.get('/loadTemplate', (req, res) => {
    console.log("Call /loadTemplate");
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

app.get('/commitTask', async (req, res) => {
    console.log("Call /commitTask");
    fullTask = templateBegin + addSpaces(req.query.executeCode) + templateEnd
    query = {
        className: "ExecObj",
        packageName: "exec"
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
    // console.log(response.data)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
})

app.get('/getTaskData', async (req, res) => {
    console.log("Call /getTaskData");
    // const response = await axios.get("http://localhost:23457/loadTemplate",
    //     {
    //         params: { filename: "tmp" }
    //     });
    // const result = await axios.get("http://localhost:23457/getTable");
    // await sleep(2000)

    const response = await axios.get("http://localhost:19527/patent/publications/query",
        {
            params: { taskID: req.query.taskID }
        });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
        {
            table: response.data,
        }
    )
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