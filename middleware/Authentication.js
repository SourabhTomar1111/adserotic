module.exports.isAuthenticated = function (req, res, next) {
    
    if (req.session.loggedIn)
        return next();
  
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
  }

module.exports.dashboardRedirect = function (req, res, next){
    // do any checks you want to in here
    if (req.session.loggedIn){
        if(req.session.user.user_role === 2 ){
            res.redirect('/publisher/dashboard');
        }else if(req.session.user.user_role === 3){
            res.redirect('/advertiser/dashboard');
        }else{
            res.redirect('/');
        }
    }else{
        next();
    }
  
}


module.exports.isPublisher = function (req, res, next){    
    if (req.session.loggedIn){
        if(req.session.user.user_role === 2 ){
            next();
        }else{
            // res.status(400).send('Unauthorized content');
            throw new Error('Unauthorized content');
            next();
        }
    } else{
        res.redirect('/login');
    }
}

module.exports.isAdvertiser = function (req, res, next){
    if (req.session.loggedIn){
        if(req.session.user.user_role === 3 ){
            next();
        }else{
            // res.status(400).send('Unauthorized content');
            throw new Error('Unauthorized content');
            next();
        }
    }  else{
        res.redirect('/login');
    } 
}

