<template>
    <b-container>
        <b-row>
          <b-col offset-lg="1" lg="1"><b-avatar :src="this.post.userProfilePicture" size="3rem"></b-avatar></b-col>
          <b-col lg="9" class="post mb-4">
            <div class="post-header pr-2 pl-2 mb-3 font-weight-bolder">Publié par {{ post.user }} le {{ post.creationDate }}</div>
          
          <b-row  v-show="displayModifyPost"> <!-- Vue modification -->
            <b-col lg="2">
              <div class="base-image-input" v-b-tooltip.hover title="Modifier" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                <span v-if="!imageData" class="placeholder">Insérer une image</span>
                <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
              </div>
            </b-col>
            <b-col lg="8">
              <b-form-textarea class="text-area" rows="3" v-model="modifyTextArea">
                    </b-form-textarea>
            </b-col>
            <b-col lg="1">
              <div class="button-col">
              <b-button pill size="sm" class="mb-3 send-button" @click="modifyPost">Envoyer</b-button>
              <b-button pill size="sm" class="mb-3 reset-button" @click="resetModifyPost">Annuler</b-button>
              </div>
            </b-col>                                          
          </b-row>


          <b-row v-show="!displayModifyPost"> <!-- Affichage -->
            <b-col lg="7">
              <div class="post-content pr-2 pl-2">{{ post.content }}</div>
            </b-col>
            <b-col lg="3">
              <div class="img-container"><img id="modifyImage" class="img-styling" :src="postImage" alt="Image"></div>
            </b-col>
            <b-col lg="2">
              <div class="d-flex justify-content-end">
                <b-button-group>
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
      imageData: this.post.image,
      displayModifyPost : false,
      modifyTextArea: this.post.content,
      userProfilePicture: this.post.userProfilePicture,
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
    postImage() {
      return this.post.image;
    },
    body() {
      return { 
        content: this.modifyTextArea }
    },

    displayImage() {
    if(this.post.image){
        return true
      } else {
        return false
      }
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
    chooseImage () {
      this.$refs.fileInput.click()
    },
    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = event => {
          this.imageData = event.target.result
        }
        reader.readAsDataURL(files[0])
        this.file = this.$refs.fileInput.files[0];
      }
    },


    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },

    removeImage() {
      this.file = "";
      this.modifyPost();
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
        this.$refs.fileInput.value = '';
        this.displaySwitch() 
      })
    },
    resetModifyPost() {
      this.imageData = this.post.image;
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
  .send-button {
    background-color:#fe5634;
    border: none;
  }
  .img-container {
    max-width: 20em;
    max-height: 20em
  }
  .img-styling{
    height: 100%;
    width: 100%;
    object-fit: cover
  }

 .base-image-input {
  display: block;
  width: 5.5em;
  height: 5.5em;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.base-image-input:hover {
  opacity: 0.5;
}
  .placeholder {
  background: #ffd7d7;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1em;
  text-align: center;
  border: solid 1px #fd2d01;
  border-radius: 5px;
}
.placeholder:hover {
  background: #ffb3b3;
}
.file-input {
  display: none;
}
</style>