const express = require('express')
const fs = require('fs')
const axios = require('axios')
const { Parser } = require('@json2csv/plainjs')

const func = require('./func')
const logger = require('./log')
const global = require('./global')
const hive = require('./hiveUtils')
const llm = require('./llmUtils')

const app = express();
var taskList = {};
var llmResponseList = {};
var hiveResponseList = {};

app.get('/getHDFSTableList', async (req, res) => {
    logger.info("Call /getHDFSTablesList");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({
        tableList: func.getHDFSFileList()[req.query.tableType]
    })
})

app.get('/getTemplate', async (req, res) => {
    logger.info("Call /getTemplate");
    const template = await func.loadTemplateFromDisk(req.query.filename)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(template)
})

app.get('/submitTask', async (req, res) => {
    logger.info("Call /submitTask");
    templateContext = func.getTemplateContext()
    fullTask = templateContext.begin + func.addSpaces(req.query.executeCode) + templateContext.end
    logger.debug(fullTask)

    query = {
        className: "ExecObj",
        packageName: "org.rioslab.spark.core.exec"
    }
    queryRouter = global.submitTaskRouter

    for (const [key, value] of Object.entries(query)) {
        queryRouter += "&" + key + "=" + value
    }
    logger.debug("Post " + queryRouter)
    const response = await axios.post(queryRouter,
        {
            code: fullTask
        });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
})

app.get('/runTask', async (req, res) => {
    logger.info("Call /runTask");
    queryID = req.query.queryID
    codeID = req.query.codeID
    logger.debug(`queryID: ${queryID}`)
    logger.debug(`codeID: ${codeID}`)

    queryRouter = global.runTaskRouter
    queryRouter += "codeID" + "=" + codeID
    logger.debug("Post " + queryRouter)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: true })

    const response = await axios.post(queryRouter);
    taskList[queryID] = response.data
    logger.debug(response.data)

    logger.info(queryID + " finished, add to TaskList")
})

app.get('/taskStatus', async (req, res) => {
    logger.info("Call /taskStatus");
    queryID = req.query.queryID
    logger.debug("taskList: " + Object.keys(taskList))

    res.setHeader("Access-Control-Allow-Origin", "*");
    checkData = func.pollCheck(queryID, taskList, "taskList")
    res.send(checkData)
})

app.get('/getTaskData', async (req, res) => {
    logger.info("Call /getTaskData");
    const response = await axios.get(global.getTaskDataRouter,
        {
            params: { taskID: req.query.taskID }
        });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data)
    logger.debug(response.data.data[0])
    const csvParser = new Parser()
    const csv = csvParser.parse(response.data.data)
    const csvFile = `./temp/TaskData/${req.query.taskID}.csv`
    fs.open(csvFile, "w", (err, fd) => {
        if (err) {
            logger.error(err.message);
        } else {
            fs.write(fd, csv, (err, bytes) => {
                if (err) {
                    logger.error(err.message);
                } else {
                    logger.debug(bytes + ` bytes written to ${csvFile}`);
                }
            })
        }
    })
})

app.get('/downloadTaskData', async (req, res) => {
    logger.info("Call /downloadTaskData");
    res.setHeader("Access-Control-Allow-Origin", "*");
    let dlFile = `./temp/TaskData/${req.query.taskID}.csv`
    logger.info("Request " + dlFile)
    res.download(dlFile, function (error) {
        if (error) {
            logger.error(error)
        }
    })
})

app.get('/patentSearch', async (req, res) => {
    logger.info("Call /patentSearch");
    logger.debug(`Request query ${req.query.patentID}`)
    var queryRouter = global.patentSearchRouter
    const response = await axios.get(queryRouter + req.query.patentID);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data.data)
})

// LLM sth.
app.get('/postLLMChat', async (req, res) => {
    logger.info("Call /postLLMChat");
    queryID = req.query.queryID
    llmParams = llm.genLLMBackendParams(req.query)
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (llmParams.status) {
        res.send({ status: true })
        logger.debug(JSON.stringify(llmParams))
        if (llmParams.method == "post") {
            var response = await axios.post(llmParams.server, llmParams.payload);
        }
        else {
            var response = await axios.get(llmParams.server, llmParams.payload);
        }
        llmResponseList[queryID] = response.data
    }
    else {
        res.send(llmParams)
    }
})

app.get('/getLLMChatStatus', async (req, res) => {
    logger.info("Call /getLLMChatStatus");
    logger.debug("llmResponseList: " + Object.keys(llmResponseList))
    queryID = req.query.queryID
    checkData = func.pollCheck(queryID, llmResponseList, "llmResponseList")
    if (checkData.status) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send({
            status: checkData.status,
            data: llm.parseLLMResponse(req.query, checkData)
        })
    }
    else {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(checkData)
    }
})

app.get('/execHive', async (req, res) => {
    logger.info("Call /execHive");
    queryID = req.query.queryID
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ status: true })
    hiveResponse = await hive.execSparkSQLQuery(req)
    hiveResponseList[queryID] = hiveResponse
})

app.get('/queryHiveExecStatus', async (req, res) => {
    logger.info("Call /queryHiveExecStatus");
    logger.debug("hiveResponseList: " + Object.keys(hiveResponseList))
    queryID = req.query.queryID
    res.setHeader("Access-Control-Allow-Origin", "*");
    checkData = func.pollCheck(queryID, hiveResponseList, "hiveResponseList")
    res.send(checkData)
})

app.get('/recommend', async (req, res) => {
    logger.info("Call /recommend");
    res.setHeader("Access-Control-Allow-Origin", "*");
    patentID = req.query.patentID
    sequence = req.query.sequence
    combSize = "3"
    payload = {
        "patent_number": patentID,
        "after_or_before": sequence,
        "comb_size": combSize
    }
    response = await axios.post(global.recommendRouter, payload)
    res.send(response.data)
})

module.exports = app