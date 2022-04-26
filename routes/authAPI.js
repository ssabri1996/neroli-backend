
const express = require('express')
const router = express.Router();
const lodash = require('lodash')
const userSchema = require('../model/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../passport/passport');
const cron = require('node-cron');

const { isArray } = require('lodash');

var admins = {
    login: "0000",
    passsword: "0000",
    sign: ""
}
var g = {
    ff: 5,
    fa: 9
}
var tabjj = [{ ff: 11, fa: 9 }, { ff: 11, fa: 12 }]
var tabjjj = tabjj
tabjj.push({ ff: 11, fa: 45 })
tabjj.push(g)
console.log(tabjjj)

var a = 6
var aa = a
a = 7
var kg = g
g.ff = 12
g.fa = 15
console.log(kg)
console.log(aa)
console.log(tabjjj)
test = true
var i=0
var j=0
//
var tabExel=[ {cin: "12586",
cartEtudiant: "1256",
nom: "aaac",
name: "enr",
prenom: "errgfj",
groupe: "A",
specialite: "meca",
niveau: "2eme"
},{cin: "1258716",
cartEtudiant: "125716",
nom: "aaac",
name: "enr",
prenom: "errgfj",
groupe: "A",
specialite: "meca",
niveau: "2eme"
},{cin: "1258916",
cartEtudiant: "1258916",
nom: "aaac",
name: "enr",
prenom: "errgfj",
groupe: "A",
specialite: "mecan",
niveau: "2eme"
},{cin: "12161",
cartEtudiant: "12161",
nom: "aaac",
name: "enr",
prenom: "errgfj",
groupe: "A",
specialite: "mecan",
niveau: "2eme"
}]
var x=5
//

  

  
/*async function f1(){
    var p=  new Promise(resolve => {
        setTimeout(() => {
          resolve(10);
        }, 10000);
      });
      var j=  new Promise(resolve => {
        setTimeout(() => {
          resolve(12);
        }, 5000);
      });
    var  x = await p 
       var m=await j             // pour comprondre async await
       var y=x-4
       var d=m+11
       console.log("non passe")
       console.log(d)
       console.log(y)
        }
          f1()

       console.log("passse")*/

   // 10


  
  

//

//login adminstration
router.post('/loginADMIN', async (req, res) => {
    if (req.body.login == admins.login && req.body.password == admin.password) {
        return res.send({ message: true })
    }
    else {
        return res.send({ message: false })
    }
})
//signADMIN
router.post('/signADMIN', async (req, res) => {
    admins.sign = req.body.sign
    console.log(admins.sign)
})
//getsign
router.get('/voirTotFals', async (req, res) => {
    console.log('rri')
    var users = await userSchema.find({ nouveaux: false , Aff:true }).populate('commandes').populate('grade').populate('commandes').populate('userAj').lean()
    return res.send(users)

})

//users
router.get('/voir/:id', async (req, res) => {
    var user = await userSchema.findOne({ _id: req.params.id }).populate('commandes').populate('grade').populate('commandes').populate('userAj')
    res.send(user)

});
//get prin cipale

//pur tot users

router.get('/voirPrincipale', async (req, res) => {
    var user = await userSchema.findOne({ principale: true ,Aff:true})
    console.log('rrrr')
    if(!user){
        res.send({mes:false})
    }
    if(user){
        res.send(user)
    }

   

});
//voire tous l'etudiant
router.get('/voirEtudant', async (req, res) => {
    var user = await userSchema.find().populate('demandes').lean();
    res.send(user)

});
router.get('/voirEtudantL', async (req, res) => {
    var tabn = []
    var tabd = []
    await userSchema.find().populate('demandes').lean().then(user => {
        console.log(user)
        user.forEach(element => {
            tabn.push(element.name)
            console.log(tabn)
            tabd.push(element.nombreDemmandes)
        })
        res.send({ tabN: tabn, tabD: tabd })
    });


});


//verfication adminstration
router.post('/verfCarte', async (req, res) => {
    console.log(req.body.cartEtudiant)
    console.log(req.body.cin)

    userSchema.find({ cartEtudiant: req.body.cin }, function (error, user) {
        if (user.length > 0) {
            console.log(user)
            console.log(user[0])

            return res.send({ message: true, id: user[0]._id })
        }
        if (error) {
            console.log(error)
        }
        else {
            console.log("null")
            return res.send({ message: false })
        }
    })

})
//verfication 1
router.post('/verfier', async (req, res) => {
    try {
        var user = await userSchema.findOne({ email: req.body.email });

        if (!user) {
            return res.send({
                message: true
            })
        }
        else {
            return res.send({ message: false })
        }

        /*var  user  =new userSchema({
                  nom:req.params.nom,
                age:req.params.age     //tu peut creer d'apres les parametres /:nom/:age en api de poste
             
          })    
           /*  user = await userSchema.create(user);*/



    } catch (error) {
        res.send(error.message)
    }

});

//register aapp esit

router.post('/register/:id/:code', async (req, res) => {
    try {
        console.log(req.params.code)
        console.log(req.params.id)
        console.log(req.body.phone)


        //var user = await userSchema.create(lodash.pick(req.body,['name','prenom','email','password','cartEtudiant','nombreDemmandes',"fonction","photoProfil","classe","cin","regAdminstration","annee"]));//just pour poster les champs suivant que dans lodash
        var user = await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const saltRounds = 10;
        const salt = bcrypt.genSalt(saltRounds)
        user.password = await bcrypt.hash(user.password, saltRounds);// pour crypter password

        user.save();
        console.log(user);
        return res.send({ message: true })







    } catch (error) {
        res.send(error.message)
    }

});
//registres

router.post('/registerAff', async (req, res) => {
    try {
         if(req.body.Aff==false){
        var us= await userSchema.create(req.body);
        return res.send({message:true,user:us})
    }
   if(req.body.Aff==true){
    
        console.log("aaaaa")
var user = await userSchema.findOne({ email: req.body.email,Aff:true });

if (!user ) { //user = await userSchema.create(lodash.pick(req.body,['name','email','password','age']));//just pour poster les champs suivant name email password age
 var us= await userSchema.create(req.body);
  const saltRounds = 10;
  const salt = bcrypt.genSalt(saltRounds)
  us.password = await bcrypt.hash(us.password, saltRounds);// pour crypter password

  us.save();
  return res.send({message:true,user:us})
}
if(user){
    return res.send({message:false})  
}
}


} catch (error) {
    res.send(error.message)
}
});
//registre nonaff


router.post('/login', async (req, res) => {
   
    console.log("eeeg")
    try {
        var user = await userSchema.findOne({ email: req.body.email ,nouveaux:false,Aff:true}).populate('commandes').populate('grade').populate('userAj').populate('listeDecroissnateDirect')

         
        if (user) {
            console.log(user,"zzzz")
            var test = await bcrypt.compare(req.body.password, user.password)
            if (test) {
                var token = jwt.sign({ _id: user._id }, 'privateKey', { expiresIn: '1d' })

                console.log(user);
                // res.send({token: token})  pour envoyer comme objet  json 
                res.header('Authorization', token).send({ message: true , user: user })
            }
            else { //res.status(201).send("mots de passe incorrect")
                return res.send({ message: false })
            }

        }
        else {
            return /*res.status(401).send("email ou mots ded passe incorrect").*/res.send({ message: false })
        }

    } catch (error) {
        res.send(error.message)
    }

});
//contact
router.post("/contact/:id", async(res, req,next) => {
    
    var user = userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(user)
})
// register adminstration
router.post("/registerADMIN", async (req, res,next) => {
    var tabE=[]
    var tabNe=[]
    console.log(req.body.val)
    var tabExel=JSON.parse(req.body.val)
      
    console.log(tabExel)
    for (let i = 0; i < tabExel.length; i++){
        
            console.log('entrer')
            var etudiant = {
              cin: tabExel[i].cin,
              cartEtudiant: tabExel[i].cartEtudiant,
              nom: tabExel[i].Nom,
              name: tabExel[i].Nom,
              prenom: tabExel[i].Prénom,
              groupe: tabExel[i].Groupe,
              specialite: tabExel[i].Spécialité,
              niveau: tabExel[i].Niveau,
              nomArbe: tabExel[i].الإسم,
            
            
              lieuxArabe: tabExel[i].المكان,
              prenomArabe: tabExel[i].اللقب,
              AneeArabe: tabExel[i].السنة,
              SepAarbe: tabExel[i].الإختصاص,
              DiplomeArabe: tabExel[i].الشهادة
            
            }
            
            
           
    
    
    

           
       await userSchema.findOne({ cin: tabExel[i].cin  }).exec().then(async(us)=>{
           
           
            if (!us) {
                
      etudi=await userSchema.create(etudiant)
    
                     tabE.push(etudi)         
                       }
            // prints "The authors age is null'
            if(us){
               
                tabNe.push(us)
                console.log(tabNe)
            }
        });
    
         
}    
    res.send({tabNon:tabNe,tabOui:tabE})
})
//get adinstration
router.get("/etudiantADMIN", async (req, res) => {
     await userSchema.find().lean().then(users => {
          
        res.send({rep:JSON.stringify(users)})
    })

})
//modi
router.put('/modifDemandeG/:id', async (req, res) => {
    console.log(5)
  
     
   var user= await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('commandes').populate('grade').populate('userAj')
  
       console.log(user)           
      res.send(user)
 
  })
  //modigroupET
  router.put('/modifDemandeGr', async (req, res) => {
      var j=0
       var tabUp=[]
    var tabExel=req.body.val
      
    console.log(tabExel)
    for (let i = 0; i < tabExel.length; i++){
             j=i
      var us=  await userSchema.findOne({ cin:tabExel[i].cin})
  
    
    if(us){ 
     

    var user= await userSchema.findByIdAndUpdate(us._id,{
      
        cartEtudiant: tabExel[i].cartEtudiant,
        nom: tabExel[i].Nom,
        name: tabExel[i].Nom,
        prenom: tabExel[i].Prénom,
        groupe: tabExel[i].Groupe,
        specialite: tabExel[i].Spécialité,
        niveau: tabExel[i].Niveau,
        nomArbe: tabExel[i].الإسم,
      
      
        lieuxArabe: tabExel[i].المكان,
        prenomArabe: tabExel[i].اللقب,
        AneeArabe: tabExel[i].السنة,
        SepAarbe: tabExel[i].الإختصاص,
        DiplomeArabe: tabExel[i].الشهادة
      
      }, { new: true })
      console.log(user)
       tabUp.push(user)
       
      console.log(2)
     

    }

console.log(3)
   
}

res.send({rep:JSON.stringify(tabUp)})

  })
  //supprtimer
  router.delete('Delet/:id', async (req, res) => {

      await userSchema.deleteOne({ _id: req.params.id })
      var users = await  userSchema.find();
        res.send(users)
    
    })
  //fin

module.exports = router;

