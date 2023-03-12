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
      <!-- <MyPagination :pageData="pages" @newPage="changePage" /> -->
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
import { ref } from "vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
      dialogVisible: false,
      sortOptions: [
        { value: "titre", name: "Title" },
        { value: "contenu", name: "Content" },
        { value: "id_category", name: "Category" },
      ],
    };
  },

  setup(props) {
    const { posts, isPostLoading, totalPages } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      sortedAndSearchedPosts,
      searchQuery,
      selectedSort,
    };
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
