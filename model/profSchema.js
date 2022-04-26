const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  profSchema  = new mongoose.Schema({
  
    name:String,
    prenom:String,
    cartProf:Number,
    image:[{type:String}],
    password:String,   
    login:String,
    loginProf:String,
    passwordProf:String,
    email:{type:String,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    groupEns: [{type:String}],
    dateOcc:[{type:String}],
    dateLibre:[{type:String}]


  });
module.exports=mongoose.model('prof',profSchema);