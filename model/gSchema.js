const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const  gSchema  = new mongoose.Schema({
  
   
  grade:String,
  min:Number,
  max:Number,
  prime:Number,
  remise:Number,
  niveau:Number,
  primeParin:Number,

    
  primeSalaire: []


    
   


  });
module.exports=mongoose.model('g',gSchema)