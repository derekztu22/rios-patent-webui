<template>
  <div class="search-box">
    <input type="text" v-model="query" placeholder="Input Patent Number..." @keyup.enter="getRecommendation" />
    <button @click="getRecommendation">Recommend</button>
  </div>
</template>
  
<script>
import axios from 'axios';
import * as r_const from '@/router/consts'

export default {
  name: 'SearchBox',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    async getRecommendation() {
      const response = await axios.get(r_const.queryRecommendPatent,
        {
          params: {
            patentID: this.query,
            sequence: "after"
          }
        });
      console.log(response.data);
      this.$emit("showRecommendation", response.data);
    },
  },
};
</script>
  
<style scoped>
.search-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 50px;
  border: 2px solid #0078d7;
  border-radius: 5px;
  padding: 5px;
  margin-top: 20px;
}

input[type="text"] {
  width: 80%;
  height: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
}

button {
  width: 20%;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: #0078d7;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

input[type="text"]:focus {
  outline: none !important;
}

button:hover {
  background-color: #00539b;
}

button:active {
  background-color: #004b8c;
}

button[disabled] {
  background-color: #dcdcdc;
  color: #a0a0a0;
  cursor: default;
}
</style>
  