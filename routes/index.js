const router = require('express').Router();

// import our mdoular routers for /notes
const notesRouter = require('./notes')


router.use('./notes', notesRouter);

module.exports = router;
