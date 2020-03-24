<template>

  <div class="container index">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ingredent,index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ingredent}}</span>
            </li>
          </ul>
      </div>
    </div>
  </div>
 
</template>

<script>
import db from "../firebase/initialization.js"
export default {
  name:'Home',
  data() {
    return {
      smoothies:[
      ]
    }
  },
  methods:{
  deleteSmoothie(id){
    this.smoothies = this.smoothies.filter(smoothie =>{
      return smoothie.id != id;
    })
  }
  }, 
  created(){
    db.collection('smoothies').get()
    .then(snapshot =>{
      snapshot.forEach(doc =>{
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<style>
.index{
  padding-top:60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap:30px;
  
  
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>