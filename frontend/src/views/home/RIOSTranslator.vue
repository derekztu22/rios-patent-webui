<template>
    <div class="translator-page">
        <el-form :inline="true" ref="form">
            <div>
              <el-input class="userLogin" type="textarea" placeholder="Username" v-model="user">
              </el-input>
              <el-form-item>
                  <el-button type="primary" icon="el-icon-switchbutton"
                             :loading="login_clicked"
                             @click="loginExec" id="loginBtn">Login</el-button>

                  <el-button type="primary" icon="el-icon-switchbutton"
                             :loading="logout_clicked"
                             @click="logoutExec" id="logoutBtn">Logout</el-button>
              </el-form-item>
            </div>
            Source Language
            <el-form-item>
                <el-select v-model="in_lang">
                    <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            Target Language
            <el-form-item>
                <el-select v-model="out_lang">
                    <el-option v-for="item in languages" :key="item.value" :label="item.value" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-chat-dot-round"
                           :loading="translate_clicked"
                           @click="translate" id="translateBtn">Translate</el-button>

                <el-button type="primary" icon="el-icon-upload" 
                           :loading="save_clicked"
                           @click="saveExec" id="saveBtn">Save</el-button>

                <el-button type="primary" icon="el-icon-download"
                           :loading="load_clicked"
                           @click="loadExec" id="loadBtn">Load</el-button>

                <el-button type="primary" icon="el-icon-refresh"
                           :loading="retrain_clicked"
                            @click="retrain" id="retrainBtn">Retrain</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-input class="userInput" type="textarea" placeholder="Input text" v-model="in_text">
            </el-input>
        </div>
        <div>
            <el-input class="userOutput" type="textarea" placeholder="Output text" v-model="out_text">
            </el-input>
        </div>
        <div class="container">

        <div class="form-group row">
           <label class="col-md-4 col-form-label text-md-right">Translate .docx</label>
           <div class="col-md-6">
             <div class="custom-file">
               <input type="file" class="custom-file-input" id="customFile" 
                   ref="file" @change="handleFileObject()">
             </div>
           </div>
         </div>

         <div class="form-group row mb-0">
           <div class="col-md-6 offset-md-4">
             <button @click.prevent="submit" type="submit" class="btn btn-primary" style="background: #42b983">
               Submit
             </button>
           </div>
         </div>

        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import * as r_const from '@/router/consts'

export default {
    name: "TranslatorPage",
    data() {
        return {
            languages: [
                {
                    value: 'English',
                },
                {
                    value: 'Chinese',
                },
            ],
            in_lang: 'Chinese',
            out_lang: 'English',
            cookie: 'sessionid=abc',
            translator: '',
            user: '',
            in_text: '',
            out_text: '',
            login_clicked: false,
            logout_clicked: false,
            load_clicked: false,
            save_clicked: false,
            retrain_clicked: false,
            translate_clicked: false,
            save_path: './new_saved_model',
            load_path: './new_saved_model',
            docx: null
        };
    },
    methods: {
        async loginExec() {
          try {
            this.login_clicked = true;
            await axios.get(r_const.queryLogin,
                           {params: {cookie: 'sessionid='+this.user}},
                           {withCredentials: true});
            this.login_clicked = false;
          } catch (err) {
            this.login_clicked = false;
            console.error(err)
          }
        },
        async logoutExec() {
          try {
            this.logout_clicked = true;
            await axios.get(r_const.queryLogout,
                           {params: {cookie: 'sessionid='+this.user}},
                           {withCredentials: true});
            this.logout_clicked = false;
          } catch (err) {
            this.logout_clicked = false;
            console.error(err)
          }
        },
        async translate() {
          try {
            this.translate_clicked = true;
            const response = await axios.get(r_const.queryTranslate,
                                            {params: {text: this.in_text,
                                                      in_lang: this.in_lang,
                                                      out_lang: this.out_lang,
                                                      cookie: 'sessionid='+this.user}},
                                            {withCredentials: true});
            this.out_text = response.data.results;
            this.translate_clicked = false;
          } catch (err) {
            this.translate_clicked = false;
            console.error(err)
          }
        },
        async retrain() {
          try {
            this.retrain_clicked = true;
            await axios.get(r_const.queryRetrain,
                            {params: {src_text: this.in_text,
                                      tgt_text: this.out_text,
                                      in_lang: this.in_lang,
                                      out_lang: this.out_lang,
                                      cookie: 'sessionid='+this.user}});
            this.retrain_clicked = false;
          } catch (err) {
            this.retrain_clicked = false;
            console.error(err)
          }
        },
        async saveExec() {
          try {
            this.save_clicked = true;
            await axios.get(r_const.querySave,
                            {params: {path: this.save_path,
                                      cookie: 'sessionid='+this.user}},
                            {withCredentials: true});  
            this.save_clicked = false;
          } catch (err) {
            this.save_clicked = false;
            console.error(err)
          }
        },
        async loadExec() {
          try {
            this.load_clicked = true;
            await axios.get(r_const.queryLoad,
                           {params: {path: this.load_path,
                                     cookie: 'sessionid='+this.user}},
                           {withCredentials: true});  
            this.load_clicked = false;
          } catch (err) {
            this.load_clicked = false;
            console.error(err)
          }
        },
        handleFileObject() {
          this.docx = this.$refs.file.files[0]
        },
        async submit() {
          var formData = new FormData();
          formData.append('docx', this.docx);
          console.log(this.docx);
          await axios.post(r_const.queryDocxTranslate, formData, 
          { params: {in_lang: this.in_lang,
                     out_lang: this.out_lang,
                     cookie: 'sessionid='+this.user}},
          {withCredentials: true},
          { headers: {
              'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
            }
          }).then((response) => {
            // looping over each element in response.data (each converted bytesIO string)
            console.log(response);
            response.data['results'].forEach((element) => {
              console.log('Recieved Document')
              console.log(element)

              // decode string to blob --> solution to question
              const byteCharacters = atob(element);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              console.log(byteArray)

              const url = window.URL.createObjectURL(new Blob([byteArray]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', this.user+'_translated.docx');
              document.body.appendChild(link);
              link.click();
            
            });
          });
        }
    }, //end methods
}; //end default

</script>
  
<style scoped>
.translator-page {
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

.userLogin {
    width: 6vw;
    height: 6vh;
    margin: 0 auto;
    padding: 5px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.userInput {
    width: 70vw;
    height: 6vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.userOutput {
    width: 70vw;
    height: 6vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.GenResponse {
    width: 70vw;
    height: 28vh;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
}

.el-form {
    margin-top: 10px;
}

.el-form-item {
    margin-bottom: 0;
    margin-left: 10px;
}
</style>
  
