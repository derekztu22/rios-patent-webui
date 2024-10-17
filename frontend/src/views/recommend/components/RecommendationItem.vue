<template>

  <el-container class="recommend-cell">
    <el-aside>
      <el-button id="ctrlButton" class="sidebarCtrlButton" @click="ctrlSidebar">+</el-button>
      <div class="sidebar" v-if="showSide">
        <button class="sidebarLinks" @click="openPopup('label', $event)">专利标签 </button>
        <button class="sidebarLinks" @click="openPopup('expert', $event)">专门知识</button>
        <button class="sidebarLinks" @click="openPopup('rpc', $event)">RPC</button>
      </div>
    </el-aside>

    <div class="modal" v-if="showPopup">
      <div class="modal-content" ref="modalRef">

        <div class="modal-header">
          <h1 v-if="showLabel">标签</h1>
          <h1 v-if="showExpert">专门知识</h1>
          <h1 v-if="showRPC">RPC</h1>
          <h1 v-if="showOther">此外</h1>
        </div>

        <div class="modal-body">
          <div v-if="showLabel">
            <input
             type="text"
             placeholder="输入标签"/>
          </div>

          <div v-if="showExpert">
            没有专门知识 <br>
            <input
             type="text"
             placeholder="输入专门知识"/>
          </div>

          <div v-if="showRPC">
            没有 RPCs <br>
            <input
             type="text"
             placeholder="输入RPCs"/>
          </div>

          <div v-if="showOther">
            没有戏外<br>
            <input
             type="text"
             placeholder = "输入此外"/>
          </div>

        </div>

        <div class="modal-footer">
          <el-button class="close-button" @click="closePopup">关</el-button>
          <el-button class="save-button" @click="save">搜索</el-button>
        </div>
      </div>
    </div>


    <div class="recommendation-item" :id="'recommendCell' + index.toString()"  >

      <div class="patent-table">
        <div class="pubNum">
          <a :href="'https://patents.google.com/patent/' + pubNum.replaceAll('-', '') + '/en'" target="_blank" rel="noopener">{{ pubNum }}</a>   

          <el-button class="summaryButton" @click="summarize(index.toString())" :loading="summaryClicked">
            总结
          </el-button>

          <br>
        </div>

        <div class="field"> 
          <div class="fieldname"> 方案：</div>
            <el-button :id="'propositionButton' + index.toString()" class="propositionButton" @click="ctrlProposition(index.toString())">+</el-button>
            <div :id="'propositionText' + index.toString()" class="patent-cell"> 
              {{ proposition }}
            </div>
        </div>

        <div class="field">
          <div class="fieldname"> 问题：</div>
            <el-button :id="'problemButton' + index.toString()" class="problemButton" @click="ctrlProblem(index.toString())">+</el-button>
            <div :id="'problemText' + index.toString()" class="patent-cell">
              {{ problem }}
            </div>
        </div>


        <div class="field"> 
          <div class="fieldname"> 效果：</div>
            <el-button :id="'resultButton' + index.toString()" class="resultButton" @click="ctrlResult(index.toString())">+</el-button>
            <div :id="'resultText'+ index.toString()" class="patent-cell">
              {{ result }} 
            </div>
        </div>


        <div class="field">
          <div class="fieldname"> 标签：</div>


<!---
            <el-button @click="addTag">+</el-button>
--->
          <div class="patent-cell">
            <el-tag
              v-for="tag in tags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              id = "newTagInput"
              v-if="inputVisible"
              v-model="inputValue"
              size="small"
              style="height:25px; width:120px"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput">
              + 新标签
            </el-button>

<!---
            {{ tags }} 
            <div class="tagWrapper" v-for="(input,k) in newTags" :key="k">
              <div class="tag">
                <input type="text" class="form-control" v-model="input.tag"/>
              </div>
            </div>
--->
          </div>
        </div>
      </div> 

      <el-button class="translateBtn" @click="translateToChinese('index')"> 翻译</el-button>

      <div class="feedbackHeader">
        <b>
        <div class="notSimilarText">
          不相关
        </div>
        <div class="barText1">
          |
        </div>
        <div class="similarityText">
          相关相似度
        </div>
        </b>
  
      </div>

      <div class="radios">
        专利领域：
        <el-radio-group v-model="domainRadio">
          <el-radio value="0"> 0 </el-radio>
          <el-radio value="1"> 1 </el-radio>
          <el-radio value="2"> 2 </el-radio>
          <el-radio value="3"> 3 </el-radio>
          <el-radio value="4"> 4 </el-radio>
          <el-radio value="5"> 5 </el-radio>
        </el-radio-group>
        <br>

        专利方案：
        <el-radio-group v-model="propRadio">
          <el-radio value="0"> 0 </el-radio>
          <el-radio value="1"> 1 </el-radio>
          <el-radio value="2"> 2 </el-radio>
          <el-radio value="3"> 3 </el-radio>
          <el-radio value="4"> 4 </el-radio>
          <el-radio value="5"> 5 </el-radio>
        </el-radio-group>

        <br>

        专利问题：
        <el-radio-group v-model="probRadio">
          <el-radio value="0"> 0 </el-radio>
          <el-radio value="1"> 1 </el-radio>
          <el-radio value="2"> 2 </el-radio>
          <el-radio value="3"> 3 </el-radio>
          <el-radio value="4"> 4 </el-radio>
          <el-radio value="5"> 5 </el-radio>
        </el-radio-group>
        <br>

        专利效果：
        <el-radio-group v-model="resultRadio">
          <el-radio value="0"> 0 </el-radio>
          <el-radio value="1"> 1 </el-radio>
          <el-radio value="2"> 2 </el-radio>
          <el-radio value="3"> 3 </el-radio>
          <el-radio value="4"> 4 </el-radio>
          <el-radio value="5"> 5 </el-radio>
        </el-radio-group>
        <br>

        专利总共：
        <el-radio-group v-model="totalRadio">
          <el-radio value="0"> 0 </el-radio>
          <el-radio value="1"> 1 </el-radio>
          <el-radio value="2"> 2 </el-radio>
          <el-radio value="3"> 3 </el-radio>
          <el-radio value="4"> 4 </el-radio>
          <el-radio value="5"> 5 </el-radio>
        </el-radio-group>
        <br>
      </div>


      <el-button
        class="feedback-btn"
        type="primary"
        :loading="feedbackClicked"
        @click="saveExec"
        id="saveBtn">保存标签和反馈</el-button>


    </div>
    <aside class="summaryBox" :id="'summaryBox' + index.toString()" v-if="showSummaryBox">
      <h3>中文总结</h3>
      <div>
       blahablahahlaa
      </div>
      
    </aside>
  </el-container>

</template>

<script>
/* eslint-disable */
import { ElInput } from 'element-plus'
import { nextTick } from 'vue'
import axios from 'axios'
import * as r_const from '@/router/consts'


export default {
  name: 'RecommendationItem',
  props: {
    pubNum: {
      type: String,
      required: true
    },
    proposition: {
      type: String,
      required: true
    },
    problem: {
      type: String,
      required: true
    },
    result: {
      type: String,
      required: true
    },
    feedback: {
      type: Object,
    },
    tags: {
      type: Array,
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      feedbackClicked: false,
      summaryClicked: false,
      showPopup : false,
      showLabel : false,
      showExpert : false,
      showRPC : false,
      showOther : false,
      showSide: false,
      mouseX: 0,
      mouseY: 0,
      inputVisible: false,
      inputValue: '',
      mutableTags: this.tags,
      _pubNum: this.pubNum,
      domainRadio: this.feedback.domain,
      propRadio: this.feedback.prop,
      probRadio: this.feedback.problem,
      resultRadio: this.feedback.result,
      totalRadio: this.feedback.total,
      showSummaryBox: false,
      summary: '',
      propositionText: this.proposition,
      problemText: this.problem,
      resultText: this.result,
    }
  },
  methods: {
    async summarize(index) {
      let relevantItem = document.getElementById("recommendCell" + index);
      if (relevantItem.style.width=="80%") {
        relevantItem.style.width="100%";
        this.showSummaryBox = false;
      } else {
        if (this.summary == "" ) {
          this.summaryClicked = true;
          let _fullText = this.propositionText + this.problemText + this.resultText;
          this.summary = _fullText;
        } 
        relevantItem.style.width="80%";
        this.showSummaryBox = true;

        nextTick(() => {
          let summary = document.getElementById("summaryBox" + index);
          summary.children[1].textContent = this.summary;
        });
      }
      this.summaryClicked = false;
   
    },
    async saveExec() {
      this.feedbackClicked = true;
      let _feedback = {
       'domain': this.domainRadio,
       'prop': this.propRadio,
       'problem': this.probRadio,
       'result': this.resultRadio,
       'total': this.totalRadio
       }
      const response = await axios.get(
         r_const.querySaveFeedback,
         {
           params: {
             pubNum: this._pubNum,
             feedback: _feedback,
             tags: this.mutableTags
           },
         },
         { withCredentials: true }
       )
      this.feedbackClicked = false;
    },
    handleClose(tag)  {
      this.mutableTags.splice(this.mutableTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
       nextTick(() => {
        document.getElementById("newTagInput").focus()
      })
    },
    handleInputConfirm () {
      if (this.inputValue) {
        this.mutableTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    ctrlProposition(index) {
      if (document.getElementById("propositionButton"+index).textContent == "-") {
        document.getElementById("propositionText"+index).style.maxHeight="4.5em";
        document.getElementById("propositionText"+index).style.overflow="hidden";
        document.getElementById("propositionButton"+index).textContent="+";
      } else {
        document.getElementById("propositionText"+index).style.maxHeight="100em";
        document.getElementById("propositionText"+index).style.overflow="visible";
        document.getElementById("propositionText"+index).style.textOverflow="inherit";
        document.getElementById("propositionButton"+index).textContent="-";
      }
    },
    ctrlProblem(index) {
      if (document.getElementById("problemButton"+index).textContent == "-") {
        document.getElementById("problemText"+index).style.maxHeight="4.5em";
        document.getElementById("problemText"+index).style.overflow="hidden";
        document.getElementById("problemButton"+index).textContent="+";
      } else {
        document.getElementById("problemText"+index).style.maxHeight="100em";
        document.getElementById("problemText"+index).style.overflow="visible";
        document.getElementById("problemText"+index).style.textOverflow="inherit";
        document.getElementById("problemButton"+index).textContent="-";
      }
    },
    ctrlResult(index) {
      if (document.getElementById("resultButton"+index).textContent == "-") {
        document.getElementById("resultText"+index).style.maxHeight="4.5em";
        document.getElementById("resultText"+index).style.overflow="hidden";
        document.getElementById("resultButton"+index).textContent="+";
      } else {
        document.getElementById("resultText"+index).style.maxHeight="100em";
        document.getElementById("resultText"+index).style.overflow="visible";
        document.getElementById("resultText"+index).style.textOverflow="inherit";
        document.getElementById("resultButton"+index).textContent="-";
      }
    },
    addTag() {
      const newTag = {tag: ''}
      this.newTags.push(newTag);
    },
    ctrlSidebar() {
      if (this.showSide) {
        this.showSide = false
        document.getElementById("ctrlButton").textContent="+";
      } else {
        this.showSide = true;
        document.getElementById("ctrlButton").textContent="-";
      }
    },
    translateToChinese(index) {
      console.log(index);
    },
    openPopup(type, event) {
      this.showPopup = true
      var bodyStyles = document.body.style;
      bodyStyles.setProperty('--button-left', event.clientX.toString() + "px");
      bodyStyles.setProperty('--button-top', (event.clientY-220).toString() + "px"); // Based on height of modal
      if (type == "label") {
        this.showLabel = true;
      } else if (type == "expert") {
        this.showExpert = true;
      } else if (type == "rpc") {
        this.showRPC = true;
      } else if (type == "other") {
        this.showOther = true;
      }
      document.addEventListener('mouseup', this.closeModalOnClickOutside)
      document.addEventListener('wheel', this.closeModalOnClickOutside)
    },
    closePopup() {
      this.showPopup = false;
      this.showLabel = false;
      this.showExpert = false;
      this.showRPC = false;
      this.showOther = false;
      document.removeEventListener('mouseup', this.closeModalOnClickOutside)
      document.removeEventListener('wheel', this.closeModalOnClickOutside)
    },
    closeModalOnClickOutside(event) {
      const modal = this.$refs.modalRef
      if (!modal.contains(event.target)) {
        this.closePopup()
      }
    },
    save() {
      console.log("saved");
    }
  }
}
</script>

<style scoped>

.recommendation-item {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-width: 800px;
}

.summaryBox {
  width:60%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;

}

.sidebar {
  height: 100px;
  margin-right:5px;
  width:7%
}

.sidebar button {
  display: block;
  text-align:center;
  width: 100%;
  height:35px;
  margin-bottom: 10px;
  background-color: #0078d7;
  color: white;
  font-weight: bold;
  border: 1px;
}

.sidebar button:hover {
  background-color: #00539b;
}

.sidebar button:active {
  background-color: #004b8c;
}

.title {
  font-size: 20px;
}

.pubNum {
  margin-top: 5px;
  font-weight: bold;
  font-size: 20px;
  float:center;
  margin-left:3.5%;
  line-height:2;
}

.abstract {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.5em;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  max-height: 4.5em;
}

.abstract:hover {
  text-overflow: inherit;
  overflow: visible;
  max-height: 100em;
}

.abstract-nohidden {
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.5em;
}

.feedback-buttons{
  display: inline-block;
  margin-top: 5px;

}

.patent-table {
  text-align:center;
}

.field {
  padding-bottom: 7px;
  padding-top: 7px;
  display: flex;
  margin-top: 4px;
  margin-bottom: 4px;
  justify-content: space-between;
  border-bottom: solid;
  border-width: 1px;
}

.fieldname {
  text-align:left;
  font-size:16px;
  font-weight: bold;
  float: left;
}

.patent-cell {
 /* display: inline-block;*/
  overflow:hidden;
  text-overflow: ellipsis; 
  overflow-wrap: break-word;
  width: 90%;
  text-align:left;
  float: right;
  max-height: 4.5em;
  line-height: 1.5em;
}

:root {
  --button-top: 0;
  --button-left: 0;
}

.modal {
  position: absolute;
  top: var(--button-top);
  left: var(--button-left);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  width: 400px;
  height: 200px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 80 %;
  position: relative;
  overflow-y: auto;
  max-height: 700px;
  border: 1px solid #ccc;
}

.modal-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.modal-body {
  padding: 10px 0;
}

.modal-footer {
  padding-top: 10px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
}

.translateBtn {
  display:block;
  text-align:center;
  background-color: #0078d7;
  color: white;
  font-weight: bold;
  border: 1px;
}

.recommend-cell {
  width:100%;
  float:left;
}

.sidebarCtrlButton {
  margin:0px;
  background-color: #0078d7;
  color: white;
  font-weight: bold;
}


.tagWrapper {
  text-align: left;
  display:inline;
}
.tag {
  display:inline;
  margin:2px;
}

.feedbackHeader {
  display: inline;
}

.notSimilarText {
  text-align:left;
  display: inline;
  margin-left:-40px;
}

.barText1 {
  display: inline;
  margin-left:10px;
}

.similarityText {
  display: inline;
  margin-left:100px;
}

.summaryButton {
  float: right;
  background-color: #0078d7;
  color: white;
  font-weight: bold;
  border: 1px;

}

</style>
