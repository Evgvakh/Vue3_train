import { ref, computed } from "vue";

export default function useSortedPosts(posts) {    
  const selectedSort = ref("");
  const sortedPosts = computed(() => {
    if (selectedSort.value == "id_category") {
      return posts.value.sort((post1, post2) => {
        return post1[selectedSort.value] - post2[selectedSort.value];
      });
    } else if (selectedSort.value == "") {
      return posts.value;
    } else {
      return posts.value.sort((post1, post2) => {
        return post1[selectedSort.value].localeCompare(
          post2[selectedSort.value]
        );
      });
    }
  });
  
  console.log(sortedPosts);
  return {
    selectedSort, sortedPosts
  }
}
