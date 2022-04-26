const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const  eveSchema  = new mongoose.Schema({
  
   
    date:String,
    datSeconde:Number,
    datValidation:String,
    type:String,
    produit:[],
    prix:Number,
    prixTot:Number,
    prixRemise:Number,
    qr:String,
    description:String,
    nouveaux:Boolean,
    datReponse:String,
    dateMoin:String,
    dateUpdate:{type:Number},
    dateReponseActive:Number,
    user:{type: Schema.Types.ObjectId, ref:'user'},
    users:[{type: Schema.Types.ObjectId, ref:'user'}],
    vaildationAdminstration:Boolean,
    validaTionGrade:Boolean,
    key:String,
    typeLiverison:String,
    Adresse:String

    
   


  });
module.exports=mongoose.model('evenement',eveSchema);