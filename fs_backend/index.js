const express = require('express')
const fs = require('fs')

const app = express()
const port = 23457
app.get('/loadTemplate', (req, res) => {
    fullFilename='./scala_templates/'+req.query.filename+'.scala'
    fs.readFile(fullFilename, 'utf-8',(err, data) => {
        if (err) return console.log(err.message);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(data)
        console.log('Load '+fullFilename)
    })
})
app.listen(port, () => { console.log(`fs backen listening on port ${port}`) })