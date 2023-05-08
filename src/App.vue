<template>
  <div id="app">
    <!-- <SearchPage/> -->
    <PatentHome/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
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
