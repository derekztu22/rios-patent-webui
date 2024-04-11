<template>
  <div class="ask-page">
    <el-form :inline="true" ref="form">
      <div class="row">
            <el-input class="userInput" cols="15" rows="15"  type="textarea"  placeholder="Input text" v-model="in_text" style="width: 500px">
            </el-input>

            <el-input class="userOutput" cols="15" rows="15"  type="textarea" placeholder="Output text" v-model="out_text" style="width: 500px">
            </el-input>
      </div>
     
      <el-form-item>
        <el-button class="ask_btn" :loading="ask_clicked" @click="ask">Ask</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import * as r_const from '@/router/consts'

export default {
    name: "AskPage",
    data() {
      return {
        in_text : '',
        out_text : '',
        ask_clicked: false
      }; 
    },
    methods: {
      async ask() {
        this.ask_clicked = true;
        this.out_text = ' ';
        const response = await axios.get(r_const.queryAsk,  {params:{text: this.in_text}});
        this.out_text = response.data.results;
        this.ask_clicked = false;
        
      }
    }, // end methods
}; // end default
</script>

<style scoped>
.ask-page {
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

.row:after {
  content: "";
  display: table;
  clear: both;
}

button {
  float: right;
  border: none;
  padding: 5px 12px;
  margin: 10px 0;
  background: #27afd8;
  color: white;
  cursor: pointer;
}

.userInput {
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.userOutput {
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}


</style>
