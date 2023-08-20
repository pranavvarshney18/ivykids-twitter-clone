const express = require('express');
const app = express();
const port = process.env.PORT || 3000;



app.listen(port, (err) =>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});