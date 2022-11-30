const fs = require('fs')
const path = require('path')
// Helper method for generating unique ids
const util = require('util');

const api = require('../routes/index.js')
// require express
const express = require('express');
// const { title } = require('process');

const PORT = process.env.PORT || 3001;

const app = express();
// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
// name='Ben' access this as JSON
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static("public"));
// HTML Routes needing to be created

// GET * should return the 'index.html' file
app.get("*", (req, res) => {
    // global variable of dir name which directory this directory, public/index.html
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// GET '/notes' should 
app.get('/notes', (req, res) => {
    // return the 'notes.html' file
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// API Routes
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


// listener on port 3001
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
