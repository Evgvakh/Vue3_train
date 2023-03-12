import { ref, computed } from "vue";

export default function usesortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref("");
  console.log(sortedPosts.value);
  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post =>
      post.titre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    sortedAndSearchedPosts,
  };
}
