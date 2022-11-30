const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
    // write to file (destination, json.stringify, then call back of error or data written)
    fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};
// const readAndDelete = (content, file, id) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const parsedData = JSON.parse(data);
//             console.log(parsedData);

//             //NEED TO CHECK THE CURRENT DATA
//             // FILTER THE DATA CONTENT PASSED !== 
//             // RETURN THE NEW OBJECT OF ARRAY WITH ALL OBJECTS NOT MATCHING ID

//             // THEN WRITE TO FILE EVERYTHING BUT THAT ID

//             // parsedData.push(content);
//             // writeToFile(file, parsedData);
//         }
//     });

// }

module.exports = { readFromFile, writeToFile, readAndAppend };
