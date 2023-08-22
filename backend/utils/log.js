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
var logger = log4js.getLogger();

module.exports = logger