<template>
    <div>
        <h1>This is a post page</h1>
        {{ $route.params }}
        <MyInput v-model="text"/>
        <MyButton @click="localSt"></MyButton>
        <h2>{{ this.storage }}</h2>
        <MyButton v-show="storage == 'username=oleg'"></MyButton>
    </div>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';

    export default {
    data() {
        return {
            storage: '',
            text: ""
        }
    },
    methods: {
        localSt() {
            document.cookie = `username=${this.text}`
            this.storage = document.cookie
        }
    },
    
    components: { MyInput }
}
</script>

<style scoped>

</style>