<template>
    <b-container>
        <b-row>
          <b-col offset-lg="1" lg="1"><b-avatar :src="require('../assets/images/avatar.png')" size="3rem"></b-avatar></b-col>
          <b-col lg="8" class="post mb-4">
            <div class="post-header pr-2 pl-2 mb-3 font-weight-bolder">Publié par {{ post.user }} le {{ post.creationDate }}</div>
              <b-row >
                <b-col lg="11">
                  <div v-show="!displayModifyPost" class="post-content pr-2 pl-2">{{ post.content }}</div>
                  <b-form-textarea class="text-area" v-show="displayModifyPost" v-model="modifyTextArea">
                  </b-form-textarea>
                  <input v-show="displayModifyPost" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                  <b-button pill size="sm" v-show="displayModifyPost" @click="modifyPost">Envoyer</b-button>
                  <b-button pill size="sm" class="ml-3 reset-button" v-show="displayModifyPost" @click="resetModifyPost">Annuler</b-button>
                </b-col>
                <b-col lg="1">
                  <div class="d-flex justify-content-end">
                    <b-button-group v-show="displayDropdownButton">
                      <b-dropdown variant="outline-danger" size="sm" right text=". . .">
                      <b-dropdown-item v-if="userId === post.userId" @click="displaySwitch">Modifier</b-dropdown-item>
                      <b-dropdown-item v-if="admin || userId === post.userId" @click="deletePost">Supprimer</b-dropdown-item>
                      </b-dropdown>
                    </b-button-group>
                  </div>
                </b-col>
              </b-row>
              </b-col> 
        </b-row>
    </b-container>
</template>          

<script>
import { url } from '../main'

export default {
  name: "Post",

  data(){
    return {
      displayModifyPost : false,
      displayDropdownButton: false,
      modifyTextArea: this.post.content,
      uri: 'posts/' + this.post.id,
      file: "",
      headers: {
        headers:  {
          Authorization: this.token,
          userId: this.userId
        }
      },
    }
  },

  computed: {
    body() {
      return { 
        content: this.modifyTextArea }
    }
  },
  props: {
    post: {
      type: Object
    },
    userId: {
        type: String
    },
    token: {
        type: String
    },
    admin: {
        type: Boolean
    }
  },
  created() {
    this.switchDropdownButton()
  },

  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },

    switchDropdownButton() {
      if (this.admin === true || this.userId === this.post.userId) {
        this.displayDropdownButton = !this.displayDropdownButton
      }
    },

    displaySwitch() {
      this.displayModifyPost= !this.displayModifyPost,
      this.displayDropdownButton = !this.displayDropdownButton
    },
    
    getOnePost() {
      this.$http.get(url + 'posts/' + this.post.id, this.headers)
      .then(res => { this.modifyTextArea = res.data.content })
    },

    deletePost() {
      this.$http.delete(url + this.uri, this.headers)
      .then(() => { 
        this.$parent.getPosts()
      })
    },

    modifyPost() {
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('content', this.body.content);
      this.$http.put(url + this.uri, formData, this.headers)
      .then(() => { 
        this.$parent.getPosts();
        this.$refs.file.value = '';
        this.displaySwitch() 
      })
    },
    resetModifyPost() {
      this.getOnePost() 
      this.displaySwitch()         
    },
  }
};
</script>

<style scoped>
  .post {
    padding-right: 0;
    padding-left: 0;
  }
  .post-content {
    padding-bottom: 10px;
    border-bottom: 0.05em solid  #fd2d01;
  }
  .post-header {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;    
    background-color:  #ffd7d7;
    font-size: 1em;
    border-radius: 80px 30px;
  }
  .text-area {
    resize: none;
    border: 1px solid#fd2d01;
  }
  .text-area:focus {
    outline: none !important;
    border: 1px solid #fd2d01;
    box-shadow: 0 0 10px  #ffd7d7;
  }
  .reset-button {
    background-color:#fe5634;
    border: none;
  }
</style>