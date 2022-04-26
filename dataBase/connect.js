const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nerCrudProd1',
{useNewUrlParser: true, 
useUnifiedTopology: true,
useFindAndModify: false
})
.then(()=>console.log('Successfully connected to database.'))
.catch((e)=>console.error('Error in connection',e));

module.exports = mongoose;