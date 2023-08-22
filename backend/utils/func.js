const { setTimeout } = require('core-js');
const fs = require('fs')
// const shell = require('shelljs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

const logger = require('./log')
const global = require('./global')

var templateBegin, templateEnd;
var HDFSFileList = {};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function GenNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36)
}

fs.readFile('./scala_templates/stable/begin.tp', 'utf-8', (err, data) => {
    if (err) return logger.error(err.message);
    templateBegin = data;
    logger.info("Begin template loaded")
})
fs.readFile('./scala_templates/stable/end.tp', 'utf-8', (err, data) => {
    if (err) return logger.error(err.message);
    templateEnd = data;
    logger.info("End template loaded")
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
        logger.info(`${key} refreshed`)
        var shellRes = await exec(`hdfs dfs -ls /patent/uspto/${key}`)
        fileList[key] = parseFileNames(shellRes.stdout)
    }
    HDFSFileList = fileList;
}

function refreshHDFSFileList() {
    loadHDFSFileList()
    logger.info("HDFS file list refreshed")
    setTimeout(refreshHDFSFileList, 1000 * 1800)
}

function getHDFSFileList() {
    return HDFSFileList
}

function getTemplateContext() {
    return {
        begin: templateBegin,
        end: templateEnd
    }
}

function loadTemplateFromDisk(filename) {
    fullFilename = './scala_templates/' + filename + '.scala'
    logger.info(`Request load template ${fullFilename}`)
    fs.readFile(fullFilename, 'utf-8', (err, data) => {
        if (err) return logger.error(err.message);
        return data
    })
}

function pollCheck(queryID, taskList, taskName) {
    if (queryID in taskList) {
        result = {
            status: true,
            data: taskList[queryID]
        }
        delete taskList[queryID]
        logger.info(queryID + ` removed from ${taskName}`)
    }
    else {
        result = {
            status: false,
            data: null
        }
    }
    return result
}

function genLLMBackendParams(params) {
    logger.info(params)
    if (params.model == "llama-65b") {
        llamaPayload = {
            "max_tokens": 4096,
            "messages": [
                {
                    "content": "You are a text-to-SQL generator, and your main goal is to assist users to convert the input text into correct SQL statements as much as possible.\nInput:\nTable 1: g_assignee_disambiguated\nField 1: patent_id(ID of patent), Field 2: assignee_organization(Organization ofpatent's assignee)\nTable 2: g_patent\nField 1: patent_id(ID of patent), Field 2: patent_date(Date of patent certification)\nTable 3: g_cpc_current\nField 1: patent_id(ID of patent), Field 2: cpc_group(The CPC group to which the patent belongs)\nTable 4: g_ipc_at_issue\nField 1: patent_id(ID of patent), Field 2: ipc_class(The IPC class to which the patent belongs)\nYou should directly give executable SQL statements without adding explanations.",
                    "role": "system"
                },
                {
                    "content": params.content,
                    "role": "user"
                }
            ]
        }
        method = "post"
        llamaServer = global.llmChatPostRouter1
    }
    else if (params.model == "llama2-13b-tuned") {
        llamaPayload = {}
        method = "get"
        llamaServer = global.llmChatPostRouter2 + params.content.split(" ").join("%20")
    }
    else {
        return {
            status: false,
            reason: 'No such model.'
        }
    }
    return {
        status: true,
        server: llamaServer,
        method: method,
        payload: llamaPayload
    }
}

function parseLLMResponse(params, response) {
    logger.debug(params)
    if (params.model == "llama-65b") {
        return response.data.choices[0].message.content
    }
    else if (params.model == "llama2-13b-tuned") {
        return response.data.sql_query
    }
}

function execSingleSQL(sql) {
    var res = shell.exec(`hive -e {}`)
}

async function execSQLOnHiveFromFile(content) {
    filename = `./temp/HiveExec/${GenNonDuplicateID(16)}.hive`
    hiveScript = `use patent;\n${content};\nexit;\n`
    fs.open(filename, "w", (err, fd) => {
        if (err) {
            logger.error(err.message);
        } else {
            fs.write(fd, hiveScript, (err, bytes) => {
                if (err) {
                    logger.error(err.message);
                } else {
                    logger.debug(bytes + ` bytes written to ${filename}`);
                }
            })
        }
    })
    let code, stdout, stderr;
    try {
        ({ stdout, stderr } = await exec(`hive -f ${filename}`));
    } catch (e) {
        ({ code, stdout, stderr } = e);
    }

    if (code) {
        logger.debug(code)
        logger.debug(stderr)
        return stderr.trim()
    }
    return stdout.trim()
}

setTimeout(refreshHDFSFileList, 0)

module.exports = {
    sleep,
    GenNonDuplicateID,
    parseFileNames,
    addSpaces,
    loadHDFSFileList,
    getHDFSFileList,
    refreshHDFSFileList,
    getTemplateContext,
    loadTemplateFromDisk,
    pollCheck,
    genLLMBackendParams,
    parseLLMResponse,
    execSingleSQL,
    execSQLOnHiveFromFile
}