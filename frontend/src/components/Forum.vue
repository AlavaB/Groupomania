<template>
    <b-container display="flex">
      <Header @display-profile="switchDisplayProfile" :displayProfile="displayProfile"/>
      <Profile @display-profile="switchDisplayProfile" v-show="displayProfile" :userId="userId" :token="token" :displayProfile="displayProfile"></Profile>
      <b-row v-show="!displayProfile">
        <b-col offset-lg="2" lg="8">
          <b-form-textarea id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="1" class="mb-3 text-area" v-model="postTextArea">
          </b-form-textarea>
          <div class="d-flex justify-content-end">
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            <b-button pill size="sm" class="mb-3 mr-3 reset-button" @click="resetPost">Annuler</b-button>
            <b-button pill size="sm" class="mb-3 send-button" @click="createPost">Envoyer</b-button>
          </div>
        </b-col>
      </b-row>
        
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
        handleFileUpload(){
      this.file = this.$refs.file.files[0];
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
  .reset-button {
    background-color: transparent;
    border: solid 1px #fd2d01;
    color: black;
  }

</style>