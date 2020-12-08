<template>
    <div id="app">
        <b-form-group> {{ item.title }}
            <b-form-input> {{ item.description }}

            </b-form-input>
        </b-form-group>
    </div>    
          
         
</template>


<script>
export default {
  name: 'test',
  props: ['item'],

    data() {
        items: [
            { title: 'Adresse email', description: 'Entrez votre email'},
            { title: 'Mot de passe', description: 'Entrez votre mot de passe'},
        ]
    }
        
}


  
</script>