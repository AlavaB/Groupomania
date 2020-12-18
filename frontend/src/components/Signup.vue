<template>
  <b-container>
    <b-row align-h="center">
      <b-col class="text-center" sm="6" md="8" lg="8" >
        <img class="icon-name" src="../assets/images/icon-name.png" alt="Logo and company name">
        <h1 class="pb-5">Bienvenue sur votre réseau social d'entreprise</h1>
      </b-col>
    </b-row>

    <!--Formulaire d'inscription-->
    <b-row align-h="center">
      <b-col lg="8">
        <h2 class="mb-3" align="center">Inscrivez-vous</h2>
        <b-row>
          <b-col offset-lg="2" lg="8">
            <b-card class="identification-box">
              <div align="center">
                <b-form>
                  <label for="pseudo">Pseudo *</label>
                  <b-form-input id="input-1" class="mb-3 input" v-model="pseudo" required placeholder="Entrez votre pseudo" @keyup.enter="signup">                   
                  </b-form-input>
                  <label for="email-adress">Adresse email *</label>
                  <b-form-input id="input-2" class="mb-3 input" v-model="email" type="email" required placeholder="Entrez votre adresse email" @keyup.enter="signup">                  
                  </b-form-input>
                  <label for="password">Mot de passe *</label>
                  <b-form-input id="input-3" class="input" v-model="password" type="password" required placeholder="Entrez votre mot de passe" @keyup.enter="signup">                    
                  </b-form-input>
                </b-form>
              </div>
            </b-card>
            <p class="error-message font-weight-bold text-center mt-3">{{ error }}</p>
              <p align="center">Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
              <b-button pill class="submit-button ml-5" type="submit" @click="signup">S'inscrire</b-button>
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
  name: "Signup",
  data() {
    return {
      email: '',
      pseudo: '',
      password: '',
      show: true,
      error: '',
      pseudoRegex: /^[a-zA-Z0-9]{3,}$/,
      emailRegex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      passwordRegex: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
    }
  },
  methods: {
    signup() {
      let newUser = {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password,
        profil_picture: url.substring(0, url.length-4) + "images/avatar.png"
      }
      if (!this.emailRegex.test(this.email)) {
        return this.error = "Vous devez renseigner une adresse email valide";
      } else if (!this.pseudoRegex.test(this.pseudo)) {//TODO pseudo unicité 
        return this.error = "Votre pseudo doit contenir au moins 3 caractères";
      } else if (!this.passwordRegex.test(this.password)) {
        return this.error = "Votre mot de passe doit contenir au moins 8 caractères et au moins 1 lettre et 1 chiffre";
      } 
      this.$http.post(url + "users", newUser)
      .then(res => {
        if (res.status === 200) {
          this.$http.post(url + "users/login", newUser)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem('currentUser', JSON.stringify(res.data));
              this.$router.push("/");
            }})
          .catch(err => {
            localStorage.clear();
            this.error = err.response.data.title;//TODO erreur
          });
        }
      }
      ).catch(err => { this.error = err
        /*if (err = "email unicity problem") {
          this.error = "Adresse email déjà utilisée"
        } else {
          err
        }*/
        //this.error = err.response.data.title;TODO erreur
      })
    }
  }
};

</script>

<style scoped>
  .identification-box {
    background-color: #ffd7d7;
  }
  .submit-button {
    background-color: #ffd7d7;
    color: black;
    border: solid 1px #fd2d01;
  }
  .submit-button:hover {
    background: #ffb3b3;
  }
  h1 {
    font-size: 1.5em;
  }
  .icon-name {
    height: 250px;
  }
  .error-message {
    color: #fd2d01;
  }
  .input {
    width: 20em;
  }
</style>
