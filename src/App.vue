<template>
  <div id="app">
     <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <Navbar/>
    <Home />
    <router-view/>
  </div>
</template>



<script>
import Navbar from './components/NavBar.vue'
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Home
  }
  
}

</script>
<style>


</style>
