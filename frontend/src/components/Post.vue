<template>
    <b-container>
        <b-row>
            <b-col offset-lg="1" lg="1"><b-avatar size="4rem">{{ post.image }}</b-avatar></b-col>
            <b-col lg="8" class="post mb-4">
            <div class="post-header pr-2 pl-2 mb-3 font-weight-bolder">Publié par {{ post.user }} le {{ post.creationDate }}</div>
            <div v-show="!displayModifyPost" class="post-content pr-2 pl-2">{{ post.content }}</div>
            <b-form-textarea class="text-area" v-show="displayModifyPost" v-model="modifyTextArea">

            </b-form-textarea>
            <div class="mt-3 mb-3">
                <b-button-group v-show="!displayModifyPost">
                    <b-dropdown variant="outline-danger" size="sm" right text=". . .">
                    <b-dropdown-item v-if="userId === post.userId" @click="displayModifyPost= !displayModifyPost">Modifier</b-dropdown-item>
                    <b-dropdown-item v-if="admin || userId === post.userId" @click="httpDeletePost">Supprimer</b-dropdown-item>
                    <b-dropdown-item>Commenter</b-dropdown-item>
                    </b-dropdown>
                </b-button-group>
                <b-button v-show="displayModifyPost" @click="httpModifyPost">Envoyer</b-button>
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

export default {
  name: "Post",
  components: {
    Comment,
  },
  data(){
    return {
      displayModifyPost : false,
      modifyTextArea: this.post.content
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
    httpDeletePost () {
    const headers = {Authorization: this.token, userId: this.userId}
    this.$http.delete(`http://localhost:3000/api/posts/${this.post.id}`, { headers })
      .then(() => { this.$parent.httpGetPosts() })
      .catch(err => {      
        this.error = {
        Title: "Un problème est survenu",
        Message: err
      }})
    },
    httpModifyPost() {
    const headers = {Authorization: this.token, userId: this.userId}
    const body = {
      content: this.modifyTextArea
    }
    this.$http.put(`http://localhost:3000/api/posts/${this.post.id}`, body, { headers })
      .then(() => { this.$parent.httpGetPosts(), this.displayModifyPost= !this.displayModifyPost })
      .catch(err => {      
        this.error = {
        Title: "Un problème est survenu",
        Message: err
      }})
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
  .text-area {
    resize: none;
    border: 1px solid#fd2d01;
  }
  .text-area:focus {
    outline: none !important;
    border: 1px solid #fd2d01;
    box-shadow: 0 0 10px  #ffd7d7;
  }
</style>