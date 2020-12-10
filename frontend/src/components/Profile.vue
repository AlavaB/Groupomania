<template>
    <b-container>
        <Header />

        <b-row align-h="center">
            <b-col lg="8">
                <b-card align="center" class="identification-box" title="Mon profil">
                    <b-col offset-lg="2" lg="8">
                        <div>
                            <p>TO DO Image profil</p>
                        </div>
                        <div class="d-flex mt-4">
                            <b-form-input class="mr-4" id="input-1" v-model="form.pseudo" placeholder="Mon pseudo">
                                </b-form-input><b-button>Modifier</b-button>                    
                        </div>
                        <div class="d-flex mt-4">
                            <b-form-input class="mr-4" id="input-2" v-model="form.email" type="email" placeholder="Mon adresse email">
                                </b-form-input><b-button>Modifier</b-button>
                        </div>
                        <div class="d-flex mt-4">
                            <b-form-input class="mr-4" id="input-3" v-model="form.password" type="password" placeholder="Mon mot de passe">
                                </b-form-input><b-button>Modifier</b-button>
                        </div>

                    </b-col>
        </b-card>
      
            </b-col>
        </b-row>
    </b-container>

</template>
 
<script>
import Header from '../components/Header'

export default {
  name: "Profile",
  components: {
    Header,
  },
  data() {
      return {
        form: {
          email: '',
          pseudo: '',
          password: '',
        },
      
      }
    },
};
</script>

<style scoped>
  .identification-box {
        background-color: #ffd7d7;
    }
</style>