const auth={};

auth.isAuthenticated=(req,res,next)=>{

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
    console.log('No estás autenticado');
};

module.exports=auth;