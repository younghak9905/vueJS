<template>
    <h1>postListPages</h1>
    <div>
      <div v-for="post in postList" :key="post.postNum">
        <router-link :to="`/post/${post.postNum}`">
            <h2>title: {{ post.title }}</h2>
        </router-link>  <p>{{ post.content }} : {{post.postNum}}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostListPage',
    data() {
      return {
        postList: [],
      };
    },
    mounted() {
      this.fetchPostList();
    },
    methods: {
      fetchPostList() {
        axios.get('http://localhost:8080/posts/list')
          .then(response => {
            this.postList = response.data.data.postList;
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
  