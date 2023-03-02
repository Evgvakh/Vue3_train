<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'MyButton'
    }
</script>

<style scoped>
    .btn {               
        padding: 10px 15px;
        color:rgb(35, 35, 224);
        border: 1px solid rgb(35, 35, 224);
        background-color: transparent;
        font-weight: bold;
        cursor: pointer;
    }
</style>