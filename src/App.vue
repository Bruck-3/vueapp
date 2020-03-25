<template>
  <div id="app">
     <!--Import Google Icon Font-->
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <Navbar/>
    
    <router-view/>
  </div>
</template>



<script>
import Navbar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
  
}

</script>
<style>


</style>
