<template>
    <b-container>
      <Header />
        <b-row>
          <b-col offset-lg="2" lg="8">
            <b-form-textarea
              id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="3"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row v-for="post in posts" :key="post.id" class="post">

          <b-col offset-lg="2" lg="8">
            <div class="post-header">Publié par {{ post.user_id }} le {{ post.createdAt }}</div>
              <div class="post-content">{{ post.content }}</div>
              
            
          </b-col>
          <!--Récupération des posts-->
        </b-row>
    </b-container>

</template>
 
<script>
import Header from '../components/Header'

export default {
  name: "Forum",
  components: {
    Header,
  },
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.$http.get('http://localhost:3000/api/posts')
    .then(res => { this.posts = res.data})
      
  },
/*
  mounted() {
    axios.get('http://localhost:3000/api/users/get',{ headers: {token: localStorage.getItem('token')}})
    .then(res => {
      console.log(res)
  })
},
*/
  created() {
    //User is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  }
};


</script>


<style scoped>
  .post {
    border: solid 0.15em black;
  }
  .post-header {
    background-color:  #ffd7d7;
  }
</style>