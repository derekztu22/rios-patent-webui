<template>
    <div class="sql-gen-page">
        <el-row :gutter="20">
            <el-col :span="23">
                <el-input type="textarea" placeholder="Input text" v-model="sqlgen" @keyup.enter.native="sqlGen">
                </el-input>
            </el-col>
            <el-col :span="1">
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="sqlGen"
                    id="submitBtn"></el-button>
            </el-col>
        </el-row>
        <div v-loading="loading">
            <textarea id="sqlGenResponse" readonly></textarea>
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
            sqlgen: '',
            loading: false,
            queryID: 0
        };
    },
    methods: {
        async sqlGen() {
            var queryID = utils_func.GenNonDuplicateID(24)
            this.queryID = queryID
            this.loading = true
            let sqlGenPayload = {
                "max_tokens": 4096,
                "messages": [
                    {
                        "content": "You are a text-to-SQL generator, and your main goal is to assist users to convert the input text into correct SQL statements as much as possible.\nInput:\nTable 1: g_assignee_disambiguated\nField 1: patent_id(ID of patent), Field 2: assignee_organization(Organization ofpatent's assignee)\nTable 2: g_patent\nField 1: patent_id(ID of patent), Field 2: patent_date(Date of patent certification)\nTable 3: g_cpc_current\nField 1: patent_id(ID of patent), Field 2: cpc_group(The CPC group to which the patent belongs)\nTable 4: g_ipc_at_issue\nField 1: patent_id(ID of patent), Field 2: ipc_class(The IPC class to which the patent belongs)\nYou should directly give executable SQL statements without adding explanations.",
                        "role": "system"
                    },
                    {
                        "content": this.sqlgen,
                        "role": "user"
                    }
                ]
            }
            await axios.get(r_const.queryPostLLMChat,
                {
                    params: {
                        queryID: queryID,
                        llmPayload: sqlGenPayload
                    }
                });
            this.querySQLGenStatus()
        },

        async querySQLGenStatus() {
            const response = await axios.get(r_const.queryLLMChatStatus,
                {
                    params: {
                        queryID: this.queryID,
                    }
                });
            var nodeRes = response.data
            var serverRes = nodeRes.data
            if (nodeRes.status) {
                this.loading = false
                let sqlGenResponse = document.getElementById("sqlGenResponse")
                sqlGenResponse.innerHTML = serverRes.choices[0].message.content
            }
            else {
                setTimeout(this.querySQLGenStatus, r_const.queryTaskStatusGap)
            }
        }
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

#sqlGenResponse {
    width: 70vw;
    height: 60vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.el-row {
    width: 73vw;
    margin-bottom: 20px;
}

.el-col {
    height: 5vh;
}

#submitBtn {
    position: absolute;
    top: 25%;
}
</style>
  