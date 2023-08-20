const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(express.urlencoded({extended:false}));

//rendering views
app.use(expressLayouts);
//place css and js tags at their respective postions
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up sass/scss
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // debug: true,
    outputStyle: 'extended', 
    prefix: '/css'
}));
//all static files are present inside assets folder
app.use(express.static('./assets'));


//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//encripting cookie
app.use(session({
    name: 'ivykids_twitter_clone',
    secret: 'ivykids',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //100min
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: "disabled",
    },
    (err) => {
        if(err) console.log("error in MongoStore setup", err);
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

//user can be accessable in views (we have set locals.user in checkAuthentication middleware in passport config)
app.use(passport.setAuthenticatedUser); // now locals.user can be used in views


//use express router
app.use('/', require('./routes/home.js'));

app.listen(port, (err) =>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});