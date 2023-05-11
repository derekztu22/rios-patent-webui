<template>
    <div>
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
        };
    },
    mounted() { },
    methods: {
        setTable(tableVar) {
            // console.log(tableVar)
            this.headData.length = 0
            tableVar.headData.forEach(
                (item) => {
                    this.headData.push(item)
                }
            )

            this.tableData.length = 0
            tableVar.tableData.forEach(
                (item) => {
                    this.tableData.push(item)
                }
            )
        }
    },
};
</script>
  
<style scoped></style>
  