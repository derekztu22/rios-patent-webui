const { promisify } = require('util');
const fs = require('fs')
const exec = promisify(require('child_process').exec)
const { Parser } = require('@json2csv/plainjs')

const logger = require('./log')
const func = require('./func')

function execSingleSQL(sql) {
    var res = shell.exec(`hive -e {}`)
}

async function execSQLOnHiveFromFile(req) {
    filename = `./temp/HiveExec/${func.GenNonDuplicateID(16)}.spk`
    hiveScript = `use google;\n${req.query.content};\nexit;\n`
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
        ({ stdout, stderr } = await exec(`spark-sql --master spark://mn1:6540 -i ${filename}`));
    } catch (e) {
        ({ code, stdout, stderr } = e);
    }

    if (code) {
        logger.debug(code)
        logger.debug(stderr)
        return {
            status: false,
            code: code,
            content: stderr.trim()
        }
    }
    sparkLikeJson = parseShellOutput(req, stdout.trim())
    return {
        status: true,
        code: code,
        content: stdout.trim(),
        sparkLikeJson: sparkLikeJson
    }
}

function writeCsvToDisk(taskID, JSONString) {
    const csvParser = new Parser()
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

module.exports = {
    execSingleSQL,
    execSQLOnHiveFromFile,
    parseShellOutput
}