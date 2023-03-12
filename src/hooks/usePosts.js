import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";

export default function usePosts(limit) {
    const posts = ref([]);
    const totalPages = ref(0);   
    const isPostLoading = ref(true);
    const fetching = async () => {
        try {        
            const response = await axios.get(
            `http://localhost/vue3/processUsers.php`,
            {
                params: {
                offset: 0,
                limit: limit
                },
            }
            );            
            posts.value = response.data;
                   
            totalPages.value = Math.ceil(
            20 / limit
            );
            isPostLoading.value = false;
        } catch {}
    }  
     
    onMounted(fetching);
    console.log(posts.value)
    return {
        posts, isPostLoading, totalPages
    }
}