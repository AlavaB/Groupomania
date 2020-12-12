<template>
  <div>
    <b-form-group
      id="fieldset-1"
      label="Email"
      valid-feedback="Thank you!"
      required
      placeholder="Entrez votre adresse email"
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input
        id="input-1"
        v-model="email"
        :state="state"
        trim
      ></b-form-input>
    </b-form-group>
  </div>
</template>          

<script>
export default {
  name: "Test",
  computed: {
    state() {
      
      return this.name.length >= 4;
    },
    invalidFeedback() {
      if (!this.emailRegex.test(this.email)) {
        return "NOK";
      }
      return "Please enter something.";
    },
  },
  data() {
    return {
      name: "",
      emailRegex: /.+@.+\..+/
    };
  },
};
</script>





  /*export default {
    computed: {
      state() {
        return this.name.length >= 4
      },
      invalidFeedback() {
        if (this.name.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Please enter something.'
      }
    },
    data() {
      return {
        name: ''
      }
    }
  }*/