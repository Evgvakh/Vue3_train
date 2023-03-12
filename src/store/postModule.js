import axios from "axios";
export const postModule = {
    state: () => ({
        posts: [],
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
    }),

    getters: {
        sortedPosts(state) {
            if (state.selectedSort == "id_category") {
                return [...state.posts].sort((post1, post2) => {
                    return post1[state.selectedSort] - post2[state.selectedSort];
                });
            } else if (state.selectedSort == "") {
                return state.posts;
            } else {
                return [...state.posts].sort((post1, post2) => {
                    return post1[state.selectedSort].localeCompare(
                        post2[state.selectedSort]
                    );
                });
            }
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
                post.titre.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },

        
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setLoading(state, bool) {
            state.isPostLoading = bool;
        },

        setSort(state, sort) {
            state.selectedSort = sort;
        },

        setSearch(state, search) {
            state.searchQuery = search;
        },

        setLimit(state, limit) {
            state.limit = limit;
        },

        setPage(state, page) {
            state.pages.page = page;
        },

        setTotalPages(state, totalPages) {
            state.pages.totalPages = totalPages;
        },

        setCategories(state, categories) {
            state.categories = categories;
        },
    },

    actions: { 
        async fetchPosts({ state, commit }, actions) {
            try {
                commit("setLoading", true);
                const response = await axios.get(
                    `http://localhost/vue3/processUsers.php`,
                    {
                        params: {
                            offset: state.pages.page - 1,
                            limit: state.limit,
                        },
                    }
                );
                commit("setPosts", response.data);                
                const newResponse = await axios.get(
                        `http://localhost/vue3/processUsers.php`
                    );                  
                commit(
                    "setTotalPages",
                    Math.ceil(newResponse.data.length / state.limit)
                );                
                commit("setLoading", false);
            } catch(e) { console.log(e); }
        },

        async fetchCategories({  commit }) {
            try {
                const cats = [];
                const response = await axios.get(
                    "http://localhost/vue3/processCategories.php"
                );
                response.data.map((item) => {
                    const el = { value: item.id, name: item.nom };
                    cats.push(el);
                });
                commit('setCategories', cats);
            } catch { }
        },

        changePage({ commit }, pageNum) {
            commit('setPage', pageNum);
        },
    },

    namespaced: true
};
