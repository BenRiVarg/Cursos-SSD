
//--- Motor Universal del Proyecto----//
var http=require('http');
const express= require('express');
const app= express();
const path= require('path');
const mongoose= require('mongoose');
const passport= require('passport');
const session=require('express-session');

const server=http.createServer(app);

const methodOverride=require('method-override');


require('./config/passport');
//Settings
//app.set('port',3000);
app.set('port',process.env.PORT||8443);

app.set('views',path.join(__dirname,'views'));

//Motor de Plantillas
app.set('view engine','ejs');


//Middleware
app.use(methodOverride('_method'));
app.use(session({
   secret: 'mysecretapp',
   resave:true,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));


//Variables Globales
app.use((req,res,next)=>{
   
   res.locals.user=req.user || null;
   //console.log(res.locals.user);
   next();
});

server.listen(app.get('port'),()=>{
   console.log("Servidor funcionando en puerto:"+ app.get('port'));
});

//URI SSD mongodb+srv://BVargas:p%213acE27@cluster0.4nutt.mongodb.net/Sistema_Quizz?retryWrites=true&w=majority
//URI PRODUCCION mongodb+srv://QUIZ-API:PFEpkCKG5VcQDJNj@cluster0.lcjm4.mongodb.net/QUIZZES?retryWrites=true&w=majority

//Conexión a la BD
mongoose.connect('mongodb+srv://BVargas:p%213acE27@cluster0.4nutt.mongodb.net/Sistema_Quizz?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true } ,(err, res) =>{
   if (err) throw err
  console.log("Conexion con Mongo establecida");
  /*app.listen(app.get('port'), ()=>{console.log("Quizz app funcionando en : localhost:"+ app.get('port'))
                              });*/
})

