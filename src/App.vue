<template>
 <div class="signlog">
  <router-link to="/signup" class="signup" v-model="signup">Signup</router-link>
 </div>
 <div class="menu">
   <router-link to="/">HomePage</router-link> 
   <router-link to="/postList">PostListPage</router-link>
   <router-link to="/gpt">GptPage</router-link>
   <router-link to="/test">TestPage</router-link>
   <router-link to="/login">LoginPage</router-link>

</div>

  <router-view/>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a{
  color: white;
  padding: 10px;
}
.signlog {
  font-size: 20px;
  position: absolute;
  top : 2.5%;
  right: 5%;
}
</style>
