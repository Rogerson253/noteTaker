// Dependencies
const router = require("express").Router()
const fs = require("fs");
const util = require('util');
const uuid1 = require("uuid/v1");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// This method retrieves data from db.json
router.get("/api/notes", async function (req, res) {
    const readNotes = await readFileAsync("./db/db.json", "utf8");
    res.send(JSON.parse(readNotes))
});

// This method takes in user input and stores it in db.json 
router.post("/api/notes", async function (req, res) {
    const readNotes = await readFileAsync("./db/db.json", "utf8");
    
    let posting = JSON.parse(readNotes);
    let newNote = {
        id: uuid1(),
        title: req.body.title,
        text: req.body.text
    };

    posting.push(newNote);
    const done = await writeFileAsync("./db/db.json", JSON.stringify(posting));

    res.send(done);
});

// This method deletes data out of db json by targeting its id
router.delete("/api/notes/:id", async function (req, res) {
    const readNotes = JSON.parse(await readFileAsync("./db/db.json", "utf8"));
   
    let noteArr = [];
    for (let i = 0; i < readNotes.length; i++) {
        if (readNotes[i].id !== req.params.id) {
            noteArr.push(readNotes[i])
        };
    };

    const done = await writeFileAsync("./db/db.json", JSON.stringify(noteArr));
    res.send(done);
});

module.exports = router;