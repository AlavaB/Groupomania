<template>
    <b-container display="flex">
      <Header />

        <b-row>
          <b-col offset-lg="2" lg="8">
            <b-form-textarea id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="1" class="mb-3 text-area" v-model="postTextArea">
            </b-form-textarea>
            <div class="d-flex justify-content-end">
              <b-button pill size="sm" class="mb-3 send-button" @click="createPost">Envoyer</b-button>
              <b-button pill size="sm" class="mb-3 reset-button" @click="resetPost">Annuler</b-button></div>
          </b-col>
        </b-row>
        
      <b-row v-for="postData in posts" :key="postData.id">
        <b-col>
          <Post :post="postData" :admin="admin" :userId="userId" :token="token"></Post>
        </b-col>
      </b-row>
    </b-container>
</template>
 
<script>
import Header from './Header.vue';
import Post from './Post.vue';
import { url } from '../main'


export default {
  name: "Forum",
  
  components: {
    Header,
    Post,
  },
  
  data() {
    return {
      posts: [],
      token: "",
      userId: "",
      admin: false,
      error: {},
      postTextArea: "",
      testKey: "",
    }
  },

  computed: {
    headers() {
      return {headers: {Authorization: this.token, userId: this.userId}}
    },
    body() {
      return { 
        content: this.postTextArea, 
        user_id: this.userId }
    }

  },
  created() {
    this.getUser()
  },

  mounted() {
    this.getPosts()
  }, 



  methods: {
    createPost() {
      this.$http.post(url + 'posts', this.body, this.headers)
      .then(() => {
      this.getPosts()
      this.resetPost()
      })
    },

    getPosts() {
       this.$http.get(url + 'posts', this.headers)
      .then(res => { this.posts = res.data} )
    },

    getUser () {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser){
      this.token = currentUser.token
      this.userId = currentUser.userId
      this.$http.get(url + 'users/' + currentUser.userId, this.headers)
        .then(res => { this.admin = res.data.admin }) //Récupération si admin ou pas car pas noté dans local storage pour éviter de modifier dans devtools 
        .catch(() => { this.$router.push('/login')
      })
      } else {
        this.$router.push('/login');
      }
      
    },
    resetPost() {
      this.postTextArea = '';
      
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
    background-color:#85e085;
    border: none;
    color: black;

  }
  .reset-button {
    background-color:#fe5634;
    border: none;
  }
</style>