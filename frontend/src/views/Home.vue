<template>
  <div class="home">
    <Header />
    <Connexion />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header'
import Connexion from '../components/Connexion'

export default {
  name: 'app',
  components: {
    Header,
    Connexion
  }
}
</script>
