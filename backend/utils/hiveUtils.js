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

function shell2csv(req, shellOutput) {
    const lines = shellOutput.trim().split('\n');
    const headersGuess = lines[0].split('\t');
    let headers = [];
    for (let i = 0; i < headersGuess.length; i++) {
        // headers.push(`Line ${i}`);
        headers.push(headersGuess[i]);
    }
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

function parse(inputString) {
    logger.debug(`inputString: ${inputString}`)
    let tableString = inputString
    let lines = tableString.split('\n')
    let fetchedValue
    lines.forEach(line => {
        const match = line.match(/Fetched (\d+) row\(s\)/);
        if (match) {
            fetchedValue = match[1]
        }
    })
    const filteredLines = lines.filter((line) => {
        return !line.includes("spark-sql>") && !line.includes("Time taken") && !line.includes(";")
    })
    tableString = filteredLines.join('\n')
    showedString = `Fetched ${fetchedValue} row(s):\n\n` + tableString

    return {
        showStr: showedString,
        tableStr: tableString
    }
}

function prepareRealSQL(command) {
    return command.replace("google_full", "google_cache")
}

function prepareSparkShell() {
    sparkShellProcess = spawn('spark-sql', ['--master', 'spark://mn1:6540', '--total-executor-cores', '60', '--executor-memory', '6G', '--hiveconf', 'hive.cli.print.header=true']);
    func.sleep(10000)

    sparkShellProcess.stdout.on('data', (data) => {
        const output = data.toString()
        logger.debug(output)
        if (sparkShellOutIndex != 0) {
            sparkShellPartial += output
            // if (output.includes("spark-sql>")) {
            //     minKey = Math.min(...Object.keys(sparkShellOutDict));
            //     let result = parse(sparkShellPartial)
            //     sparkShellOutDict[minKey].showStr = result.showStr
            //     sparkShellOutDict[minKey].tableStr = result.tableStr
            //     sparkShellPartial = ""
            // }
        }
    });

    sparkShellProcess.stderr.on('data', (data) => {
        const output = data.toString()
        logger.error(output)
        if (sparkShellOutIndex != 0) {
            sparkShellPartial += output
            if (output.includes("Time taken:")) {
                minKey = Math.min(...Object.keys(sparkShellOutDict));
                let result = parse(sparkShellPartial)
                sparkShellOutDict[minKey].showStr = result.showStr
                sparkShellOutDict[minKey].tableStr = result.tableStr
                sparkShellPartial = ""
            }
            else if (output.includes("Error in query")) {
                minKey = Math.min(...Object.keys(sparkShellOutDict));
                let result = parse(sparkShellPartial)
                sparkShellOutDict[minKey].showStr = result.showStr
                sparkShellOutDict[minKey].tableStr = result.tableStr
                sparkShellPartial = ""
            }
        }
    });

    sparkShellProcess.on('close', (code) => {
        logger.info(`Spark Shell process exited with code ${code}`);
    });

    sendCommandToSparkShell("cache table google_cache as select publication_number, primary_cpc, cpc, grant_date, filing_date, publication_date, country_code, assignee, inventor, title_localized, abstract_localized, claims_localized from google.google_full;")
    // sendCommandToSparkShell("cache table google_test as select assignee from google.google_full limit 40;")
}

function sendCommandToSparkShell(command) {
    logger.info(`Spark-sql execute \'${command}\'`)
    sparkShellProcess.stdin.write(command + ';\n');
}

async function execSparkSQLQuery(req) {
    logger.debug("sparkShellOutDict: " + Object.keys(sparkShellOutDict))
    if (req.query.content.includes("drop ")) {
        return {
            status: false,
            code: 1,
            content: "Bad request contains drop!",
            sparkLikeJson: null
        }
    }
    curIndex = sparkShellOutIndex
    sparkShellOutIndex++
    sparkShellOutDict[curIndex] = {
        tableStr: null,
        showStr: null,
        timestamp: new Date().getTime()
    }
    realCommand = prepareRealSQL(req.query.content)
    sendCommandToSparkShell(realCommand)

    while (sparkShellOutDict[curIndex].tableStr == null) {
        await func.sleep(500)
    }

    trimmed = sparkShellOutDict[curIndex].showStr.trim()
    logger.info(trimmed)
    sparkLikeJson = shell2csv(req, sparkShellOutDict[curIndex].tableStr.trim())
    delete sparkShellOutDict[curIndex]
    return {
        status: true,
        code: 0,
        content: trimmed,
        sparkLikeJson: sparkLikeJson
    }
}

function clearExpiredObjects() {
    var currentTime = new Date().getTime();

    for (var key in sparkShellOutDict) {
        if (sparkShellOutDict.hasOwnProperty(key)) {
            var objectTimestamp = sparkShellOutDict[key].timestamp;
            var elapsedTime = currentTime - objectTimestamp;
            if (elapsedTime > 5 * 60 * 1000) {
                console.info("Clearing sparkShellOutDict[" + key + "]")
                delete sparkShellOutDict[key];
            }
        }
    }
}

prepareSparkShell()
setInterval(clearExpiredObjects, 2000)

module.exports = {
    execSparkSQLQuery
}