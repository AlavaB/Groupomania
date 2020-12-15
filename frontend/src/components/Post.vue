<template>
    <b-container>
        <b-row>
            <b-col offset-lg="1" lg="1"><b-avatar :src="require('../assets/images/avatar.png')" size="3rem"></b-avatar></b-col>
            <b-col lg="8" class="post mb-4">
            <div class="post-header pr-2 pl-2 mb-3 font-weight-bolder">Publié par {{ post.user }} le {{ post.creationDate }}</div>
            <div v-show="!displayModifyPost" class="post-content pr-2 pl-2">{{ post.content }}</div>
            
            <b-form-textarea class="text-area" v-show="displayModifyPost" v-model="modifyTextArea">
            </b-form-textarea>
            
            <div class="mt-3 mb-3">
                <b-button-group v-show="!displayModifyPost">
                    <b-dropdown variant="outline-danger" size="sm" right text=". . .">
                    <b-dropdown-item v-if="userId === post.userId" @click="displaySwitch">Modifier</b-dropdown-item>
                    <b-dropdown-item v-if="admin || userId === post.userId" @click="deletePost">Supprimer</b-dropdown-item>
                    <b-dropdown-item>Commenter</b-dropdown-item>
                    </b-dropdown>
                </b-button-group>
                <b-button pill size="sm" class="send-button" v-show="displayModifyPost" @click="modifyPost">Envoyer</b-button>
                <b-button pill size="sm" class="reset-button" v-show="displayModifyPost" @click="resetModifyPost">Annuler</b-button>
                <b-textarea v-model="commentTextArea"></b-textarea>
                <b-button  @click="createComment">Envoyer</b-button>


            </div>
            </b-col>
        </b-row>

        <b-row v-for="commentData in post.comments" :key="commentData.id">
        <b-col>
          <Comment :comment="commentData" :admin="admin" :userId="userId" :token="token"></Comment>
        </b-col>
      </b-row>

    </b-container>
</template>          

<script>
import Comment from './Comment.vue';
import { url } from '../main'


export default {
  name: "Post",
  components: {
    Comment,
  },
  data(){
    return {
      displayModifyPost : false,
      modifyTextArea: this.post.content,
      commentTextArea: "",
      uri: 'posts/' + this.post.id,
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
    },
    bodyComment() {
      return {
        userId: this.userId,
        postId: this.post.id,
        content: this.commentTextArea
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
  methods: {
    parentGetPosts() {this.$parent.getPosts()},

    displaySwitch() {this.displayModifyPost= !this.displayModifyPost},
    
    getOnePost() {
      this.$http.get(url + 'posts/' + this.post.id, this.headers)
      .then(res => { this.modifyTextArea = res.data.content })
    },

    deletePost() {
      this.$http.delete(url + this.uri, this.headers)
      .then(() => { 
        this.parentGetPosts()
      })
    },

    modifyPost() { 
      this.$http.put(url+this.uri, this.body, this.headers)
      .then(() => { 
        this.parentGetPosts();
        this.displaySwitch() 
      })
    },
    resetModifyPost() {
      this.getOnePost() 
      this.displaySwitch()         
    },

    createComment() {
      console.log(this.bodyComment)
      this.$http.post(url + 'comments', this.bodyComment)
      .then(() => { console.log(this.post_id) })
      .catch(err => { console.log(err)})
    },
  }
};
</script>

<style scoped>
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
    background-color:#85e085;
    border: none;
    color: black;
  }
  .reset-button {
    background-color:#fe5634;
    border: none;
  }
</style>