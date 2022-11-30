const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require('fs')
const util = require('util');

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
// notes.delete("/:id", (req, res) => {
//     const id = req.params.id;
//     // console.log(id);
//     readFromFile('./db/db.json').then((data) => {
//         const oldObj = (JSON.parse(data))
//         const newObj = oldObj
//         // console.log new obj to make sure array of objects generates
//         for (var i = 0; i < newObj.length; i++) {
//             if (newObj[i].id === id) {
//                 newObj.splice(newObj[i], 1)
//                 fs.writeFile('./db/db.json', JSON.stringify(newObj), (err) => {
//                     if (err) {
//                         console.error
//                     }
//                 })
//                 res.json('note deleted')
//             }
//         }
//         return res.send
//     })

//     readAndDelete()
//     res.send("note deleted");

// })

module.exports = notes;