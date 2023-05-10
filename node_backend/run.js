const express = require('express')
const fs = require('fs')
const axios = require('axios')

const app = express()
const port = 23457

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


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
    await sleep(2000)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
        {
            status: true,
            taskID: 123456
        })
})

app.get('/getTaskResponse', async (req, res) => {
    console.log("Call /getTaskResponse");
    const response = await axios.get("http://localhost:23457/loadTemplate",
        {
            params: { filename: "tmp" }
        });
    const result = await axios.get("http://localhost:23457/getTable");
    await sleep(2000)

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(
        {
            output: response.data,
            table: result.data
        }
    )
})

app.get('/patentSearch', async (req, res) => {
    console.log("Call /patentSearch");
    console.log(req.query)
    var SpringServer = "http://localhost:19527/patent/publications/"
    const response = await axios.get(SpringServer + req.query.patentID);
    console.log(response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
})

app.listen(port, () => { console.log(`node backend listening on port ${port}`) })