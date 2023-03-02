<template>
  <div class="post">
    <div>
      <div><strong>{{ post.id }}</strong></div>
      <div><strong>Title: </strong>{{ post.titre }}</div>
      <div><strong>Content: </strong><pre>{{ post.contenu }}</pre></div>
    </div>
    <MyButton @click="$emit('remove', post)" style="align-self: flex-end;"> Remove </MyButton>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";

export default {
  props: {
    post: {
      type: Object,
      requred: true,
    },
  },
  components: { MyButton },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid rgb(35, 35, 224);
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post div div:nth-of-type(1) {
    margin-bottom: 15px;
    font-size: 18px;
}
.post div div:nth-of-type(2) {
  width: 85%;
}

.post div div pre {
  display: block;
  width: 100%;
  font-family: inherit;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word; 
}
</style>
