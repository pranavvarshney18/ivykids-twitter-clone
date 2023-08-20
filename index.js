const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');


//rendering views
app.use(expressLayouts);
//place css and js tags at their respective postions
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/home.js'));
//all static files are present inside assets folder
app.use(express.static('./assets'));


//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, (err) =>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});