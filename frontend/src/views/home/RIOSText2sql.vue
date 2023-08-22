<template>
    <div class="sql-gen-page">
        <el-form :inline="true" ref="form">
            <el-form-item>
                <el-select v-model="model" placeholder="Model">
                    <el-option v-for="item in modelOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" icon="el-icon-chat-dot-round" @click="sqlGen"
                    id="submitBtn">Gen SQL</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="hiveExec"
                    id="submitBtn">Run SQL</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-input class="userInput" type="textarea" placeholder="Input text" v-model="sqlgen"
                @keyup.enter.native="sqlGen">
            </el-input>
        </div>
        <div v-loading="sqlLoading">
            <textarea class="GenResponse" id="sqlGenResponse"></textarea>
        </div>
        <div v-loading="hiveLoading">
            <textarea class="GenResponse" id="hiveResponse" readonly></textarea>
        </div>
    </div>
</template>
  
<script>
import * as r_const from '@/router/consts'
import axios from 'axios';
import * as utils_func from '@/utils/func'

export default {
    name: "SQLGenPage",
    data() {
        return {
            modelOption: [
                {
                    value: 'llama2-7b-tuned',
                    label: 'llama2-7b-tuned'
                },
                {
                    value: 'llama2-13b-tuned',
                    label: 'llama2-13b-tuned'
                },
                {
                    value: 'llama-65b',
                    label: 'llama-65b'
                }
            ],
            model: 'llama2-13b-tuned',
            sqlgen: '',
            sqlLoading: false,
            hiveLoading: false,
            llmQueryID: 0,
            hiveQueryID: 0
        };
    },
    methods: {
        async sqlGen() {
            this.llmQueryID = utils_func.GenNonDuplicateID(24)
            this.sqlLoading = true
            const response=await axios.get(r_const.queryPostLLMChat,
                {
                    params: {
                        queryID: this.llmQueryID,
                        model: this.model,
                        content: this.sqlgen
                    }
                });
            if(response.data.status) {
                this.querySQLGenStatus()
            }
            else {
                this.sqlLoading = false
                let sqlGenResponse = document.getElementById("sqlGenResponse")
                sqlGenResponse.value = response.data.reason
            }
        },

        async querySQLGenStatus() {
            const response = await axios.get(r_const.queryLLMChatStatus,
                {
                    params: {
                        queryID: this.llmQueryID,
                        model: this.model,
                    }
                });
            var nodeRes = response.data
            if (nodeRes.status) {
                this.sqlLoading = false
                let sqlGenResponse = document.getElementById("sqlGenResponse")
                sqlGenResponse.value = nodeRes.data
            }
            else {
                setTimeout(this.querySQLGenStatus, r_const.queryTaskStatusGap)
            }
        },

        async hiveExec() {
            this.hiveQueryID = utils_func.GenNonDuplicateID(24)
            this.hiveLoading = true
            let sqlGenResponse = document.getElementById("sqlGenResponse")
            await axios.get(r_const.queryExecHive,
                {
                    params: {
                        queryID: this.hiveQueryID,
                        content: sqlGenResponse.value
                    }
                });
            this.queryHiveExecStatus()
        },

        async queryHiveExecStatus() {
            const response = await axios.get(r_const.queryHiveExecStatus,
                {
                    params: {
                        queryID: this.hiveQueryID,
                    }
                });
            var nodeRes = response.data
            var serverRes = nodeRes.data
            if (nodeRes.status) {
                this.hiveLoading = false
                let hiveResponse = document.getElementById("hiveResponse")
                hiveResponse.value = serverRes
            }
            else {
                setTimeout(this.queryHiveExecStatus, r_const.queryTaskStatusGap)
            }
        },
    },
};
</script>
  
<style scoped>
.sql-gen-page {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 74vh;
    width: 80vw;
    overflow-x: hidden;
    overflow-y: auto;
    border: 2px solid #d4d3d3e6;
    border-radius: 5px;
}

.userInput {
    width: 70vw;
    height: 6vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.GenResponse {
    width: 70vw;
    height: 28vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.el-form {
    margin-top: 10px;
}
.el-form-item {
    margin-bottom: 0;
    margin-left: 10px;
}
</style>
  