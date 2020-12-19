<template>
    <b-container>
        <b-row>          
          <b-col sm="12" offset-md="1" md="10" offset-lg="2" lg="8" class="post mb-4">
              <div class="post-header mb-3">
                <div class="profile-picture mr-4" @click="getUsersPosts" :style="{ 'background-image': `url(${post.userProfilePicture})` }"></div>
                <p class="mb-0" align="center">Publié par <span class="user-name font-weight-bolder" @click="getUsersPosts">{{ post.user }}</span> le {{ post.creationDate }}</p>
              </div>
          <!-- Vue pour modification -->
            <b-row  v-show="displayModifyPost"> 
              <b-col class="image-area" cols="3" sm="3" md="2" lg="2" align="center">
                <div class="base-image-input" v-b-tooltip.hover title="Modifier l'image" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                  <span v-if="!imageData" class="placeholder">Insérer une image</span>
                  <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
                </div>
                <a @click="removeImage" v-show="displayRemoveImage" class="remove-image" href="#" style="display: inline;">&#215;</a>
              </b-col>
              <b-col cols="9" sm="8=9" md="8" lg="8" align="center">
                <b-form-textarea class="text-area" rows="3" v-model="modifyTextArea">
                      </b-form-textarea>
              </b-col>
              <b-col cols="12" sm="12" md="2" lg="2" align="center">
                <div class="button-col">
                <b-button pill size="sm" class="mb-3 send-button" @click="modifyPost">Envoyer</b-button>
                <b-button pill size="sm" class="mb-3 reset-button" @click="resetModifyPost">Annuler</b-button>
                </div>
              </b-col>                                          
            </b-row>

          <!-- Affichage -->
            <b-row v-show="!displayModifyPost">            
              <b-col align="center" cols="12" sm="12" md="3" lg="3" v-show="displayPostImage">
                <div class="post-image"><img id="modifyImage" class="image-styling" :src="postImage" alt="Image"></div>
              </b-col>
              <b-col class="post-content-mobile mt-2" cols="12" sm="10" md="7" lg="7" v-show="displayPostImage">
                <div class="post-content pr-2 pl-2">{{ post.content }}</div>
              </b-col>
              <b-col class="post-content-mobile" cols="12" sm="10" md="10" lg="10" v-show="!displayPostImage">
                <div class="post-content pr-2 pl-2">{{ post.content }}</div>
              </b-col>
              <b-col cols="12" sm="2" md="2" lg="2">
              <div align="center">
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
      imageData: this.post.image,
      displayModifyPost : false,
      displayDropdownButton: false,
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
    displayPostImage() {
      if(this.post.image) {
        return true;
      } else {
        return false;
      }
    },
    displayRemoveImage() {
      if(this.imageData) {
        return true;
      } else {
        return false;
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
    getUsersPosts() {
      this.$http.get(url + 'posts/users/' + this.post.userId, this.headers)
      .then(res => { 
        this.$emit('users-posts', res.data);
        this.$emit('post-by-profile', true) })
    },
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

    removeImage() {
      this.file = "";
      this.imageData = "";
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
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;    
    background-color:  #ffd7d7;
    font-size: 1em;
    border-radius: 80px 30px;
    white-space: pre-wrap;
    border-top: 0.8rem solid  #d6d6c2;
  }
  .profile-picture {
    width: 2.2em;
    height: 2.2em;
    cursor: pointer;
    vertical-align: middle;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
  }
  .user-name {
    cursor: pointer;
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
    background-color: #ffd7d7;
    color: black;
    border: solid 1px #fd2d01;
  }
  .send-button:hover {
      background: #ffb3b3;
  }
  .reset-button {
    background-color: transparent;
    border: solid 1px #ffb3b3;
    color: #ffb3b3;
  }
  .reset-button:hover {
    background: #ffe4e4;
    color:  #fd2d01;
  }
  .button-col {
    display: flex;
    flex-direction: column;
  }
  .post-image {
    max-width: 10em;
    max-height: 10em
  }
  .image-styling{
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
.remove-image {
    display: none;
    position: absolute;
    top: -0.5em;
    right: 0.5em;
    border-radius: 10em;
    padding: 2px 6px 3px;
    text-decoration: none;
    font: 700 21px/20px sans-serif;
    background: #555;
    border: 3px solid #fff;
    color: #FFF;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3);
  }
.remove-image:hover {
  background: #E54E4E;
}
.remove-image:active {
  background: #E54E4E;
}

   @media screen and (max-width: 768px) {
     .post-header {
       font-size: 1em;
     }
     .button-col {
      flex-direction: row-reverse;
      justify-content: space-evenly;
      margin-top: 1em;
    }
    
   }
  @media screen and (max-width: 576px) {
    .post-content-mobile {
      margin-top: 1.5em;
      text-align: center;
    }
   .post-header {
       font-size: 0.9em;
     }
     .button-col {
       margin-top: 1em;
     }

  }
  
   
</style>