<template>
  <el-container style="height: 80vh; border: 1px solid #eee">

    <el-header>
      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2" disabled>消息中心</el-menu-item>
      </el-menu> -->
      <div class="search-header">
        <img src="@/assets/logo.png" alt="Logo"/>
      </div>
    </el-header>

    <el-container>

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>RIOS Spark</template>
            <el-submenu index="1-1">
              <template slot="title">Analyze</template>
              <el-menu-item index="1-1-1" @click="loadTemplate('emptyTemplate')">Empty Template</el-menu-item>
              <el-menu-item index="1-1-1" @click="loadTemplate('CPC')">CPC</el-menu-item>
              <el-menu-item index="1-1-2">Word Count</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">Algorithm</template>
              <el-menu-item index="1-2-1">Recommend System</el-menu-item>
              <el-menu-item index="1-2-2">NLP</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">RIOS Patent Database</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"> -->
        <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
          <el-tab-pane label="Spark Executor" name="executor">
            <r-editor ref="childEditor"></r-editor>
          </el-tab-pane>
          <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            <component :is="item.content"></component>
          </el-tab-pane>
        </el-tabs>
      </el-container>

    </el-container>

  </el-container>
</template>

<script>
import RIOSEditor from './home/RIOSEditor.vue';
import RIOSTable from './home/RIOSTable.vue';
import axios from 'axios';

export default {
  components: {
    "r-editor": RIOSEditor,
    "r-table": RIOSTable
  },
  data() {
    return {
      editableTabsValue: 'executor',
      editableTabs: [
        // {
        //   title: 'Tab 1',
        //   name: '1',
        //   content: "r-editor",
        //   refid: "editor"
        // },
        {
          title: 'Response',
          name: 'response',
          content: "div",
        },
        {
          title: 'RIOS Table',
          name: 'table',
          content: "r-table",
        },
      ],
      tabIndex: 1
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
    async loadTemplate(templateFilename) {
      var queryStr = "http://localhost:23457/loadTemplate"
      const response = await axios.get(queryStr,
        {
          params: { filename: templateFilename }
        });
      console.log(response.data);
      this.$refs.childEditor.setContent(response.data)
    },
  }

}
</script>
<style lang="">
    
</style>