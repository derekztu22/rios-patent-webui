<template>
  <div id="app">
    <!-- <SearchPage/> -->
    <PatentHome/>
    <!-- <router-link to="/PatentHome">首页</router-link>
    <router-link to="/SearchPage">关于</router-link> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import SearchPage from './views/recommend/SearchPage.vue';
import PatentHome from './views/PatentHome.vue';

export default {
  name: 'app',
  components: {
    // SearchPage,
    PatentHome
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
