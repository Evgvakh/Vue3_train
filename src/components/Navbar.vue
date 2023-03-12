<template>
    <div class="navbar">
        <div 
        style="cursor: pointer;"
        @click="$router.push('/')"><h2>Blog</h2></div>
        <div class="navbar__btns">
            <MyButton 
            style="margin-right: 20px;"
            @click="$router.push('/posts')"
            >Posts</MyButton>
            <MyButton
            @click="$router.push('/store')"
            >POSTS whith store</MyButton>
            <MyButton
            @click="$router.push('/composition')"
            >POSTS whith Composition API</MyButton>
            <MyButton
            @click="$router.push('/about')"
            >About</MyButton>            
        </div>
    </div>
</template>

<script> 
    import MyButton from '@/components/UI/MyButton.vue';
    export default {
        components: { 
            MyButton 
        }
}
</script>

<style scoped>
    h2 {
        font-family: Georgia, 'Times New Roman', Times, serif;
    }
    .navbar {
        /* width: 100vw; */
        height: 50px;
        padding: 2em;
        background-color: rgba(230, 233, 58, 0.884);
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .navbar__btns {
        align-self: center;
    }
    
</style>