<template>
  <div>
    <div>
      <h2>Please Log In</h2>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
          </p>
          <p>
            <input name="password" class="w3-input" placeholder="Enter your password" v-model="user_pw" type="password">
          </p>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">Login</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  name: 'LoginPage',
  data() {
    return {
      user_id: '',
      user_pw: ''
    }
  },
  methods: {
    ...mapActions(['login']), //vuex/actions에 있는 login 함수
    async fnLogin() {
      if (this.user_id === '') {
        alert('ID를 입력하세요.')
        return
      }

      if (this.user_pw === '') {
        alert('비밀번호를 입력하세요.')
        return
      }
      try {
        let loginResult = await this.login({
          user_id: this.user_id,
          user_pw: this.user_pw
        })
        if (loginResult) {
          alert('로그인 결과: ' + loginResult)
          this.$router.push('/')
        }
      } catch (err) {
        if (err.message.indexOf('Network Error') > -1) {
          alert('서버와 통신에 문제가 있습니다.')
        } else {
          alert('로그인 정보를 확인할 수 없습니다.')
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      errorState: 'getErrorState'
    })
  }
}

</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>