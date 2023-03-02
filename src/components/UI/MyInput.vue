<template>
  <input
    :value="modelValue" @input="updateInput"         
    class="input" 
    type="text"      
  />
</template>


<script>
export default {
    name: 'MyInput',
    props: {
      modelValue: {
        type: [String, Number],
        required: true
      }
    },

    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)        
      }
    }
};
</script>


<style scoped>
    .input {
        width: 100%;
        border: 1px solid rgb(35, 35, 224);
        padding: 10px 15px;
        margin-top: 10px;
    } 
</style>
