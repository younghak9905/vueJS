<template>
  <div>
    <h1>TestPage</h1>
    <button @click="postTest">postTest</button>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'testPage',
  data: function () {
    return {
      content: '',
      result: '',
      isUsed: false,
      name: 'test'
    }
  },

  mounted() {
    this.getTest();
  },
  methods: {
    postTest: function () {
      axios.post(`http://localhost:8080/test/post?name=${this.name}`, {
        content: "안녕하세요"
      }).then(res => {
        console.log(res.data.data.response);
      }).catch(err => {
        console.log(err);
      });
    },
    getTest: function () {
      axios.get('http://localhost:8080/test/get').then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },


  }
};
</script>

<style>

</style>