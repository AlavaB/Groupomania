<template>
  <div class="connexion-container pt-5">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group 
        id="input-group-1"
        label="Adresse email :"
        label-for="input-1"

      >
        <b-form-input class="offset-lg-3 col-lg-6" 
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pseudo :" label-for="input-2">
        <b-form-input class="offset-lg-3 col-lg-6"
          id="input-2"
          v-model="form.pseudo"
          required
          placeholder="Entrez votre pseudo"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Mot de passe :" label-for="input-3">
        <b-form-input class="offset-lg-3 col-lg-6"
          id="input-3"
          v-model="form.password"
          required
          placeholder="Entrez votre mot de passe"
                
        ></b-form-input>
      </b-form-group>

      

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    
  </div>

</template>

<script>
export default {
    data() {
      return {
        form: {
          email: '',
          pseudo: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.pseudo = ''
        this.form.password = ''
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>
.body {
    background-image: url("../assets/icon.png");
}
</style>