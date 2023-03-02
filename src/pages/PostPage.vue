<template>
    <div>
      <MyInput v-model="searchQuery" placeholder="Search in title" />
      <div class="app__btns">
        <MyButton @click="showDialog">Create Post</MyButton>
        <MySelect v-model:value="selectedSort" :options="sortOptions"></MySelect>
      </div>
      <MyDialog v-model:show="dialogVisible">
        <PostForm @add="createPost" />
      </MyDialog>
      <!-- <MyPagination 
        :pageData="pages" 
        @newPage="changePage" 
        /> -->
      <PostList
        :posts="this.sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
      />
      <div v-else><h2>Loading</h2></div>
      <div ref="observer" class="observer"></div>
      <!-- <MyPagination 
        :pageData="pages" 
        @newPage="changePage" 
        /> -->
    </div>
  </template>
  
  <script>
  import PostForm from "@/components/PostForm.vue";
  import PostList from "@/components/PostList.vue";
  import MyButton from "@/components/UI/MyButton.vue";
  import MyDialog from "@/components/UI/MyDialog.vue";
  import axios from "axios";
  import MySelect from "@/components/UI/MySelect.vue";
  import MyInput from "@/components/UI/MyInput.vue";
  import MyPagination from "@/components/MyPagination.vue";
  
  export default {
    components: {
      PostForm,
      PostList,
      MyDialog,
      MyButton,
      MySelect,
      MyInput,
      MyPagination,
    },
  
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        selectedSort: "id_category",
        sortOptions: [
          { value: "titre", name: "Title" },
          { value: "contenu", name: "Content" },
          { value: "id_category", name: "Category" },
        ],
        searchQuery: "",
        limit: 5,
        pages: {
          page: 1,
          totalPages: 0,
        },
      };
    },
  
    methods: {
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
      },
  
      removePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id);
      },
  
      showDialog() {
        this.dialogVisible = true;
      },
  
      async fetchPosts() {
        try {
          this.isPostLoading = true;
          const response = await axios.get(
            `http://localhost/vue3/processUsers.php`,
            {
              params: {
                offset: this.pages.page - 1,
                limit: this.limit
              },
            }
          );
          this.pages.totalPages = Math.ceil(24 / this.limit);
          this.posts = response.data;
  
          this.isPostLoading = false;
        } catch {}
      },
  
      async loadMorePosts() {
        try {
          this.pages.page += 1       
  
          const response = await axios.get(
            `http://localhost/vue3/processUsers.php`,
            {
              params: {
                offset: this.pages.page - 1,
                limit: this.limit,
              },
            }
          );
          this.pages.totalPages = Math.ceil(24 / this.limit);
          this.posts = [...this.posts, ...response.data];        
        } catch {}
      },
  
      // changePage(pageNum) {
      //   this.pages.page = pageNum;
      // },
    },
  
    mounted() {
      this.fetchPosts();
      // this.fetchCategories();
      const options = {      
        rootMargin: "0px",
        threshold: 1.0,
      };
      const callback = (entries, observer) => {
        if(entries[0].isIntersecting) {
          this.loadMorePosts()
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(this.$refs.observer)
    },
  
    computed: {
      sortedPosts() {
        if (this.selectedSort == "id_category") {
          return [...this.posts].sort((post1, post2) => {
            return post1[this.selectedSort] - post2[this.selectedSort];
          });
        } else {
          return [...this.posts].sort((post1, post2) => {
            return post1[this.selectedSort].localeCompare(
              post2[this.selectedSort]
            );
          });
        }
      },
  
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter((post) =>
          post.titre.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    watch: {
      // async selectedSort(newValue) {
      //   if (newValue == "id_category") {
      //     this.posts.sort((post1, post2) => {
      //       return post1[newValue] - post2[newValue];
      //     });
      //   } else {
      //     this.posts.sort((post1, post2) => {
      //       return post1[newValue].localeCompare(post2[newValue]);
      //     });
      //   }
      // pages: {
      //    handler(newVal) {
      //     this.fetchPosts()
      //    },
      //    deep: true
      // }
    },
  };
  </script>
  
  <style>
  
  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    align-items: center;
  }
  
  .page__wrapper {
    display: flex;
    margin: 15px 0;
  }
  
  .page {
    border: 1px solid black;
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .current-page {
    border: 2px solid black;
  }
  
  .observer {
    height: 30px;
    background: gray;
  }
  </style>
  