const passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;

//----M O D E L O S-----//
const Usuario=require('../modelos/usuario.js');

passport.use(new LocalStrategy({

      usernameField: 'correo',

      passwordField: 'telefono'
},async (username,password,done)=>{

    const usuario= await Usuario.findOne({correoElectronico: username});
   
    if(!usuario){
        return done(null,false,console.log('Usuario no encontrado'));
    }
    else{
        if( password=usuario.telefono){
            return done(null,usuario);
        }
        else{
            return done(null,false,console.log('Usuario no Registrado'));
        }
    }
}));

passport.serializeUser((usuario,done)=>{
    done(null,usuario._id);
})

passport.deserializeUser((id,done)=>{
    Usuario.findById(id,(err,usuario)=>{
        done(err,usuario);
    })
})