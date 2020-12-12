<template>
    <b-container display="flex">
      <Header />
        
        <b-row>
          <b-col offset-lg="2" lg="8">
            <b-form-textarea id="textarea-rows" placeholder="Que voulez-vous dire ?" rows="1" class="mb-3">
            </b-form-textarea>
            <div class="d-flex justify-content-end"><b-button pill size="sm" class="mb-3">Envoyer</b-button></div>
          </b-col>
        </b-row>
        
        <b-row v-for="post in posts" :key="post.id">
          <b-col offset-lg="1" lg="1"><b-avatar size="4rem">{{ post.post_image }}</b-avatar></b-col>
          <b-col lg="8" class="post mb-4">
            <div class="post-header pr-2 pl-2 mb-3 font-weight-bolder">Publié par {{ post.post_user }} le {{ post.post_creation_date }}</div>
            <div class="post-content pr-2 pl-2">{{ post.post_content }}</div>
            <div class="mt-3 mb-3">
                <b-button-group>
                  <b-dropdown variant="outline-danger" size="sm" right text=". . .">
                    <b-dropdown-item v-if="userId === post.post_user_id">Modifier</b-dropdown-item>
                    <b-dropdown-item v-if="admin || userId === post.post_user_id">Supprimer</b-dropdown-item>
                    <b-dropdown-item>Commenter</b-dropdown-item>
                  </b-dropdown>
                </b-button-group>
            </div>
              
              <b-row v-for="comment in post.comments_data" :key="comment.id">
                <b-col offset-lg="4" lg="8" class="comment mb-4">
                  <div class="comment-header pr-2 pl-2 mb-3 font-weight-bolder">Commenté par {{ comment.pseudo }} le {{ comment.creation_date }}</div>
                  <div class="comment-content pr-2 pl-2">{{ comment.content }}</div>
                  <div class="mt-3 mb-3">
                    <b-button-group class="d-flex justify-content-end">
                      <b-dropdown class="dropdown-comment" variant="outline-danger" size="sm" right text=". . .">
                      <b-dropdown-item v-if="userId === comment.user_id">Modifier</b-dropdown-item>
                      <b-dropdown-item v-if="admin || userId === comment.user_id">Supprimer</b-dropdown-item>
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
import Header from '../components/Header'

export default {
  name: "Forum",
  components: {
    Header,
  },
  data() {
    return {
      posts: [],
      admin: JSON.parse(localStorage.getItem('currentUser')).admin,
      userId: JSON.parse(localStorage.getItem('currentUser')).userId
    }
  },

    created() {
    //User is not authorized
    if (!(localStorage.getItem('currentUser'))) {
      this.$router.push('/login');
    }
 
  },
 
  mounted() {
    const headers = {Authorization: JSON.parse(localStorage.getItem('currentUser')).token,
                    userId: JSON.parse(localStorage.getItem('currentUser')).userId}
    //récupération des posts
    this.$http.get('http://localhost:3000/api/posts', { headers })
      .then(res => { this.posts = res.data})
      .catch(err => { if (err){ 
          this.$router.push('/login');
          }})
     },
     
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
  #textarea-rows {
    resize: none;
    border: 1px solid#fd2d01;
  }
  #textarea-rows:focus {
    outline: none !important;
    border: 1px solid #fd2d01;
    box-shadow: 0 0 10px  #ffd7d7;
  }
  .post {
    border-bottom: 0.15em solid  #fd2d01;
    padding-right: 0;
    padding-left: 0;
  }
  .comment {
    padding-left: 0;
  }
  .post-header {
    background-color:  #ffd7d7;
    font-size: 1em;
    border-radius: 80px 30px;
    text-align: center;
  }

  .comment-header {
    background-color:  #ffd7d7;
    font-size: 1em;
    border-radius: 80px 30px;
    text-align: center;
  }
  .dropdown-comment {
    text-align: center;
  }

</style>