<template>
  <el-container style="height: 85vh">
     <el-tabs
       class = "tabs"
       v-model="editableTabsValue"
       type="card"
       @tab-remove="removeTab">
       <el-tab-pane label="专利检索" name = "search">
         <el-container class='patent-container'>
           <r-search></r-search>
         </el-container>
       </el-tab-pane>

       <el-tab-pane label = "RIOS Collect" name = "collect">
         <r-collect></r-collect>
       </el-tab-pane>
     </el-tabs>
  </el-container>
</template>

<script>
/* eslint-disable */
import {
  Message as ElIconMessage,
  Menu as ElIconMenu,
  CopyDocument as ElIconCopyDocument,
} from '@element-plus/icons-vue'

import RIOSEditor from './home/RIOSEditor.vue'
import RIOSTable from './home/RIOSTable.vue'
import RIOSResponse from './home/RIOSResponse.vue'
import SearchPage from './recommend/SearchPage.vue'
import SQLGenPage from './home/RIOSText2sql.vue'
import RIOSTranslator from './home/RIOSTranslator.vue'
import RIOSCollect from './home/RIOSCollect.vue'
import FileManager from './file_manager/FileManager.vue'
import * as r_const from '@/router/consts'
import axios from 'axios'

export default {
  components: {
    'r-search': SearchPage,
    'r-editor': RIOSEditor,
    //'r-table': RIOSTable,
    //'r-response': RIOSResponse,
    //'r-sqlgen': SQLGenPage,
    //'r-translator': RIOSTranslator,
    'r-collect': RIOSCollect,
    //'r-filemanage': FileManager,
    ElIconMessage,
    ElIconMenu,
    ElIconCopyDocument,
  },
  data() {
    return {
      lang: 'EN',
      editableTabsValue: 'search',
      tabIndex: 1,
      tableList: {
        grantedPatents: {
          queryName: 'csv',
          tables: [],
        },
        briefSum: {
          queryName: 'g_brf_sum_text',
          tables: [],
        },
        claim: {
          queryName: 'g_claims',
          tables: [],
        },
        detailDesc: {
          queryName: 'g_detail_desc_text',
          tables: [],
        },
        drawDesc: {
          queryName: 'g_draw_desc_text',
          tables: [],
        },
      },
    }
  },
  methods: {
    toggleLanguage() {
      if (this.lang == "EN") {
        this.lang = "CN";
      } else {
        this.lang = "EN";
      }
    },
    addTab() {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    goTo() {
      this.$router.push('/SearchPage')
    },
    openNotification(typeVar, titleVar, contentVar) {
      this.$notify({
        title: titleVar,
        message: contentVar,
        type: typeVar,
      })
    },
    async loadTemplate(templateFilename) {
      const response = await axios.get(r_const.queryLoadTemplate, {
        params: { filename: templateFilename },
      })
      this.$refs.childEditor.setContent(response.data)
    },
    setOutput(serverOutput) {
      this.$refs.responseTab.setResponse(serverOutput)
    },
    setTable(serverTable, taskID) {
      this.$refs.resultTab.setTable(serverTable, taskID)
    },
    clearTable() {
      this.$refs.resultTab.clearTable()
    },
    setResponseLoading() {
      this.$refs.responseTab.setLoading()
    },
    async refreshTableList() {
      for (const [key, value] of Object.entries(this.tableList)) {
        const response = await axios.get(r_const.queryLoadHDFSList, {
          params: { tableType: value['queryName'] },
        })
        this.tableList[key]['tables'].length = 0
        response.data.tableList.forEach((item) => {
          item.tableName = item.tableName.substring(2)
          this.tableList[key]['tables'].push(item)
        })
      }
    },
    async maintaining() {
      this.$alert('Maintaining...', 'Error', {
        confirmButtonText: 'OK',
      })
    },
    copyFilePath(tablePath) {
      var input = document.createElement('input')
      input.value = tablePath
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      this.openNotification('success', 'Success', 'Path copied')
      document.body.removeChild(input)
    },
  },
  mounted() {
    //this.refreshTableList()
    // this.maintaining()
  },
}
</script>

<style>
.sidebar {
  width: 300px;
  height: 80vh;
}

.block {
  border: 1px solid #d4d3d3e6;
}

.rios-header {
  font-size: 30px;
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px;
  background-color: white;
}

.el-aside {
  display: contents;
}

.el-menu {
  min-width: 240px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input{
  display: none;
}

.slider {
  position:absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s
}

input:checked + .slider {
  background-color: #ccc;
}

input:focus + .slider{
  box-shadow: 0 0 1px #ccc;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

#menu-container {
  max-height: 80vh;
  overflow: auto;
}

.patent-container {
    /* remember to set a width 
    position: absolute;
    left: 11%;
    top: 15%;
    margin-left:10%;
    margin-top:10px; */
}
.tabs {
  width : 100%;

}


</style>
