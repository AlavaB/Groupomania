<template>
    <b-container>
          <b-row>
                <b-col offset-lg="4" lg="6" class="comment mb-4">
                    <div class="comment-header pr-2 pl-2 mb-3 font-weight-bolder">Commenté par {{ comment.pseudo }} le {{ comment.creationDate }}</div>
                    <div v-show="!displayModifyComment" class="comment-content pr-2 pl-2">{{ comment.content }}</div>
                    
                    <b-form-textarea class="text-area" v-show="displayModifyComment" v-model="modifyTextArea">
                    </b-form-textarea>
                    
                    <div class="mt-3 mb-3 d-flex justify-content-end">
                        <div>
                            <b-button-group v-show="!displayModifyComment">
                                <b-dropdown class="dropdown-comment" variant="outline-danger" size="sm" right text=". . .">
                                <b-dropdown-item v-if="userId === comment.userId" @click="displayModifyComment= !displayModifyComment">Modifier</b-dropdown-item>
                                <b-dropdown-item v-if="admin || userId === comment.userId" @click="deleteComment">Supprimer</b-dropdown-item>
                                </b-dropdown>
                            </b-button-group>
                        </div>
                    
                    <b-button pill size="sm" class="send-button" v-show="displayModifyComment" @click="modifyComment">Envoyer</b-button>
                    <b-button pill size="sm" class="reset-button" v-show="displayModifyComment" @click="resetModifyComment">Annuler</b-button>

                    </div>                
                </b-col>
                </b-row>
    </b-container>
</template>

<script>
import { url } from '../main'

export default {
  name: "Comment",
  
  data(){
    return {
      displayModifyComment : false,
      modifyTextArea: this.comment.content,
      uri: 'comments/' + this.comment.id,
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
      return { content: this.modifyTextArea }
    }
  },

  props: {
      comment: {
          type: Object
      },
      userId: {
          type: String
      },
      postId: {
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
    displaySwitch() {this.displayModifyComment= !this.displayModifyComment},

    deleteComment () {
    this.$http.delete(url+this.uri, this.headers)
      .then(() => { 
        this.$parent.parentGetPosts()
      })
    },

    modifyComment() {
    this.$http.put(url+this.uri, this.body, this.headers)
      .then(() => { this.$parent.parentGetPosts();
      this.displaySwitch()
       })
    },
    resetModifyComment() {
      this.displaySwitch() 
      
    }
  }
}
</script>


<style scoped>
  .comment {
    padding-left: 0;
    padding-right: 0;

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
  .send-button {
    background-color:#85e085;
    border: none;
    color: black;
  }
  .reset-button {
    background-color:#fe8067;
    border: none;
  }
</style>