const { promisify } = require('util');
const fs = require('fs')
const exec = promisify(require('child_process').exec)
const { spawn } = require('child_process');
const { Parser } = require('@json2csv/plainjs')

const logger = require('./log')
const func = require('./func')

var sparkShellProcess;
var sparkShellOutDict = {};
var sparkShellPartial = ""
var sparkShellOutIndex = 0;

function writeCsvToDisk(taskID, JSONString) {
    const csvParser = new Parser()
    try {
        const csv = csvParser.parse(JSONString)
        const csvFile = `./temp/TaskData/${taskID}.csv`
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
    }
    catch {
        logger.error("Error parsing JSON to CSV");
        return;
    }
}

function parseShellOutput(req, shellOutput) {
    const lines = shellOutput.trim().split('\n');
    const headers = lines[0].split('\t').map(header => {
        return header.split('.')[1]
    });
    const csvData = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        const rowData = {};
        for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = values[j];
        }

        csvData.push(rowData);
    }

    const sparkLikeJson = csvData.map(row => {
        const jsonRow = {};

        for (const header of headers) {
            jsonRow[header] = row[header];
        }

        return jsonRow;
    });

    writeCsvToDisk(req.query.queryID, sparkLikeJson)

    return sparkLikeJson
}

function Beautify(inputString) {
    const lines = inputString.split('\n');
    const filteredLines = lines.filter(line => {
        !line.includes("spark-sql>") && !line.includes(";")
    });
    const resultString = filteredLines.join('\n');

    return resultString;
}

function prepareRealSQL(command) {
    return command.replace("google_full", "google_cache")
}

function prepareSparkShell() {
    sparkShellProcess = spawn('spark-sql', ['--master', 'spark://mn1:6540', '--total-executor-cores', '280', '--executor-memory', '6G', '--silent']);
    func.sleep(10000)

    sparkShellProcess.stdout.on('data', (data) => {
        logger.debug(data.toString())
        if (sparkShellOutIndex != 0) {
            const output = data.toString()
            sparkShellPartial += output
        }
    });

    sparkShellProcess.stderr.on('data', (data) => {
        logger.error(data.toString())
        if (sparkShellOutIndex != 0) {
            const output = data.toString()
            if (output.includes("Time taken:")) {
                minKey = Math.min(...Object.keys(sparkShellOutDict));
                sparkShellOutDict[minKey] = Beautify(sparkShellPartial)
                sparkShellPartial = ""
            }
            else if (output.includes("== SQL ==") || output.includes("Error in query")) {
                minKey = Math.min(...Object.keys(sparkShellOutDict));
                sparkShellOutDict[minKey] = Beautify(output)
                sparkShellPartial = ""
            }
        }
    });

    sparkShellProcess.on('close', (code) => {
        logger.info(`Spark Shell process exited with code ${code}`);
    });

    sendCommandToSparkShell("cache table google_cache as select publication_number, assignee, primary_cpc, cpc, grant_date, title_localized, abstract_localized, claims_localized from google.google_full;")
    // sendCommandToSparkShell("cache table google_test as select assignee from google.google_full limit 40;")
}

function sendCommandToSparkShell(command) {
    logger.debug(`Spark-sql execute \'${command}\'`)
    sparkShellProcess.stdin.write(command + ';\n');
}

async function execSparkSQLQuery(req) {
    logger.debug("sparkShellOutDict: " + Object.keys(sparkShellOutDict))
    curIndex = sparkShellOutIndex
    sparkShellOutIndex++
    sparkShellOutDict[curIndex] = null
    realCommand = prepareRealSQL(req.query.content)
    sendCommandToSparkShell(realCommand)

    while (sparkShellOutDict[curIndex] == null) {
        await func.sleep(500)
    }

    trimmed = sparkShellOutDict[curIndex].trim()
    logger.info(trimmed)
    delete sparkShellOutDict[curIndex]
    sparkLikeJson = parseShellOutput(req, trimmed)
    return {
        status: true,
        code: 0,
        content: trimmed,
        sparkLikeJson: sparkLikeJson
    }
}

prepareSparkShell()

module.exports = {
    execSparkSQLQuery
}