<template>
    <div>
      <h1>Signup</h1>
      <form v-on:submit.prevent="submitForm">
        <table>
          <tr>
            <td class="inputTitle"
            :class="{'title-danger' : idHasError}">아이디</td>
          </tr>
          <tr>
            <td><input type="text" v-model="id"></td>
          </tr>
          <tr>
            <td>
              <p v-show="valid.id" class="input-error">
                아이디를 정확히 입력해주세요.
              </p>
            </td>
          </tr>
          <tr>
            <td class="inputTitle">비밀번호</td>
          </tr>
          <tr>
            <td><input type="password" v-model="pwd"></td>
          </tr>
          <tr>
            <td class="inputTitle" 
            :class="{'title-danger' : nameHasError}">이름</td>
          </tr>
          <tr>
            <td><input type="text" v-model="name"></td>
          </tr>
          <tr>
            <td>
              <p v-show="valid.name" class="input-error">
                이름을 정확히 입력해주세요.
              </p>
            </td>
          </tr>
          <tr>
            <td class="inputTitle" :class="{'title-danger' : emailHasError}">이메일주소</td>
          </tr>
          <tr>
            <td>
              <input type="text" v-model="e_id" style="width: 220px; float: left;">
              <div id="at">@</div>
              <input type="text" v-model="e_domain" placeholder="kyonggi.ac.kr" style="width: 220px; float: right;">
            </td>
          </tr>
          <tr>
            <td>
              <p v-show="valid.email" class="input-error">
                이메일을 정확히 입력해주세요.
              </p>
            </td>
          </tr>
          <tr>
            <td class="inputTitle">설명</td>
          </tr>
          <tr>
            <td><input type="text" v-model="description"></td>
          </tr>
          <tr>
            <td class="inputTitle" :class="{'title-danger' : gitHasError}">깃허브</td>
          </tr>
          <tr>
            <td>
              <input type="text" v-model="git_id" style="width: 220px; float: left;">
              <div id="at">@</div>
              <input type="text" v-model="git_domain" placeholder="kyonggi.ac.kr" style="width: 220px; float: right;">
            </td>
          </tr>
          <tr>
            <td>
              <p v-show="valid.git" class="input-error">
                깃허브 이메일을 정확히 입력해주세요.
              </p>
            </td>
          </tr>
          <tr>
            <td class="inputTitle">블로그</td>
          </tr>
          <tr>
            <td><input type="text" v-model="blog"></td>
          </tr>
          <tr>
            <td class="inputTitle">역할</td>
          </tr>
          <tr>
            <td><input type="text" v-model="role"></td>
          </tr>
          
          <tr>
            <td><br><br><input type="submit" id="submitButton" value="가입하기" style="cursor: pointer;"></td>
          </tr>
        </table>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        valid : {
          id : false,
          name : false,
          e_id : false,
          e_domain : false,
          email : false,
          git_id : false,
          git_domain : false,
          git : false,
        },
        idHasError : false,
        nameHasError: false,
        emailHasError : false,
        gitHasError : false,
        id : '',
        name: '',
        e_id : '',
        e_domain : '',
        git_id : '',
        git_domain : '',
        Em : 'e',
        Gi : 'g',
        I : 'i',
      };
      
    },
    mounted() {
    },
    methods: {
      submitForm: function() {
        axios
            .post('http://54.81.120.103:8080/user/joinProc',{
              userId: this.id,
              password: this.pwd,
              name: this.name,
              email: this.e_id +'@'+this.e_domain,
              description: this.description,
              github: this.git_id +'@'+this.git_domain,
              blog: this.blog,
              role: this.role,
            })
            .then(res => {
    // Handle success.
            console.log(res);
            alert("회원가입 완료");
            this.$router.push({path:'login'});
            })
            .catch(error => {
    // Handle error.
            console.log(error);
            });
      },
      checkName: function() {
        const validateName = /^[A-Za-z가-힣]{1,6}$/;

        if ((!validateName.test(this.name)) || !this.name) {
          this.valid.name = true;
          this.nameHasError = true;
          return;
        }
        this.valid.name = false;
        this.nameHasError = false;
      },
      checkE_id: function(value, e) {
        const validateE_id = /^[^\s@]{1,10}$/;
        if ((!validateE_id.test(value)) || !value) {
          switch (e){
            case 'e':
              this.valid.e_id = true;
              break;
            case 'g':
              this.valid.git_id = true;
              break;
            case 'i':
              this.valid.id = true;
              this.idHasError = true;
              break;
            default :
              console.log("오류 발생");
          }
          return;
        }
        switch (e){
            case 'e':
              this.valid.e_id = false;
              break;
            case 'g':
              this.valid.git_id = false;
              break;
            case 'i':
              this.valid.id = false;
              this.idHasError = false;
              break;
            default :
              console.log("오류 발생");
          }
      },
      checkE_domain: function(value, e) {
        const validateE_domain = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if ((!validateE_domain.test(value)) || !value) {
          switch (e){
            case 'e':
              this.valid.e_domain = true;
              break;
            case 'g':
              this.valid.git_domain = true;
              break;
            default :
              console.log("오류 발생");
          }
          return;
        }
        switch (e){
            case 'e':
              this.valid.e_domain = false;
              break;
            case 'g':
              this.valid.git_domain = false;
              break;
            default :
              console.log("오류 발생");
          }
      },
      checkEmail: function(char) {
        switch (char){
          case 'e':
            if (this.valid.e_id || this.valid.e_domain){
            this.valid.email = true;
            this.emailHasError = true;
            return;
          }
          this.valid.email = false;
          this.emailHasError = false;
          break;
          case 'g':
            if (this.valid.git_id || this.valid.git_domain){
            this.valid.git = true;
            this.gitHasError = true;
            return;
          }
          this.valid.git = false;
          this.gitHasError = false;
          break;
        }
        

      }
    },
    watch : {
      'id' : function (id) {
        this.checkE_id(id,this.I);
      },
      'name' : function () {
        this.checkName();
      },
      'e_id': function (e_id) {
        this.checkE_id(e_id,this.Em);
        this.checkEmail(this.Em);
      },

      'e_domain': function (e_domain) {
        this.checkE_domain(e_domain, this.Em);
        this.checkEmail(this.Em);
      },
      'git_id': function (git_id) {
        this.checkE_id(git_id, this.Gi);
        this.checkEmail(this.Gi);
      },

      'git_domain': function (git_domain) {
        this.checkE_domain(git_domain, this.Gi);
        this.checkEmail(this.Gi);
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    text-align: center;
    margin:0 auto;
  }
  input {
    width: 500px;
    height: 40px;
    border: 0;
    border-radius: 15px;
    background-color: rgba(225, 230, 230, 0.664);
    font-size: 15px;
    padding-left: 10px;
  }
  .inputTitle {
     text-align : left;
     font-weight: bold;
     height: 10px;
     padding-left: 5px;
  }
  tr {
    width: 100%;
  }
  td {
    vertical-align: bottom;
  }
  #submitButton {
    width: 60%;
    font-weight: 900;
    font-size: larger;
    color: white;
    background-color: rgba(43, 102, 174, 0.882);
    border: 0;
    padding: 5px 0px 5px 0px;
  }
  #at {
    padding-top: 10px;
    display: inline-block;
  }
  .input-error {
    line-height:1px;
    font-size: 15px;
    color: rgb(229, 66, 26);
    float: left;
  }
  .title-danger {
    color : rgb(229, 66, 26);
  }

  </style>
  