<template>
  <h1>post-page</h1>
  <div>
    <h1 v-if="post">{{ post.title }}</h1>
    <p v-if="post">{{ post.content }}</p>
    <p v-if="post">Created At: {{ post.createdAt }}</p>
    <p v-if="post">Like Count: {{ post.likeCount }}</p>
    <p v-if="post">Tag: {{ post.tag }}</p>
    <p v-if="post">Author: {{ post.name }}</p>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'PostPage',
  data() {
    return {
      post: null,
    };
  },
  mounted() {
    const postId = this.$route.params.postNum;
    this.fetchPost(postId);
  },
  methods: {
    fetchPost(postId) {
      axios.get(`http://localhost:8080/posts/list/${postId}`)
          .then(response => {
            this.post = response.data.data.post;
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>

<style>
</style>
