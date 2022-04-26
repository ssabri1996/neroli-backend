const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  todoSchema  = new mongoose.Schema({
  
   /* nom:{type:String,
      required:true
     // test: /^[a-z0-9]+$/gi          // sirijex comme validation
    },
    age:{type:Number,min:[23,'vous etes tres petit'],max: [60 ,'tres grand']},//pour donner un message de validation pour age
  
    job:{type:String,
         enum:['ajent bireaux',"caisser","securité"] ,//pour choisi l'un de tableaux
         required:true
    },
     depar:{
      type:Array,
      validate:{
        validator:function(params) {
          return params.length==0
                                         // costum validtor
        },
        message:'remplire le tableaux'
      

      } 
    },                                        
    activ:Boolean,
    salery:{
      type:Number,
      required:function(){
        return this.age>40
      }
    }*/
    nameProd:String,
    descProd:String,
    refProd:String,
    prixProd:Number,
    photoProd:String,
    sex:String,
    img:String,
    promo:Number,
    type:String


   


  });
module.exports=mongoose.model('todo',todoSchema);