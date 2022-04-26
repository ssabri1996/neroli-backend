const express = require('express')
//body parser
var bodyParser = require('body-parser');


// import passport 
const passport = require('./passport/passport')
var date=Date();//pour date de sed jour
var d = new Date(1614184837465);//pour converture de milsegond en standard
const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');//pour de santdar aux millisegond
var dat=Date.now("Wed Feb 24 2024 17:39:43")
 var jour=d.getDay()
console.log(date);
console.log(dat);
console.log(d);
console.log(jour);


const app = express();
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

const connect = require('./dataBase/connect')
const authApi=require('./routes/authAPI');
const todoApi=require('./routes/todoApi')
const imProfil=require('./routes/userProfilApi')
const evenement= require('./routes/evenemnetApi')
const emailApi=require('./routes/emailApi')
const groupApi=require('./routes/groupApi')
const profApi=require('./routes/authProfApi')

//activer les api
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//routes
app.use('/api/v1',authApi);
app.use('/todo',todoApi);
app.use('/profil',imProfil)
app.use('/eve',evenement)
app.use('/email',emailApi);
app.use("/group",groupApi);
app.use("/admin",profApi);
//port
app.listen(3000,()=>console.log('Server listen on the port 3000')) ;
