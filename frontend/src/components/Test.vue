<template>
  <div>

    {{postdata.id}}
  </div>
</template>          

<script>
export default {
  name: "Test",
  data(){
    return {
      test : {}
    }
  },
  props: {
    postdata: {
      type: Object
    }
  }
  /*      <div v-for="post in posts" :key="post.id">
        <test :postdata="post"></test>
      </div>*/
  
};
</script>
