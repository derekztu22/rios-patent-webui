<template>
    <div class="myEditor" v-loading="loading">
        <el-form :inline="true" ref="form">
            <el-form-item>
                <el-select v-model="theme" size="mini" @change="themeChange" placeholder="主题">
                    <el-option v-for="item in themeOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="language" size="mini" filterable @change="languageChange" placeholder="语言">
                    <el-option v-for="item in languageOption" :key="item.id" :label="item.id" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="commitTask"></el-button>
            </el-form-item>
        </el-form>
        <div id="container" ref="container"></div>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import axios from 'axios'


export default {
    name: "RIOSEditor",
    data() {
        return {
            themeOption: [
                {
                    value: 'vs',
                    label: '默认'
                },
                {
                    value: 'hc-black',
                    label: '高亮'
                },
                {
                    value: 'vs-dark',
                    label: '深色'
                }
            ],
            languageOption: [],
            theme: 'vs',
            language: 'scala',
            loading: false,
            taskID: 0
        }
    },
    mounted() {
        const self = this
        self.initEditor()
        self.languageOption = monaco.languages.getLanguages()
    },
    methods: {
        initEditor() {
            const self = this
            const domEditor = document.getElementById('container')
            self.monacoEditor = monaco.editor.create(domEditor, {
                theme: self.theme,
                readOnly: false,
                automaticLayout: true
            })
            monaco.editor.setModelLanguage(this.monacoEditor.getModel(), 'scala')
        },
        themeChange(val) {
            monaco.editor.setTheme(val)
        },
        languageChange(val) {
            monaco.editor.setModelLanguage(this.monacoEditor.getModel(), val)
        },
        setContent(contentVar) {
            const model = this.monacoEditor.getModel()
            const contentCur = model.getValue()
            if (contentCur.length != 0) {
                this.$confirm('This will clear the code being edited. Continue?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Decline',
                    type: 'warning'
                }).then(() => {
                    model.setValue(contentVar)
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
            else {
                model.setValue(contentVar)
            }
        },
        async getTaskData() {
            var queryStr = "http://localhost:23457/getTaskResponse"
            const response = await axios.get(queryStr,
                {
                    params: { taskID: this.taskID }
                });
            this.$emit("setTable", response.data)
            this.$emit("openNotification", "Server Response", "Task Executed Successfully");
        },
        async commitTask() {
            this.loading = true
            var queryStr = "http://localhost:23457/commitTask"
            const executeCode = this.monacoEditor.getModel().getValue()
            const response = await axios.get(queryStr,
                {
                    params: { executeCode: executeCode }
                });
            console.log(response.data);
            this.loading = false
            var taskExecFlag = response.data.success
            var taskData = response.data.data
            if (taskExecFlag) {
                this.$emit("openNotification", "Maven Response", "Package Succeed.");
                this.taskID = taskData.taskID
                this.$emit("setOutput", taskData.output)
            }
            else {
                this.$emit("openNotification", "Maven Response", "Package Failed.");
                this.$emit("setOutput", response.data.error_message)
            }
            if (taskData.hasData)
                this.getTaskData()
        },
    }
}
</script>
<style scoped>
#container {
    width: 80vw;
    height: 70vh;
    text-align: left;
}

.el-form-item {
    margin-bottom: 0;
    margin-left: 10px;
}

.myEditor {
    border: 2px solid #d4d3d3e6;
    border-radius: 5px;
}
</style>
  
  