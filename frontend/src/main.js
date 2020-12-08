import Vue from 'vue'//Importation de Vue
import { BootstrapVue } from 'bootstrap-vue'

//const axios = require('axios');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'

Vue.use(BootstrapVue)

Vue.config.productionTip = false



new Vue({


/*  mounted: function () {
    axios.get('http://localhost:3000/api')
      .then(response => this.posts = response.data)
      //.catch(error => this.posts = [{title: 'No posts found'}]);
  },*/

  router,
  render: h => h(App)
}).$mount('#app')
