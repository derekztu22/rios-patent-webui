const { Parser } = require('@json2csv/plainjs');
const { log } = require('console');
const fs = require("fs");
var log4js = require('log4js')

log4js.configure({
    appenders: {
        datefileout: {
            type: "dateFile",
            filename: "log/run.log",
            pattern: "-yyyy-MM-dd"
        },
        consoleout: { type: "console" },
    },
    categories: {
        default: { appenders: ["datefileout", "consoleout"], level: "debug" },
        anything: { appenders: ["consoleout"], level: "debug" }
    }
});
var logger = log4js.getLogger()
console.log(logger.level)

var a = [{ "_1": "abc", "_2": 2 }, { "_1": "efg", "_2": 4 }]
const parser = new Parser()
const csv = parser.parse(a)
console.log(csv)
fs.open("./task_data/test.csv", "w", (err, fd) => {
    if (err) {
        logger.error(err.message);
    } else {
        fs.write(fd, csv, (err, bytes) => {
            if (err) {
                logger.error(err.message);
            } else {
                logger.debug(bytes + ' bytes written');
            }
        })
    }
})