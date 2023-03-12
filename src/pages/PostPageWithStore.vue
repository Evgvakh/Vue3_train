<template>
  <div>      
    <MyInput :modelValue="searchQuery" @update:modelValue="setSearch" placeholder="Search in title" />
    <div class="app__btns">
      <MyButton @click="showDialog">Create Post</MyButton>
      <MySelect :value="selectedSort" :options="sortOptions" :title="'Select sort'" @update:value="setSort"></MySelect>
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @add="createPost" :cats="categories" />
    </MyDialog>
    <div class="pages">
      <MyPagination :pageData="pages" @newPage="setPage" />
      <div class="pages__select">
        <label for="numPages">Posts per page: </label>
        <MySelect :id="numPages" :options="limitVars" :value="limit" @update:value="setLimit" :title="'Posts per page'"
          style="height: 60%;"></MySelect>
      </div>
    </div>
    <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
    <div v-else>
      <h2>Loading</h2>
    </div>

    <!--***ELEMENT WHICH LISTENS THE PAGE SCROLL
    <div ref="observer" class="observer"></div> -->

    <MyPagination :pageData="pages" @newPage="changePage" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyPagination from "@/components/MyPagination.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

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
      dialogVisible: false,
    }
  },

  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setTotalPages: 'post/setTotalPages',
      setSearch: 'post/setSearch',
      setSort: 'post/setSort',
      setLimit: 'post/setLimit'
    }),

    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      fetchCategories: 'post/fetchCategories',
      
    }),    

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
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      limit: state => state.post.limit,
      limitVars: state => state.post.limitVars,
      pages: state => state.post.pages,
      categories: state => state.post.categories,
    }),

    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
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
