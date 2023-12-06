<template>
    <div id="tableContainer">
        <el-form :inline="true" ref="form">
            <el-form-item>
                <a href="http://localhost:23457/downloadTaskData?taskID=test" id="dl">
                    <el-button type="success" icon="el-icon-download" circle size="mini"></el-button>
                </a>
            </el-form-item>
        </el-form>
        <el-table class="tableBox" :data="tableData" align="center" border style="width: 80vw;" highlight-current-row>
            <el-table-column align="center" v-for="(item, index) in headData" :key="index" :label="item.tableTitle">
                <template slot-scope="scope">
                    <span>{{ scope.row[index] && scope.row[index].value }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import * as r_const from '@/router/consts'
import axios from 'axios'

export default {
    name: "RIOSTable",
    data() {
        return {
            centerDialogVisible: true,
            headData: [
                // { tableTitle: "id" },
                // { tableTitle: "姓名" },
                // { tableTitle: "性别" },
                // { tableTitle: "年龄" },
                // { tableTitle: "地址" },
                // { tableTitle: "联系方式" },
            ],
            tableData: [
                // [{ value: "id20200719" },
                // { value: "小明" },
                // { value: "男" },
                // { value: "20" },
                // { value: "北京昌平" },
                // { value: "18812349874" },
                // ],
                // [{ value: "id20220102" },
                // { value: "小红" },
                // { value: "女" },
                // { value: "18" },
                // { value: "北京海淀" },
                // { value: "18856432547" },
                // ],
                // [{ value: "id20220717" },
                // { value: "小蓝" },
                // { value: "未知" },
                // { value: "21" },
                // { value: "北京朝阳" },
                // { value: "16634219856" },
                // ],
            ],
            taskID: null
        };
    },
    mounted() { },
    methods: {
        setTable(tableVar, taskID) {
            // console.log(tableVar)
            try {
                var headData = []
                var tableData = []
                for (const [key, value] of Object.entries(tableVar[0])) {
                    headData.push({ tableTitle: key })
                    value
                }
                tableVar.forEach(element => {
                    var row = []
                    for (const [key, value] of Object.entries(element)) {
                        row.push({ value: value })
                        key
                    }
                    tableData.push(row)
                });
                // console.log(headData)
                // console.log(tableData)

                this.headData.length = 0
                headData.forEach(
                    (item) => {
                        this.headData.push(item)
                    }
                )
                this.tableData.length = 0
                tableData.forEach(
                    (item) => {
                        this.tableData.push(item)
                    }
                )
                this.taskID = taskID
                var href = r_const.queryDownloadTaskData + `?taskID=${taskID}`
                document.getElementById("dl").setAttribute("href", href)

            } catch (error) {
                console.log("Parse table failed.")
            }
        },
        async downloadTable() {
            await axios.get(r_const.queryDownloadTaskData,
                {
                    // params: { taskID: this.taskID }
                    params: { taskID: "test" }
                });
        }
    },
};
</script>
  
<style scoped>
#tableContainer {
    width: 70vw;
    height: 72vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.el-form {
    display: flex;
    justify-content: flex-end;
}
</style>
  