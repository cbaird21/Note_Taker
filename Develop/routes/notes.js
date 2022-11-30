const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)
notes.post("/", (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newEntry = {
            title,
            text,
            id: uuid(),
        };

        // return db.json file return all saved notes as JSON and append new note
        readAndAppend(newEntry, "./db/db.json");


        const response = {
            status: 'success',
            body: newEntry,
        };

        res.status(201).json(response);
    } else {
        res.status(500).json('error could not add note');
    }
})

module.exports = notes;



