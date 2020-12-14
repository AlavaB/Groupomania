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
        <b-card class="identification-box">
          <b-card-title align="center">Connectez-vous</b-card-title>
          <b-col offset-lg="2" lg="8">
            
            <b-form class="mb-3 mt-4">
              <label for="email-adress" class="mb-0">Adresse email *</label>
              <b-form-input class="mb-3" id="input-1" v-model="form.email" type="email" required placeholder="Entrez votre adresse email" @keyup.enter="login"></b-form-input>
              <label for="password" class="mb-0">Mot de passe *</label>
              <b-form-input id="input-3" v-model="form.password" type="password" required placeholder="Entrez votre mot de passe" @keyup.enter="login"></b-form-input>
            </b-form>
            
            <p class="text-center pt-4 ">Pas de compte ? <router-link to="/signup">S'inscrire</router-link>
            <b-button class="ml-5 submit" type="submit" @click="login">Se connecter</b-button></p> 
            {{ error }}
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { url } from '../main'

export default {
  name: "Login",
  data() {
      return {
        form: {
          email: 'emilieb@email.fr',
          password: '456789',
        },
        error: '',       
      }
  },
  methods: {
      login() {
        let user = {
          email: this.form.email,
          password: this.form.password
        }
        this.$http.post(url+'users/login', user)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem('currentUser', JSON.stringify(res.data));
              this.$router.push('/');
            }
          })
          .catch(err => {
            localStorage.clear();
            this.error = err.response.data.title
          });  
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    

