<template>
  <div>
    <MyInput v-model="searchQuery" placeholder="Search in title" />
    <div class="app__btns">
      <MyButton @click="showDialog">Create Post</MyButton>      
      <MySelect
        v-model:value="selectedSort"
        :options="sortOptions"
        :title="'Select sort'"
      ></MySelect>
    </div>
    
    <MyDialog v-model:show="dialogVisible">
      <PostForm @add="createPost" :cats="categories" />
    </MyDialog>
    <div class="pages">
      <MyPagination :pageData="pages" @newPage="changePage" />
      <div class="pages__select">
        <label for="numPages">Posts per page: </label>
        <MySelect
        :id="numPages"
        :options="limitVars"
        v-model:value="limit"
        :title="'Posts per page'"
        style="height: 60%;"
        ></MySelect>
      </div>
    </div>
    <PostList
      :posts="this.sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else><h2>Loading</h2></div>

    <!-- ***ELEMENT WHICH LISTENS THE PAGE SCROLL -->
    <!-- <div ref="observer" class="observer"></div> -->

    <MyPagination :pageData="pages" @newPage="changePage" />
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
    MyPagination    
  },

  data() {
    return {      
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "titre", name: "Title" },
        { value: "contenu", name: "Content" },
        { value: "id_category", name: "Category" },
      ],
      searchQuery: "",
      limit: 10,
      limitVars: [
        { value: 5, name: 5 },
        { value: 10, name: 10 },
        { value: 15, name: 15 },
        { value: 20, name: 20 },
      ],
      pages: {
        page: 1,
        totalPages: 0,
      },
      categories: [],
    };
  },

  methods: {
    readStorage() {
      this.storage = localStorage.getItem('user')
    },

    localSt() {
      localStorage.setItem('user', 'ivan')      
    },

    createPost() {
      this.fetchPosts();
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },

    showDialog() {
      this.dialogVisible = true;
    },

    async postsCountInDataBase() {
      const response = await axios.get(
        `http://localhost/vue3/processUsers.php`
      );
      return response.data.length;
    },

    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          `http://localhost/vue3/processUsers.php`,
          {
            params: {
              offset: this.pages.page - 1,
              limit: this.limit,
            },
          }
        );
        this.posts = response.data;        
        this.pages.totalPages = Math.ceil(
          (await this.postsCountInDataBase()) / this.limit
        );
        this.isPostLoading = false;
      } catch {}
    },

    // ***LOADING OF MORE POSTS FROM DB***
    // async loadMorePosts() {
    //   try {
    //     this.pages.page += 1

    //     const response = await axios.get(
    //       `http://localhost/vue3/processUsers.php`,
    //       {
    //         params: {
    //           offset: this.pages.page - 1,
    //           limit: this.limit,
    //         },
    //       }
    //     );
    //     this.pages.totalPages = Math.ceil(24 / this.limit);
    //     this.posts = [...this.posts, ...response.data];
    //   } catch {}
    // },

    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost/vue3/processCategories.php"
        );
        response.data.map((item) => {
          const el = { value: item.id, name: item.nom };          
          this.categories.push(el);
        });
      } catch {}
    },

    changePage(pageNum) {
      this.pages.page = pageNum;
    },
  },

  mounted() {
    this.fetchPosts();
    this.fetchCategories();
    
    // ***LOADING OF MORE POSTS REALISATION***
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting) {
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer)
  },

  computed: {
    sortedPosts() {
      if (this.selectedSort == "id_category") {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort] - post2[this.selectedSort];
        });
      } else if (this.selectedSort == "") {
        return this.posts;
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

    // ***WATCH THIS SORTING MODE CHANGE***
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

    pages: {
      handler(newVal) {
        this.fetchPosts();
      },
      deep: true,
    },

    limit() {
      this.fetchPosts();
    }    
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

.pages {
  display: flex;
  justify-content: space-between;
}

.pages__select {
  display: flex;
  align-items: center;
}

.pages__select select {
  margin-left: 15px;
}
</style>
