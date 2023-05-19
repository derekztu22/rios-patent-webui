const { Parser } = require('@json2csv/plainjs')
const fs = require("fs");

a = [{ "_1": "abc", "_2": 2 }, { "_1": "efg", "_2": 4 }]
const parser = new Parser()
const csv = parser.parse(a)
console.log(csv)
fs.open("./task_data/test.csv", "w", (err, fd) => {
    if (err) {
        console.log(err.message);
    } else {
        fs.write(fd, csv, (err, bytes) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(bytes + ' bytes written');
            }
        })
    }
})