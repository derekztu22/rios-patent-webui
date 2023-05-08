<template>
    <div class="myEditor">
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
                <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
            </el-form-item>
        </el-form>
        <div id="container" ref="container"></div>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor'
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
            language: 'scala'
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
        },
        themeChange(val) {
            monaco.editor.setTheme(val)
        },
        languageChange(val) {
            monaco.editor.setModelLanguage(this.monacoEditor.getModel(), val)
        }
    }
}
</script>
<style scoped>
#container {
    width: 80vw;
    height: 80vh;
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
  
  