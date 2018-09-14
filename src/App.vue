<template>
  <div id="app">
    <router-view/>
    <Login></Login>
  </div>
</template>

<script>
  import Login from './container/login/login'

  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {

    },
    components:{
      Login
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
