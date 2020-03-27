<template>
  <div v-if="smoothie" class="container edit-smoothie">
      <h3>Edit {{smoothie.title}} smoothie</h3>
       <form @submit.prevent="EditSmoothie">
          <div class="field title">
              <label for="title">Smoothie Title:</label>
              <input type="text" name="title" v-model="smoothie.title">
          </div>
          <div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field">
              <label for="ingredient">Ingredient:</label>
              <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
               <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
          </div>
           <div class="field edit-ingredient">
              <label for="edit-ingredient">Add an Ingredients:</label>
              <input type="text" name="edit-ingredient" @keydown.tab.prevent="addIng" v-model="another">
             
          </div>
          <div class="field center-align">
              <h3 v-if="feedback" class="red-text">{{ feedback }}</h3>
              <button class="btn pink">Update Smoothie</button>
          </div>
      </form>
  </div>
</template>

<script>
import db from "../firebase/initialization.js";
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data(){
        return{
            smoothie: null,
            another: null,
            feedback:null,
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==',this.$route.params.slug)
        ref.get().then(snapshot => {
             snapshot.forEach(doc =>{
            this.smoothie = doc.data()
            this.smoothie.id = doc.id;
        })
        }
       
        )
    },
    methods:{
        EditSmoothie(){
             if(this.smoothie.title){
         this.feedback = null
         // create a slug
         this.smoothie.slug = slugify(this.smoothie.title,{
             replacement: '-',
             remove: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g,
             lower: true
         });
         db.collection('smoothies').doc(this.smoothie.id).update({
             title: this.smoothie.title,
             ingredients: this.smoothie.ingredients,
             slug:this.smoothie.slug
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
       this.smoothie.ingredients.push(this.another)
       this.another = null
       this.feedback = null
      }
      else{
          this.feedback="You have to enter a value to add an ingredient"
      }
  },
  deleteIng(ing){
     this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
          return ingredient != ing
      })
  }
    }

}
</script>

<style>
.edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2em;
}
.edit-smoothie h3{
    font-size: 1.2em;
}
.edit-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 14px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.8em

}
</style>