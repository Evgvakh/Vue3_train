<template>
  <div v-show="posts.length">    
    <h3>Posts list</h3>
    <transition-group name="posts-list">
      <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
        :data-category="post.id_category"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <!-- <div v-show="!this.posts.length" style="color: darkred">
    <h2>No posts yet</h2>
  </div> -->
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.posts-list-item {
  display: inline-block;
  margin-right: 10px;
}
.posts-list-enter-active,
.posts-list-leave-active {
  transition: all 0.4s ease;
}
.posts-list-enter-from,
.posts-list-leave-to {
  opacity: 0;
  transform: translateX(530px);
}
.posts-list-move {
  transition: transform 0.4s ease;
}
</style>
