<template>
    <b-container>
          <b-row>
                <b-col offset-lg="4" lg="6" class="comment mb-4">
                    <div class="comment-header pr-2 pl-2 mb-3 font-weight-bolder">Commenté par {{ comment.pseudo }} le {{ comment.creationDate }}</div>
                    <div class="comment-content pr-2 pl-2">{{ comment.content }}</div>
                    <div class="mt-3 mb-3">
                    <b-button-group class="d-flex justify-content-end">
                        <b-dropdown class="dropdown-comment" variant="outline-danger" size="sm" right text=". . .">
                        <b-dropdown-item v-if="userId === comment.userId">Modifier</b-dropdown-item>
                        <b-dropdown-item v-if="admin || userId === comment.userId">Supprimer</b-dropdown-item>
                        </b-dropdown>
                    </b-button-group>
                    </div>                
                </b-col>
                </b-row>
    </b-container>
</template>

<script>
export default {
    name: "Comment",
    props: {
        comment: {
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
}
</script>


<style scoped>
.comment {
    padding-left: 0;
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