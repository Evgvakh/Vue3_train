<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div class="dialog__content" @click.stop>
            <slot></slot>
        </div>        
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

    export default {
        name: 'MyDialog',

        mixins: [toggleMixin]
    }
</script>

<style scoped>
    .dialog {
        top: 0; bottom: 0;
        left: 0; right: 0;
        background: rgba(12, 12, 12, 0.3);
        position: fixed;
        display: flex;
        
    }

    .dialog__content {
        margin: auto;
        padding: 20px;
        background: white;
        border-radius: 12px;
        min-width: 350px;
        min-height: 50px;
    }
</style>