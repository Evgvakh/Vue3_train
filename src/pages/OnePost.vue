<template>
  <h1>{{ this.post }}</h1>
</template>

<script>

import axios from 'axios';

export default {    

  data() {
    return {
        post: []
    };
  },

  methods: {
    async fetchPost() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          `http://localhost/vue3/getPost.php`,
        {
            params: {
                id: this.$route.params.id
            } 
        }         
        );
        this.post = response.data;
        console.log(this.post)        
        this.isPostLoading = false;
      } catch {}
    },
    
  },

  async mounted() {
    await this.fetchPost()    
  }
};
</script>

<style scoped></style>
