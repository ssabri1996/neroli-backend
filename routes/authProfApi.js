
const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const profSchema = require('../model/profSchema')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
/*const passport =require('../passport/passport');
get avec autrisation
router.get('/voir',  passport.authenticate('bearer', { session: false }), async (req, res) => {
   var users = await userSchema.find();
    res.send(users);
//});*/
//verfication 1
router.post('/verfier', async (req, res) => {
    try{
        var prof = await profSchema.findOne({email:req.body.email});

    if(!prof)
       
   { 
   return res.send({
       message:true
   })
    }
    else{
        return res.send({message:false})
    }
   
 /*var  user  =new userSchema({
           nom:req.params.nom,
         age:req.params.age     //tu peut creer d'apres les parametres /:nom/:age en api de poste
      
   })    
    /*  user = await userSchema.create(user);*/
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//register aapp esit

router.post('/registerAd', async (req, res) => {
    try{
        

  
       
    var prof = await profSchema.create(lodash.pick(req.body,['name','prenom','email','password','carteProf','login','loginProf','passwordProf']));//just pour poster les champs suivant name email password age
   
   const saltRounds=10;
   const salt =bcrypt.genSalt(saltRounds)
   prof.password=await bcrypt.hash(prof.password,saltRounds);// pour crypter password

   prof.save();
   return res.send({message:true})

  

   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//registres

router.post('/register', async (req, res) => {
    try{
        var user = await userSchema.findOne({email:req.body.email});

    if(!user)
       
   { user = await userSchema.create(lodash.pick(req.body,['name','email','password','age']));//just pour poster les champs suivant name email password age
   
   const saltRounds=10;
   const salt =bcrypt.genSalt(saltRounds)
   user.password=await bcrypt.hash(user.password,saltRounds);// pour crypter password

   user.save();
   return res.status(201).send("registred successfully!")
    }
    else{
        return res.status(401).send("email accuper")
    }
   
 /*var  user  =new userSchema({
           nom:req.params.nom,
         age:req.params.age     //tu peut creer d'apres les parametres /:nom/:age en api de poste
      
   })    
    /*  user = await userSchema.create(user);*/
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//login

router.post('/login', async (req, res) => {
    try{
        var user = await profSchema.findOne({login:req.body.login});

    if(user) { 
         var test = await   bcrypt.compare(req.body.password,user.password)
         if(test){var token= jwt.sign({_id:user._id},'profKey', {expiresIn: '1d'})
                   // res.send({token: token})  pour envoyer comme objet  json 
                   res.header('Authorization',token).send({message:true , token:token ,id:user._id,name:user.name })}
         else{ //res.status(201).send("mots de passe incorrect")
             return res.send({message:false})}

      }
    else{
        return /*res.status(401).send("email ou mots ded passe incorrect").*/res.send({message:false})
    }
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//login admin
router.post('/loginAd', async (req, res) => {

    try{
        
        var user = await profSchema.findOne({login:req.body.login});

    if(user) { 
        console.log(user)
         var test = await   bcrypt.compare(req.body.password,user.password)
         if(test){ 
             res.send({message:true,id:user._id})
         }
         else{ //res.status(201).send("mots de passe incorrect")
             return res.send({message:false})}

      }
    else{
        return /*res.status(401).send("email ou mots ded passe incorrect").*/res.send({message:false})
    }
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//login prof
router.post('/loginProfesseur', async (req, res) => {
    try{
        var user = await profSchema.findOne({loginProf:req.body.login});
        var users = await profSchema.find();
        console.log(users,'nn')
   
    if(user) { 
         
         if(user.passwordProf==req.body.password){ 
             res.send({message:true,id:user._id})
         }
         else{ //res.status(201).send("mots de passe incorrect")
             return res.send({message:true})}

      }
    else{
        return /*res.status(401).send("email ou mots ded passe incorrect").*/res.send({message:false})
    }
    
    }catch(error){
        res.send(error.message)   
    }
    
});
//admin change mots de passe
router.put('/modifDemandeAd/:id', async (req, res) => {
    console.log(req.params.id)
    console.log(5)
  
     
   var prof= await profSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
         
  
           const saltRounds=10;
      const salt =bcrypt.genSalt(saltRounds)
       prof.password=await bcrypt.hash(prof.password,saltRounds);// pour crypter password

   prof.save();         
      res.send({message:true})
 
  })
  //admin change mot de passe prof
  router.put('/modifDemandePr/:id', async (req, res) => {
    console.log(5)
  
     
   var prof= await profSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
             
      res.send({message:true})
 
  })
  //
module.exports = router;