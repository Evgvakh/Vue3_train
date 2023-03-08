<template>
  <form @submit.prevent>
    <h3>Create post</h3>
    <MyInput v-model="this.post.titre" placeholder="Title" />
    <MyInput v-model="this.post.contenu" placeholder="Content" />
    <MySelect 
      v-model:value="this.post.id_category" 
      :options="cats" 
      :title="'Select category'"
      style="margin: 15px 0;">
    </MySelect>
    <MyFileInput 
      v-model="this.post.img"
      />
    <MyButton
      style="align-self: flex-end; margin-top: 15px"
      @click="createPost"
    >
      Create
    </MyButton>
  </form>
</template>

<script>
import axios from 'axios';
import MyFileInput from '@/components/UI/MyFileInput.vue'


export default {
  
  data() {
    return {
      post: {
        titre: "",
        contenu: "",
        img: 'img/72Telecaster.webp',
        id_category: '',
        id_user: 1
      },

      category: [],
      
    };
  },

  components: {
    MyFileInput
  },

  props: {
    cats: {
      type: Array,
    }
  },

  methods: {
    async createPost() {      
      const response = await axios.post('http://localhost/vue3/addPost.php', {
        title: this.post.titre,
        content: this.post.contenu,
        img: 'img/72Telecaster.webp',
        id_user: this.post.id_user,
        id_category: this.post.id_category,
        date: Date.now()    
        }, { 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(response.data)
      
      console.log(this.post)      
      this.$emit("add");
      this.post = {
        titre: "",
        contenu: "",
        img: 'img/72Telecaster.webp',        
        id_category: 1,
        id_user: 1
      };
    },
    
  },

  mounted() {
    
  }
} 

</script>

<style scoped>
form {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
</style>
