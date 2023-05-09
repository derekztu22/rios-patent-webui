const express = require('express')
const fs = require('fs')
const axios = require('axios')

const app = express()
const port = 23457

app.get('/loadTemplate', (req, res) => {
    fullFilename = './scala_templates/' + req.query.filename + '.scala'
    fs.readFile(fullFilename, 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(data)
        console.log('Load ' + fullFilename)
    })
})

app.get('/commitTask', async (req, res) => {
    console.log(req.query.executeCode)
    var queryStr = "http://localhost:23457/loadTemplate"
    const response = await axios.get(queryStr,
        {
            params: { filename: "CPC" }
        });
    console.log(response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send('Commit')
})

app.get('/patentSearch', async (req, res) => {
    console.log(req.query)
    var SpringServer = "http://localhost:19527/patent/publications/"
    const response = await axios.get(SpringServer+req.query.patentID);
    console.log(response.data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
})

app.listen(port, () => { console.log(`node backend listening on port ${port}`) })