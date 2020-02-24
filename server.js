//set up dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path');


//import data source/journal arrary from json file
const notes = require('./db.json');

// tells node we are creating an express server and set the port numnber 
const app = express();
const PORT = 3001;

//set up middleware

//middleware that allows download of static files
app.use(express.static('public'));
//middleware for the post requests
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// get request to fetch data 
app.get('/api/notes', function (req, res) {
 fs.readFile('./db.json', "utf8", function (err, results) {
    res.json(JSON.parse(results));
  })
});

//Post request to submit data 
app.post('/api/notes', function (req, res) {
  //declaring the newNote variable to hold parameters of the post request. 
  let newNote = req.body;
    fs.readFile('./db.json', "utf8", function (err, results){
    let notes = JSON.parse(results);
    req.body.id = notes.length;
    notes.push(newNote)
    //writing to the db.json
    fs.writeFile('./db.json', JSON.stringify(notes), function (err, result) {
      res.json(newNote)
    })
  })
})

//delete request to delete the note from the api
app.delete('/api/notes/:id', function (req, res){
  const deleteNote = req.params.id;
  //splice method to remove items from array, this deletes it from the json file.
  notes.splice(deleteNote, 1);
  fs.writeFile('./db.json', JSON.stringify(notes), function (err, result){
    res.json(req.body);
  })
});
// Callback functions 
app.get("/notes", function (req,res){
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Start the Server 
app.listen(PORT, function () {
  console.log(`API server now on port ${PORT}!`);

});

