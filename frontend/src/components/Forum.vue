<template>
    <b-container display="flex">
      
      <Header @display-profile="switchDisplayProfile" :displayProfile="displayProfile"/>
      <Profile @display-profile="switchDisplayProfile" v-show="displayProfile" :userId="userId" :token="token" :displayProfile="displayProfile"></Profile>
      
      
      <b-row v-show="!displayProfile">
        
        <b-col offset="1" lg="1">
        <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                <span v-if="!imageData" class="placeholder">Insérer une image</span>
                <input class="file-input" ref="file" type="file" @input="onSelectFile">
              </div>
          </b-col>
          <b-col lg="8">
          <b-form-textarea id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="3" class="mb-3 ml-3 text-area" v-model="postTextArea">
          </b-form-textarea>
        </b-col>
          <b-col lg="1">
            <div class="button-col">
            <b-button pill size="sm" class="mb-3 send-button" @click="createPost">Envoyer</b-button>
            <b-button pill size="sm" class="mb-3 reset-button" @click="resetPost">Annuler</b-button>
          </div>
          </b-col>

      </b-row>
      <br><br><br><br><br>
      <b-row v-for="postData in posts" :key="postData.id" v-show="!displayProfile">
        <b-col>
          <Post :post="postData" :admin="admin" :userId="userId" :token="token"></Post>
        </b-col>
      </b-row>
      
    </b-container>
</template>
 
<script>
import Header from './Header.vue';
import Post from './Post.vue';
import Profile from './Profile.vue';
import { url } from '../main'


export default {
  name: "Forum",
  
  components: {
    Header,
    Post,
    Profile,
  },
  
  data() {
    return {
      imageData: null,
      displayCommands: false,
      displayProfile: false,
      posts: [],
      users: [],
      token: "",
      userId: "",
      admin: false,
      error: {},
      postTextArea: "",
      testKey: "",
      file: ""
    }
  },

  computed: {
    headers() {
      return {headers: {Authorization: this.token, userId: this.userId}} // voir si necessaire 'content-type': 'multipart/form-data'
    }
  },
  created() {
    this.getUser()
  },

  mounted() {
    this.getPosts()
  }, 

  methods: {

    chooseImage () {
      this.$refs.file.click()
    },
    onSelectFile () {
      const input = this.$refs.file
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = event => {
          this.imageData = event.target.result
        }
        reader.readAsDataURL(files[0])
        this.file = this.$refs.file.files[0];
      }
    },

    createPost() {
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('content', this.postTextArea);
      formData.append('user_id', this.userId)
      this.$http.post(url + 'posts', formData, this.headers)
      .then(() => { 
        this.resetPost()
        this.getPosts() 
      })
    },

    getPosts() {
      this.$http.get(url + 'posts', this.headers)
      .then(res => { 
        this.posts = res.data })
    },

    switchDisplayProfile(data) {
        this.displayProfile = data;
    },

    //Validation du state de l'utilisateur
    getUser() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser){
      this.token = currentUser.token
      this.userId = currentUser.userId
      this.$http.get(url + 'users/' + currentUser.userId, this.headers)
        .then(res => { this.admin = res.data.admin })
        .catch(() => { this.$router.push('/login')//A voir avec Robin pourquoi on arrive quand même sur le forum vide !
      })
      } else {
        this.$router.push('/login');
      }
      
    },
    resetPost() {
      this.imageData = null;
      this.postTextArea = '';
      this.$refs.file.value = ''
    }
}   
};


</script>


<style scoped>
  .text-area {
    resize: none;
    border: 1px solid#fd2d01;
  }
  .text-area:focus {
    outline: none !important;
    border: 1px solid #fd2d01;
    box-shadow: 0 0 10px  #ffd7d7;
  }
  .post {
    border-bottom: 0.15em solid  #fd2d01;
    padding-right: 0;
    padding-left: 0;
  }
  .post-header {
    background-color:  #ffd7d7;
    font-size: 1em;
    border-radius: 80px 30px;
    text-align: center;
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
    background: #f1f1f1;
  }
  .button-col {
    display: flex;
    flex-direction: column;
    width: 5em;
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