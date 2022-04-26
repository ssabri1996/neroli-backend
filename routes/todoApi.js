
const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const todoSchema = require('../model/todoSchema')
const passport=require('passport')


router.post('/produitC', async (req, res) => {
  var prod=await todoSchema.findOne ({ refProd:req.body.refProd})
  console.log(prod,"zz")
  if(!prod){
    await  todoSchema.create(req.body)
    res.send({Message:true})
  }
else{
  res.send({Message:false})
}
  

})

router.get('/produit/:id', async (req, res) => {
    console.log("habib")
  var produit=  await todoSchema.findById(req.params.id)
   res.send(produit)
  

})

router.get('/produit', async (req, res) => {
  console.log("habib")
var produits=  await todoSchema.find()
 res.send(produits)


})
router.put('/modifDemandeP/:id', async (req, res) => {
  

  console.log(req.params.id);
  var  prod = await todoSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
  res.send({message:true})
})

router.delete('/ProdDelet/:id', async (req, res) => {

  const groupDelete = await todoSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
    var prods = await todoSchema.find();
    res.send(prods)
  })


});
   
 /*var  user  =new userSchema({
           nom:req.params.nom,
         age:req.params.age     //tu peut creer d'apres les parametres /:nom/:age en api de poste
      
   })    
    /*  user = await userSchema.create(user);*/
   
    module.exports = router;
    



