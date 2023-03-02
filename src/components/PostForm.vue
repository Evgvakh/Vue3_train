<template>
  <form @submit.prevent>
    <h3>Create post</h3>
    <MyInput v-model="this.post.titre" placeholder="Title" />
    <MyInput v-model="this.post.contenu" placeholder="Content" />
    <!-- <MySelect :options="filterCategories"></MySelect> -->
    <MyButton
      style="align-self: flex-end; margin-top: 15px"
      @click="createPost"
    >
      Create
    </MyButton>
  </form>
</template>

<script>
import MySelect from "./UI/MySelect.vue";

export default {
  data() {
    return {
      post: {
        titre: "",
        contenu: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("add", this.post);
      this.post = {
        titre: "",
        contenu: "",
      };
    },

    // async fetchCategories() {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost/vue3/processCategories.php"
    //     )
    //     console.log(response.data)
    //     response.data.foreach((item, idx) => {
    //         el = {value: item.id, name: item.nom}
    //         console.log(el)
    //         this.filterCategories.push(el)
    //     })
    //     console.log(this.filterCategories)
    //   } catch {}
    // }
  },

  components: { MySelect },

//   created() {
//     this.fetchCategories()
//   }
};
</script>

<style scoped>
form {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
</style>
