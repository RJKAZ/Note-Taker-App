// setting up dependencies
const express = require('express');

// tells node we are creating an express server
const app = express();

//setting the inital port to be used in our listener
const PORT = process.env.PORT || 3001;

//Sets up the Express App to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//set app to listen.....this is what starts the server

app.listen(PORT, function(){
  console.log('App listening on Port: ' + PORT);
});