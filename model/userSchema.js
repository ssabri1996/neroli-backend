const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  userSchema  = new mongoose.Schema({
  photoProfil:String,
  name:String,
  sex:String,
  niveau:String,
  prenom:String,
  cin:String,
  Etat:String,   
  cartEtudiant:String,
  groupe:String,
  DateNaissance:String,
  lieuxDateNaissance:String,
  specialite:String,
  classe:String,
  niveau:String,
  fonction:String ,
  remise:String,
  point:String,
  chifreAffaire:String,
  suivi:[],
  userAj:{ type: Schema.Types.ObjectId, ref:'user'},
   principale:Boolean, 
  images:[{type:String}],
  grade:{type: Schema.Types.ObjectId, ref:"g"},
  password:String,   
  email:String,//{type:String,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  commandes: [{ type: Schema.Types.ObjectId, ref:'evenement'}],
  commandesSalaire:[],
  commandesIndirect: [{ type: Schema.Types.ObjectId, ref:'evenement'}],
   listeDecroissnate:[{ type: Schema.Types.ObjectId, ref:'user'}],
   listeDecroissnateDirect:[{ type: Schema.Types.ObjectId, ref:'user'}],
  nombreDemmandes:Number,
  listeCroissante:[{ type: Schema.Types.ObjectId, ref:'user'}],
  phone:String,
  adresse:String,
  Année:String,
  regAdminstration:Boolean,
  Aff:Boolean,
  key: String, 
  originale:Boolean,
  nouveaux:Boolean, 
  primeParinage:Number,
  primeAnimmation:Number,
  salaire:Number,
  rib:String,
  brut:Number,
  datSalaiire:String

  
  //arb






  
  

  });
module.exports=mongoose.model('user',userSchema);
 /* name:{type:String,
      required:true
     // test: /^[a-z0-9]+$/gi          // sirijex comme validation
    },
    cartEtudiant:{type:Number,min:[23,'vous etes tres petit'],max: [60 ,'tres grand']},//pour donner un message de validation pour age
  
    sepcialite:{type:String,
         enum:['ajent bireaux',"caisser","securité"] ,//pour choisi l'un de tableaux
         required:true
    },
     images:{
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
    },
    */
   /*photoProfil:{type:String},
   ggg:String,
    name:String,
    prenom:String,
    cartEtudiant:Number,
    images:[{type:String}],
    password:String,   
    email:{type:String,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    demandes: [{ type: Schema.Types.ObjectId, ref:'evenement'}],
    user:  {type: Schema.Types.ObjectId, ref: 'todo'},
    nombreDemmandes:Number*/
   
   

