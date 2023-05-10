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
            centerDialogVisible: true, //弹框显隐状态
            // 模拟表头数据
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
        // 提交操作
        present() {
            let result = [];
            // 通过双层循环拿到所需字段
            this.tableData.forEach((item) => {
                let data = {};
                item.forEach((e) => {
                    // 将字段名、字段值以键值对的形式赋值
                    data[e.zdm] = e.value;
                });
                // 每一行数据为一个对象添加到数组中 [{},{},{},...]
                result.push(data);
            });
            console.log(result, "参数");
            // 执行接口操作
        },
        setTable(tableVar) {
            // console.log(tableVar)
            this.headData = tableVar.headData
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
  