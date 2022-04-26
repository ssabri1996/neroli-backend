const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  groupSchema  = new mongoose.Schema({
    
  nomGroup:String,
  classe:String,
  sepcialite:String,
  niveaux:String,
  etudiants: [{ type: Schema.Types.ObjectId, ref:'user'}]
   
  });
  consolelog("group schema")

module.exports=mongoose.model('group',groupSchema);
