<template>
  <b-container class="mb-4"> 
    <b-navbar class="pt-3" toggleable="lg" type="light">
      <b-navbar-brand href="#">
        <img class="logo" src="../assets/images/icon-header.png" width="280" height="60" alt="Site Logo"/>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><router-link class="header-link" to="/header">Mon profil</router-link></b-nav-item>
          <b-nav-item><router-link class="header-link" to="/header">Administrateur</router-link></b-nav-item>
          <b-nav-item><router-link class="header-link" to="/">Déconnexion</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
 
<script>
export default {
  name: "Header",
};
</script>


<style scoped>
    .header-link {
        color: #fd2d01;
        text-decoration: none;
    }
</style>