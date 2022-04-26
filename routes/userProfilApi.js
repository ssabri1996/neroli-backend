const express = require('express')
const router = express.Router();
const userSchema = require('../model/userSchema')



router.put('/:id', async (req, res) => {
    var userFind = await userSchema.findById(req.params.id);
    if (!userFind) {
        res.status(404).json({message : 'nest pas connus'});
    }
    else {
       userFind.photoProfil=req.body.image;
       userFind.images.push(req.body.image);
       userFind.save();
       res.send({message:'enregistrer',photo:userFind.photoProfil})
    }
})
router.get('/:id', async (req, res) => {
    var userFind = await userSchema.findById(req.params.id);
    if (!userFind) {
        res.status(404).json({message : 'nest pas connus'});
    }
    else {
      
       res.send(userFind)
    }
})

module.exports = router;