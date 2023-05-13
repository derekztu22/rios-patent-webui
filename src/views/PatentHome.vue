<template>
  <el-container style="height: 80vh;">

    <el-header class="rios-header">
      <div>
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
    </el-header>

    <el-container>

      <el-aside style="background-color: rgb(238, 241, 246);overflow: auto;" class="sidebar">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>RIOS Spark</template>
            <el-submenu index="1-1">
              <template slot="title">Analyze</template>
              <el-menu-item index="1-1-1" @click="loadTemplate('LoadTable')">Load
                Table</el-menu-item>
              <el-menu-item index="1-1-2" @click="loadTemplate('WordCount')">Word
                Count</el-menu-item>
              <el-menu-item index="1-1-3" @click="loadTemplate('ARMCPC')">ARM
                CPC</el-menu-item>
              <el-menu-item index="1-1-4" @click="loadTemplate('ARMEXP')">ARM
                EXP</el-menu-item>
              <el-menu-item index="1-1-5" @click="loadTemplate('MIPSCPC')">MIPS
                CPC</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">Algorithm</template>
              <el-menu-item index="1-2-1" @click="goTo()">Recommend System</el-menu-item>
              <el-menu-item index="1-2-2">NLP</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu" @click="refreshTableList"></i>RIOS Database</template>
            <el-menu-item v-for="(item) in tableList" :key="item.tableName">
              {{ item.tableName }}
              <i class="el-icon-copy-document" @click="copyFilePath(item.tableHDFSPath)"></i>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"> -->
        <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
          <el-tab-pane label="Spark Executor" name="executor">
            <r-editor ref="childEditor" @openNotification="openNotification" @setOutput="setOutput"
              @setResponseLoading="setResponseLoading" @setTable="setTable"></r-editor>
          </el-tab-pane>
          <el-tab-pane label="Spark Response" name="response">
            <r-response ref="responseTab"></r-response>
          </el-tab-pane>
          <el-tab-pane label="Execution Result" name="result">
            <r-table ref="resultTab"></r-table>
          </el-tab-pane>
          <!-- <el-tab-pane label="RIOS Table" name="table">
            <r-table ref="tableTab"></r-table>
          </el-tab-pane> -->
          <el-tab-pane label="RIOS Search" name="search">
            <r-search ref="searchTab"></r-search>
          </el-tab-pane>
          <!-- <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <component :is="item.content"></component>
          </el-tab-pane> -->
        </el-tabs>
      </el-container>

    </el-container>

  </el-container>
</template>

<script>
import RIOSEditor from './home/RIOSEditor.vue';
import RIOSTable from './home/RIOSTable.vue';
import RIOSResponse from './home/RIOSResponse.vue';
import * as r_const from '@/router/consts'
import SearchPage from './recommend/SearchPage.vue';
import axios from 'axios';

export default {
  components: {
    "r-editor": RIOSEditor,
    "r-table": RIOSTable,
    "r-response": RIOSResponse,
    "r-search": SearchPage
  },
  data() {
    return {
      editableTabsValue: 'executor',
      // editableTabs: [
      //   {
      //     title: 'Tab 1',
      //     name: '1',
      //     content: "r-editor",
      //     refid: "editor"
      //   },
      //   {
      //     title: 'Spark Response',
      //     name: 'response',
      //     content: "r-response",
      //   },
      //   {
      //     title: 'Result',
      //     name: 'result',
      //     content: "r-table",
      //   },
      //   {
      //     title: 'RIOS Table',
      //     name: 'table',
      //     content: "r-table",
      //   },
      // ],
      tabIndex: 1,
      tableList: [
        // {tableName:"uspto"},
        // {tableName:"gpatent"},
      ]
    }
  },
  methods: {
    addTab() {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    goTo() {
      this.$router.push('/SearchPage')
    },
    openNotification(typeVar, titleVar, contentVar) {
      this.$notify({
        title: titleVar,
        message: contentVar,
        type: typeVar
      });
    },
    async loadTemplate(templateFilename) {
      const response = await axios.get(r_const.queryLoadTemplate,
        {
          params: { filename: templateFilename }
        });
      this.$refs.childEditor.setContent(response.data)
    },
    setOutput(serverOutput) {
      this.$refs.responseTab.setResponse(serverOutput)
    },
    setTable(serverTable) {
      this.$refs.resultTab.setTable(serverTable)
    },
    setResponseLoading() {
      this.$refs.responseTab.setLoading()
    },
    async refreshTableList() {
      const response = await axios.get(r_const.queryLoadHDFSList);
      response.data.tableList.forEach(
        (item) => {
          this.tableList.push(item)
        }
      )
    },
    copyFilePath(tablePath) {
      var input = document.createElement('input')
      input.value = tablePath;
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy");
      this.openNotification("success", "Success", "Path copied")
      document.body.removeChild(input)
    },
  },
  mounted() {
    this.refreshTableList()
  }
}
</script>
<style>
.sidebar {
  width: 300px;
  height: 80vh
}

.block {
  border: 1px solid #d4d3d3e6
}

.rios-header {
  margin: 20px;
}
</style>