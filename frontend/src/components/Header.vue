<template>
  <b-container class="mb-4"> 
    <b-navbar class="pt-3" toggleable="lg" type="light">
      <b-navbar-brand @click="disableDisplayProfile" href="#">
        <router-link to="/"><!--TODO-->
          <img class="logo" src="../assets/images/icon-header.png" alt="Logo and company name"/>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-show="!displayProfile" @click="switchDisplayProfile">Profil</b-nav-item>
          <b-nav-item v-show="displayProfile" @click="switchDisplayProfile">Forum</b-nav-item>
          <b-nav-item @click="logout">Déconnexion</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
 
<script>
export default {
  name: "Header",
  props: {
    displayProfile: {
        type: Boolean
    },
  },
  methods: {
    switchDisplayProfile() {
      let emitDisplayProfile = !this.displayProfile;
      this.$emit('display-profile', emitDisplayProfile)
    },
    disableDisplayProfile() {
      this.$emit('display-profile', false)
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
  };


</script>

<style scoped>
    .header-link {
        color: #fd2d01;
        text-decoration: none;
    }
    .logo {
        height: 50px;
    }

</style>