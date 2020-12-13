<template>
    <b-container display="flex">
      <Header />

        <b-row>
          <b-col offset-lg="2" lg="8">
            <b-form-textarea id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="1" class="mb-3 text-area" v-model="postTextArea">
            </b-form-textarea>
            <div class="d-flex justify-content-end"><b-button pill size="sm" class="mb-3" @click="httpCreatePost">Envoyer</b-button></div>
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

  created() {
    this.httpGetUser()
  },

  mounted() {
    this.httpGetPosts()
  }, 

  methods: {
    httpCreatePost() {
    const headers = {Authorization: this.token, userId: this.userId}
    const body = {
      content: this.postTextArea, 
      user_id: this.userId
    }
    this.$http.post('http://localhost:3000/api/posts', body, { headers })
      .then(res => { res, this.httpGetPosts () })
      .catch(err => {      
        console.log(err)})
    },

    httpGetUser () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser){
    this.token = currentUser.token
    this.userId = currentUser.userId
    const headers = {Authorization: this.token, userId: this.userId}
    this.$http.get(`http://localhost:3000/api/users/${currentUser.userId}`, { headers })
      .then(res => { this.admin = res.data.admin }) //Récupération si admin ou pas car pas noté dans local storage pour éviter de modifier dans devtools 
      .catch(err => { this.$router.push('/login')
      this.error = {
        Title: "Un problème est survenu",
        Message: err
      }
    })
  } else {
    this.$router.push('/login');
  }
  },
    httpGetPosts () {
    const headers = {Authorization: this.token, userId: this.userId}
    this.$http.get('http://localhost:3000/api/posts', { headers })
      .then(res => { this.posts = res.data})
      .catch(err => {      
        this.error = {
        Title: "Un problème est survenu",
        Message: err
      }})
    },
}
 
    
};
    //récupération des comments
    /*this.$http.get('http://localhost:3000/api/comments', { headers: {Authorization: localStorage.getItem('token')} })
    .then(res => { this.comments =console.log(res.data) })
    .catch(err => { if (err){ 
          console.log(err) }})*/
  
/*
  mounted() {
    axios.get('http://localhost:3000/api/users/get',{ headers: {token: localStorage.getItem('token')} })
    .then(res => {
      console.log(res)
  })*/

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

</style>