<template>
  <div class="select">      
      <select id="select" :value="value" @change="changeOptions">
        <option disabled value=""> {{ title }}</option>
        <option :value="option.value" :key="option.value" v-for="option in options">
          {{ option.name }}
        </option>
      </select>
  </div>
</template>

<script>
export default {
  name: "MySelect",

  props: {
    value: {
      type: [String, Number],
    },

    options: {
      type: Array,      
    },    

    title: ''
  },

  methods: {
    changeOptions(event) {
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>

<style scoped>
.select {
  height: 100%;
}

select {
    padding: 10px;
    height: 100%;
}
</style>
