const fs = require('fs')
const path = require('path')
// // Helper method for generating unique ids
// const util = require('util');
const api = require('./routes/index.js')
// require express
const express = require('express');
const notes = require('./routes/notes.js');
// const { title } = require('process');
const util = require('./helpers/fsUtils');
const PORT = process.env.PORT || 3001;

const app = express();
// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/notes', notes);
// HTML Routes needing to be created

// GET * should return the 'index.html' file
app.get("/", (req, res) => {
    // global variable of dir name which directory this directory, public/index.html
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// GET '/notes' should 
app.get('/notes', (req, res) => {
    // return the 'notes.html' file
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// listener on port 3001
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
