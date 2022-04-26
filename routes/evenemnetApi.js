const { urlencoded } = require('body-parser');
const express = require('express');
const { truncate } = require('lodash');
const { isValidObjectId } = require('mongoose');
const cron  = require ( 'node-cron' ) ; 
const router = express.Router();
var noveauxAncien=0;
var tabN=[];


const eveSchema = require('../model/eveSchema')
const todoSchema=require('../model/todoSchema')
const userSchema=require('../model/userSchema')
const gSchema = require('../model/gSchema');



router.post('/voirEveLength', async (req, res) => {
     await eveSchema.find({nouveaux: true} ).populate('user').lean().then(async(eves)=>{
         var nouveuax=[]
        
         nouveaux= eves.filter(element=>Date.parse(element.date)>req.body.noti)
        
        
        
       res.send({eves:eves,notification:nouveaux.length})
       console.log('click')
 
 });
})
router.get('/voirEve', async (req, res) => {
    await eveSchema.find({nouveaux:true}).populate('user').lean().then((eves)=>{
        console.log('non click')
        console.log(eves)
        
         
        res.send({eves:eves,message:true})
       
});
})
router.get('/voircommandeValider', async (req, res) => {
   var comandesValide= await eveSchema.find().populate('user').lean()
       console.log(comandesValide,'commmm')
         
        res.send(comandesValide)
       

})
//demande total
//pour commande validernon Aff
router.get('/voircommandeValiderNonaffMise', async (req, res) => {
     eves  =   await  eveSchema.find({ nouveaux: false }).populate('user')
      res.send(eves)
        
 
 })
//pour commandes afflier valid
router.get('/voircommandeValideraffMise', async (req, res) => {
    eves  =   await  eveSchema.find({nouveaux: false }) .populate('user')
    console.log('mise ajour table non valid')
    console.log(eves,"rrrr")

      
       
      res.send(eves)

})

router.get('/voircommandeNouveauNonaffMise', async (req, res) => {
    eves  =   await  eveSchema.find({ nouveaux: true }).populate('user')
       res.send(eves)

})
//pour commandes afflier nveaux
router.get('/voircommandeaffMiseN', async (req, res) => {
   eves  =   await  eveSchema.find({ nouveaux: true} ).populate('user')
      console.log('mise ajour table non valid')
      res.send(eves)
      

})
//


router.get('/voirEvetotal', async (req, res) => {
    await eveSchema.find({nouveaux:false}).populate('user').lean().then(async(eves)=>{
        console.log('total')
         
        res.send({eves:eves,nombreDemandeTotal:eves.length})
     
});
})
//retourne reponse
router.get('/voirEvetotalAc', async (req, res) => {
    await eveSchema.find({nouveaux:false, reponse: "ac"}).populate('user').lean().then(async(eves)=>{
        console.log(eves)
       
        res.send({eves:eves,nD:eves.length})
     console.log(eves.length)
});
})
//
router.post('/creercomande', async (req, res) => {

var commande =await eveSchema.create(req.body)
console.log(commande)
res.send(commande)

})
//dlete commande
router.delete('/comDelet/:id', async (req, res) => {

    const groupDelete = await eveSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
      var coms= await todoSchema.find({noveaux:true});
      res.send(coms)
    })
  
  
  });
//

router.post('/pushDemandes/:idUser/:idCommmande', async (req, res) => {
            console.log('push commnda ja')
     
                     

            await     userSchema.findByIdAndUpdate({ _id: req.params.idUser }, { $push: {  commandes: req.params.idCommmande } }).then(async (userF) => {
                   console.log(userF); 
                userF.nombreDemmandes= userF.nombreDemmandes +1
                userF.save()  
               var user = await  userSchema.findOne({ _id: req.params.idUser}).populate('commandes').populate('grade').populate('userAj')
                    console.log('push')
                    console.log(user,"ee")
                   
                    res.send(user);

              
           
            
        });
          
  
})
//tab
router.post('/pushDemandesbou/:idCommmande' , async (req, res) => {
    console.log('push commnda ja')

           var tab =req.body.tab 
           var tabGrade=req.body.tabGrade
           console.log(tab,'rrt')
           console.log(tabGrade,'aat')
           for (let i = 0; i < tab.length; i++) {
           
    await     userSchema.findByIdAndUpdate({ _id: tab[i]._id}, { $push: {  commandes: req.params.idCommmande } }).then(async (userF) => {
     
    var user= await userSchema.findOne({ _id: tab[i]._id }).populate('commandes').populate('grade').populate('userAj')
        let list = [];
        var prixCommandes=0
        list=user.commandes
       

        list=list.filter(word => word.validaTionGrade==true);

      list.forEach(element=> {
         
          prixCommandes=prixCommandes+element.prixTot
        });
             console.log( prixCommandes,"ee")

             if(prixCommandes> user.grade.max){
                var grade2=tabGrade.find(element => element.min < prixCommandes &&  element.max >= prixCommandes); 
                console.log(grade2,"kk")
                   user.grade=grade2
                   user.save()
                    
               
              }
     
            });

 

          }  

 return res.send({mes:true})

})
//salaire  push 
router.post('/salaire' , async (req, res) => {
    var users=[]
    var tab =req.body.tab 
   var   commande=req.body.commmande


    for (let i = 0; i < tab.length; i++) {
        var user= await userSchema.findOne({ _id: tab[i]._id })
        user.commandesSalaire.push( commande)

        user.salaire=user.salaire+commande.prixTot
          await user.save()
        var us= await userSchema.findOne({ _id: tab[i]._id })
        
          users.push(us)
    }
    res.send(users)
    
})
//regler userAj
router.post('/userAjEliminer' , async (req, res) => {
   var users=[]
   var tabgr=[]
    var tab =req.body.tab
 
 
    for (let i = 0; i < tab.length; i++) {
     
        if(tab[i].principale == false){
            var user= await userSchema.findOne({ _id: tab[i]._id }).populate('grade').populate('userAj')
      users.push(user)
        }
       
    }
    function compare(a, b) {
        const br1=a.grade.max
        const br2=b.grade.max
       if (br1 > br2) return 1;
       if (br2 > br1) return -1;
     
       return 0;
     }
     
    users=users.sort(compare);
    for (let i = 0; i < users.length; i++) {
        var userkk= await userSchema.findOne({ _id: users[i]._id }).populate('grade').populate('userAj')
  
      var grade= await gSchema.findOne({ _id:userkk.userAj.grade })
    
       if(userkk.grade.max >=  grade.max ){
         
       
            tabgr.push(userkk)   
       }
    }

    for (let i = 0; i < tabgr.length; i++) {
        await 
        userSchema.findByIdAndUpdate({ _id: tabgr[i].userAj._id }, { $pull: { listeDecroissnateDirect: tabgr[i]._id} }).then(() => {
        
            userSchema.findOne({ _id:tabgr[i].userAj._id  }).populate('listeDecroissnateDirect').then(userD => {
             })
            })
            var  test=users.findIndex(ele=> ele.grade.max >tabgr[i].grade.max  )
            
            if(test>=0 ){
                var us =  users.find(ele=> ele.grade.max >tabgr[i].grade.max   )  
                                               
            await     userSchema.findByIdAndUpdate({ _id: us._id}, { $push: { listeDecroissnateDirect: tabgr[i]._id} }).then(userF => {

                userSchema.findOne({ _id: us._id }).populate('userAj').then(async (userf) => {
                    tabgr[i].userAj=us._id
            await tabgr[i].save()
        
                });
           
            
        });
            }
            if(test<0){
                var usr= await userSchema.findOne({ principale: true})
              
                await     userSchema.findByIdAndUpdate({ _id: usr._id}, { $push: { listeDecroissnateDirect: tabgr[i]._id} }).then((userF) => {
    
                    userSchema.findOne({ _id:usr._id }).populate('userAj').then(async (usr) => {
                        tabgr[i].userAj=usr
                        await tabgr[i].save()
            
                    });
               
                
            });
            }
    }

    res.send(users)
    
})
//pyer salaire
router.get('/pyesalaire' , async (req, res) => {
    var date=Date()
    var tab = await userSchema.find({ nouveaux: false , Aff:true }).populate('grade').populate('listeDecroissnateDirect')
  
    for (let i = 0; i < tab.length; i++) {
       
        if(tab[i].grade.primeSalaire.length>0 && tab[i].listeDecroissnateDirect.length>0){
            var sal=0
            
            var tabGrade=tab[i].grade.primeSalaire
       
       var liste=tab[i].listeDecroissnateDirect 
            var  empolyer= tab[i]    
              for (let i = 0; i <  liste.length; i++) {
              
             var us= await userSchema.findOne({ _id: liste[i]._id})
             
            var gradeMesure= await gSchema.findOne({_id:us.grade }) 
            console.log(gradeMesure.grade)
            if(   empolyer.grade.primeSalaire.findIndex(ele=>ele.grade==gradeMesure.grade) >0){
                var  gr =empolyer.grade.primeSalaire.find(ele=>ele.grade==gradeMesure.grade)
           
                console.log(liste[i].salaire)
                console.log(i+1)
                sal= sal+liste[i].salaire*gr.salaire/100
           
             
            }
           
            
            
           
          
      
    }
    tab[i].brut=sal
    tab[i].datSalaiire=date
    await tab[i].save()
    }
    else{
        tab[i].brut=0
  
        tab[i].datSalaiire=date
        await tab[i].save()
    }
      }

   var users= await userSchema.find({ nouveaux: false , Aff:true }).populate('grade')
   res.send(users)
})
//
router.post('/pushDemandeslisteCroissnte/:idUser/:idUser2', async (req, res) => {
    console.log('push commnda ja')

             

    await     userSchema.findByIdAndUpdate({ _id: req.params.idUser }, { $push: { listeDecroissnateDirect: req.params.idUser2 } }).then((userF) => {
        
        userSchema.findOne({ _id: req.params.idUser }).populate('commandes').populate('grade').populate('userAj').then((user) => {
            console.log('push')
            res.send(user);

        });
   
    
});
  

})
//pouAdminValider
router.get('/voirTotFals', async (req, res) => {
    console.log('rri')
    var users = await userSchema.find({ nouveaux: false , Aff:true }).populate('userAj').lean()
    return res.send({tab:users})

})
router.get('/voirTotFalsNonAff', async (req, res) => {
    console.log('rri')
    var users = await userSchema.find({ nouveaux: false , Aff:false })
    return res.send(users)

})
router.get('/voirTotFalsAffil', async (req, res) => {
    console.log('rri')
    var users = await userSchema.find({ nouveaux: false , Aff:true }).populate('grade')
    return res.send(users)

})
    

//
router.delete('/deletedemndes/:idUser/:idEve', async(req, res) => {
    console.log(5)
    await 
    userSchema.findByIdAndUpdate({ _id: req.params.idUser }, { $pull: { demandes: req.params.idEve } }).then(() => {
    
        userSchema.findOne({ _id: req.params.idUser }).populate('demandes').then((user) => {
            user.nombreDemmandes= user.nombreDemmandes -1
            user.save();
            res.send(user.demandes);
            
           
        });
    });
});
;
 
router.put('/modifDemande/:id', async (req, res) => {
    var eveFind = await eveSchema.findById(req.params.id);
    console.log(req.params.id);
   
    if (!eveFind) {
        res.status(404).json({message : 'nest pas connus'});
    }
    else {
     eveSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(async (eve)=>{
          
            
            var commande = await userSchema.findOne({_id:eve.user}).populate('demandes');
            res.send(eve);
           
         
            

      /*  userSchema.findById({ _id: eve.user},function(error,doc){//rappelle  pour fonction
            idUs=doc._id
             res.send(doc._id)
            
         })*/

       //  var user= eveSchema.findOne({dat:eve.dat}).lean() ou envoyer une valeur de type json
         
            
        });   
    }      
     });

     router.put('/modifDemandeAD/:id', async (req, res) => {
        console.log(5)
        var eveFind = await eveSchema.findById(req.params.id);
        console.log(req.params.id);
       
        if (!eveFind) {
            res.status(404).json({message : 'nest pas connus'});
        }
        else {
         eveSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(async (eve)=>{
              
                console.log(eve)
                var eves = await userSchema.find({nouveaux:false}).populate('demandes');
                res.send({message:true});
               
             
                
    
          /*  userSchema.findById({ _id: eve.user},function(error,doc){//rappelle  pour fonction
                idUs=doc._id
                 res.send(doc._id)
                
             })*/
    
           //  var user= eveSchema.findOne({dat:eve.dat}).lean() ou envoyer une valeur de type json
             
                
            });   
        }      
         });
     // pour faire update
cron.schedule('0 0 0 * * *', async() => {
       
        var d=Date.now() 
     
       
       var eves =  await eveSchema.find({validaTionGrade:true,nouveaux:false})
         
            
           eves.forEach(element =>{
            
           
               
                if(d > element.datSeconde) {

                  
                    

                    element.validaTionGrade = false
                    element.save()
                   
                
                  
                }
              })
           
      });
     



/*// Find only one document matching
// the condition(age >= 5)                // pour traitement <> pour tester
User.findOne({age: {$gte:5} }*/
    /*find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }    //pour les deux en meme temp
  }).*/
  /*  cron.schedule('* * * * *', async() => {
        var start = Date();
        var d=Date.parse(start)
        console.log(d);
        eveSchema.find({dateUpdate: {$lt:d} }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                docs.forEach(element =>{
                    element.type='ffffffff';
                    element.save;
                

                })
                console.log(doc);
            }
        });
    })*/

//verfier

router.put('/modifDemande/:id', async (req, res) => {
    var eveFind = await eveSchema.findById(req.params.id);
    console.log(req.params.id);
   
    if (!eveFind) {
        res.status(404).json({message : 'nest pas connus'});
    }
    else {
     eveSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(async (eve)=>{
          
            
            var user = await userSchema.findOne({_id:eve.user}).populate('demandes');
            res.send(user);
           
         
            

      /*  userSchema.findById({ _id: eve.user},function(error,doc){//rappelle  pour fonction
            idUs=doc._id
             res.send(doc._id)
            
         })*/

       //  var user= eveSchema.findOne({dat:eve.dat}).lean() ou envoyer une valeur de type json
         
            
        });   
    }      
     });

     router.post('/verfiS', async (req, res) => {
        console.log(5)
        await eveSchema.findOne({qr : req.body.value }).populate('user').lean().then(async(eve)=>{
            console.log(eve)
            console.log(10)
           if(eve){
            console.log(20)
               if(eve.user.cartEtudiant==req.body.carte){
                res.send(eve)
                console.log(25)
               }
               else{
                res.send({message:false})
                console.log(30)
                
               }
          
           }
           else{
            res.send({message:false})
            console.log(35)
            
           }
            
            
        })
            
    })
   
 
   
 module.exports = router;