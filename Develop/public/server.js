const fs = require('fs')
const path = require('path')
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');


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

app.use(express.static("public"));
// HTML Routes needing to be created

// GET * should return the 'index.html' file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// GET '/notes' should 
app.get('/notes', (req, res) => {
    // return the 'notes.html' file
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// API Routes
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add notes`);

    // Destructuring assignment for the items in req.body
    const { text, title } = req.body;

    if (title && text) {
        // variable for the object we are saving
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        // return db.json file return all saved notes as JSON and append new note
        readAndAppend(newNote, "./db/db.json");

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.errored('error could not add note');
    }
})

// listener on port 3001
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
