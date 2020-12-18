<template>
  <b-container>  
    <b-row align-h="center">
      <b-col class="text-center" sm="10" lg="8">
        <img class="icon-name" src="../assets/images/icon-name.png" alt="Logo and company name">
        <h1 class="pb-4">Bienvenue sur votre réseau social d'entreprise</h1>
      </b-col>
    </b-row>
    
    <!--Formulaire de connexion-->
    <b-row align-h="center">
      <b-col lg="8">        
        <h2 class="mb-3" align="center">Connectez-vous</h2>
        <b-row>
          <b-col offset="1" cols="10" offset-sm="1" sm="10" offset-md="1" md="10" offset-lg="2" lg="8">
            <b-card align="center" class="identification-box">  
              <div align="center">
                <b-form>
                  <label for="email-adress" >Adresse email *</label>
                  <b-form-input class="mb-3 input" id="input-1" v-model="email" type="email" required placeholder="Entrez votre adresse email" @keyup.enter="login">                  
                  </b-form-input>
                  <label for="password" >Mot de passe *</label>
                  <b-form-input class="input" id="input-2" v-model="password" type="password" required placeholder="Entrez votre mot de passe" @keyup.enter="login">                 
                  </b-form-input>
                </b-form>
              </div>
            </b-card>
            <p class="error-message font-weight-bold text-center mt-3">{{ error }}</p>
            <p align="center">Pas de compte ? <router-link to="/signup">S'inscrire</router-link>
              <b-button pill class="submit-button ml-5" type="submit" @click="login">Se connecter</b-button>
            </p>
          </b-col>
        </b-row> 
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
        email: 'emilie@email.fr',//nikola@email.fr, 
        password: 'emilietest1',//nikolatest1, emilietest1
        error: '',  
      }
  },
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$http.post(url + 'users/login', user)
        .then(res => {
        if (res.status === 200) {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.$router.push('/');
        }})
        .catch(() => {
          localStorage.clear();
          this.error = "Nous ne pouvons pas vous connecter. Vérifiez vos identifiants."
        });  
    }
  }
}
</script>

<style scoped>
  .identification-box {
      background-color: #ffd7d7;
  }
  .icon-name {
    height: 250px;
  }
  h1 {
    font-size: 1.5em;
  }
  .submit-button {
    background-color: #ffd7d7;
    color: black;
    border: solid 1px #fd2d01;
  }
  .submit-button:hover {
      background: #ffb3b3;
  }
  .error-message {
    color: #fd2d01;
  }
  .input {
    width: 20em;
  }

  @media screen and (max-width: 580px) {
    .icon-name {
      height: 180px;
    }
    h1 {
      font-size: 1.2em;
    }
    h2 {
      font-size: 1em;
    }
    .input {
    width: 12em;
    }
  }
</style>
    

