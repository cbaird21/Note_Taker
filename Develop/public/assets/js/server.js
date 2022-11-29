const fs = require('fs')
const path = require('path')
const { randomUUID } = require("crypto");


// require express
const express = require('express');
const { title } = require('process');

const PORT = process.env.PORT || 3001;

const app = express();
// MIDDLEWARE
// allowing us to parse JSON and give us accress to data off of a req.body
app.use(express.json());
// name='Ben' access this as JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// HTML Routes needing to be created

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
const clearData = () => {
    fs.unlink("./db/db.json");
};

// API Routes
app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
// GET '/api/notes' should read the db.json file and return all saved notes as JSON
// app.get('/api/notes', (req, res) => {
// return the 'notes.html' file
// POST '/api/notes' should receive a new note to save on the request body, add it to the 'db.json' file, and then return the new note to the client. (HINT look into npm packages that could do this for us)
// log our note to the terminal
app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add notes`);

    if (title && text) {
        const newNote = {
            title,
            text,
            id: randomUUID(),
        };
        //     // return db.json file return all saved notes as JSON
        readAndAppend(newNote, "./db/db.json");
        res.json('New Note added!');
    } else {
        res.errored('error could not add note');
    }
})
// GET * should return the 'index.html' file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// listener on port 3001
app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
