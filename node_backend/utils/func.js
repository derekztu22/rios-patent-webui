import shell from 'shelljs'

export var globalHDFSFileList = {}

export function parseFileNames(inputString) {
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

export async function loadHDFSFile() {
    var fileList = {
        "csv": [],
        "g_brf_sum_text": [],
        "g_claims": [],
        "g_detail_desc_text": [],
        "g_draw_desc_text": []
    }
    for (const [key, value] of Object.entries(fileList)) {
        var shellRes = await shell.exec(`hdfs dfs -ls /patent/uspto/${key}`)
        fileList[key] = parseFileNames(shellRes)
    }
    return fileList
}

export function addSpaces(inputString) {
    var lines = inputString.split('\n');
    var outputString = '';

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        outputString += '        ' + line + '\n'
    }

    return outputString;
}