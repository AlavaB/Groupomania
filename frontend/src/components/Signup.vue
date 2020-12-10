<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="text-center" lg="8">
        <img class="icon-name" src="../assets/images/icon-name.png" alt="Logo and company name">
        <h1 class="pb-5">Bienvenue sur votre réseau social d'entreprise</h1>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col lg="8">
        
        <b-card align="center" class="identification-box" title="Inscrivez-vous">
          <b-col offset-lg="2" lg="8">
            <b-form @submit="onSubmit">
            <b-form-input class="mt-4" id="input-1" v-model="form.pseudo" required placeholder="Entrez votre pseudo"></b-form-input>
            <b-form-input class="mt-3" id="input-2" v-model="form.email" type="email" required placeholder="Entrez votre adresse email"></b-form-input>
            <b-form-input class="mt-3" id="input-3" v-model="form.password" type="password" required placeholder="Entrez votre mot de passe"></b-form-input>
            </b-form>
            <p class="text-center pt-4 ">Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
            <b-button class="ml-5 submit" type="signup" @click="onSubmit">S'inscrire</b-button></p> 
            {{ error }}
          </b-col>
        </b-card>
        
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import axios from 'axios'

export default {
  name: "Signup",
  
  data() {
      return {
        form: {
          email: '',
          pseudo: '',
          password: '',
        },
        show: true,
        error: '',
      }
    },
    methods: {
      onSubmit() {
        let newUser = {
          email: this.form.email,
          pseudo: this.form.pseudo,
          password: this.form.password
        }
        axios.post('http://localhost:3000/api/users', newUser)
          .then(res => {
            console.log(res)
          }, err => {
            this.error = err.response.data.title
          }
          )
         
      }        
    }
}

</script>

<style scoped>
  .identification-box {
        background-color: #ffd7d7;
    }
    .submit {
      background-color: #b2bec3;
      border: none;
    }
    h1 {
      font-size: 1.5em;
    }
  .icon-name {
      height: 250px;
    }
</style>
