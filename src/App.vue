<template>
  <div id="app">
  <navbar></navbar>
  <div class="row">
    <div class="container">
      <div class="col-md-12 mt-3">
          <router-view />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import '../config/prod.env'
import Navbar from './components/partial/Navbar'
import Paginate from './components/partial/Paginate'
export default {
  components: {
    Navbar,
    Paginate
  },
  name: 'App',
  mounted() {

  },

  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js'
  //   },
  //   extensions: ['*', '.js', '.vue', '.json']
  // },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
