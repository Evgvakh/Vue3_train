<template>
  <div class="post" >
    <div class="content">
      <div class="image"
            :style="{backgroundImage: `url(${require('../assets/'+post.img)})`}">
      </div>      
      <div class="text">
        <div><strong>{{ post.titre }}</strong></div>
        <div><strong>{{ post.id }}</strong></div>
      </div>     
    </div>
    <div class="post__btns">
      <MyButton @click="$emit('remove', post)" style="margin-right: 10px;"> Remove </MyButton>
      <MyButton @click="$emit('remove', post)"> Read </MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
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
  height: 25vh;  
  padding: 10px;
  border: 2px solid rgb(35, 35, 224);
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
}

.content {
  display: flex;
  width: 100%;
}

.content .image {
  width: 30%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 15px;
}

.content .text {
  width: 65%;
}

.post__btns {
  display: flex;
  align-self: flex-end;
}
</style>
