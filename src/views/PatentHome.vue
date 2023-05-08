<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>RIOS Spark</template>
                    <el-submenu index="1-1">
                        <template slot="title">Analyze</template>
                        <el-menu-item index="1-1-1">Word Count</el-menu-item>
                        <el-menu-item index="1-1-2">Phrase Count</el-menu-item>
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
            <r-editor />
        </el-container>
    </el-container>
</template>
<script>
import RIOSEditor from './home/RIOSEditor.vue';
export default {
    components: {
        "r-editor": RIOSEditor
    }
}
</script>
<style lang="">
    
</style>