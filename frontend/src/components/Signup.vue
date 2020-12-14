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
            <b-card-title align="center">Inscrivez-vous</b-card-title>
            <b-col offset-lg="2" lg="8">

            <b-form class="mb-3 mt-4">
                <label for="pseudo" class="mb-0" @keyup.enter="login">Pseudo *</label>
                <b-form-input id="input-1" class="mb-3" v-model="form.pseudo" required placeholder="Entrez votre pseudo"></b-form-input>
                <label for="email-adress" class="mb-0" @keyup.enter="login">Adresse email *</label>
                <b-form-input id="input-2" class="mb-3" v-model="form.email" type="email" required placeholder="Entrez votre adresse email"></b-form-input>
                <label for="password" class="mb-0" @keyup.enter="login">Mot de passe *</label>
                <b-form-input id="input-3" class="mb-3" v-model="form.password" type="password" required placeholder="Entrez votre mot de passe"></b-form-input>
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
import { url } from '../main'

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
        regex: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      }
    },
    methods: {
    onSubmit() {
      let newUser = {
        pseudo: this.form.pseudo,
        email: this.form.email,
        password: this.form.password,
      };
      //event.preventDefault()
      //if (this.formpesudo === )
      if (this.form.email === "") {
        this.error = "vous devez renseigner une adresse email";
      } else if (!this.regex.test(this.form.email)) {
        this.error = "Vous devez renseigner une adresse email valide";
      }
      this.$http.post(url + "users", newUser).then(
        (res) => {
          if (res.status === 200) {
            this.$http.post(url + "users/login", newUser)
              .then((res) => {
                if (res.status === 200) {
                  localStorage.setItem("currentUser", JSON.stringify(res.data));
                  this.$router.push("/");
                }
              })
              .catch((err) => {
                localStorage.clear();
                this.error = err.response.data.title;
              });
          }
        },
        (err) => {
          this.error = err.response.data.title;
        }
      );
    },
  },
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
