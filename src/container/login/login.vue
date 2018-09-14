<template>
  <div class="login" v-if="showLogin">
    <div><input type="text" placeholder="请输入您的昵称" v-model="nickName" @keyup.enter="login">
      <button @click="login">登入</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        nickName:'',
        showLogin:true
      }
    },
    methods: {
      login(){
          if(this.nickName){
            this.$socket.emit('login',this.nickName)
          }else{
            this.$Alert('error','请填写一个昵称')
          }
      }
    },
    mounted(){
      this.$socket.on('NickExists',()=>{
        this.$Alert('error','您填写的昵称已经存在')
      })
      this.$socket.on('loginSucess',()=>{
          console.log('登录成功')
          this.showLogin = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    > div {
      width: 80%;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      input {
        width: 50%;
        height: 44px;
        border: 0;
        font-size: 20px;
        padding-left: 20px;
      }
      button {
        width: 100px;
        height: 40px;
        border: 0;
        background: rosybrown;
        color: white;
        font-size: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

</style>
