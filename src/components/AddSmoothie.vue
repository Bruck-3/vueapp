<template>
  <div class="add-smoothie container">
      <h2 class="center-align indigo-text">Add New Smoothie Recepie</h2>
      <form @submit.prevent="addSmoothie">
          <div class="field title">
              <label for="title">Smoothie Title:</label>
              <input type="text" name="title" v-model="title">
          </div>
          <div v-for="(ing,index) in ingredients" :key="index" class="field">
              <label for="ingredient">Ingredient:</label>
              <input type="text" name="ingredient" v-model="ingredients[index]">
               <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          </div>
           <div class="field add-ingredient">
              <label for="add-ingredient">Add an Ingredients:</label>
              <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
             
          </div>
          <div class="field center-align">
              <h3 v-if="feedback" class="red-text">{{ feedback }}</h3>
              <button class="btn pink">Add Smoothie</button>
          </div>
      </form>
      
  </div>
</template>

<script>
import db from "../firebase/initialization.js"
import slugify from 'slugify'
export default {
 name:"AddSmoothie",
 data(){
     return{
        title:null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
     }
 },
 methods: {
  addSmoothie(){
    if(this.title){
         this.feedback = null
         // create a slug
         this.slug = slugify(this.title,{
             replacement: '-',
             remove: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
             lower: true
         });
         db.collection('smoothies').add({
             title: this.title,
             ingredients: this.ingredients,
             slug:this.slug
            }).then(()=>{
                this.$router.push({name: 'Home'})
            }).catch(err =>{
                console.log(err)
            })
    }
    else{
        this.feedback = "Enter a value for the title"
    }
  },
  addIng(){
      if(this.another){
       this.ingredients.push(this.another)
       this.another = null
       this.feedback = null
      }
      else{
          this.feedback="You have to enter a value to add an ingredient"
      }
  },
  deleteIng(ing){
     this.ingredients = this.ingredients.filter(ingredient => {
          return ingredient != ing
      })
  }

 }
}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2{
    font-size: 2em;
}
.add-smoothie h3{
    font-size: 1.2em;
}
.add-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 14px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.8em

}
</style>