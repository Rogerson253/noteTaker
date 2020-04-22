var fs = require("fs");
var router = require("express").Router()
var util = require('util');
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);  

router.get("/api/notes", async function(req, res) {
    const readNotes = await readFileAsync("./db/db.json", "utf8");
    console.log("Here!", readNotes);
    res.send(JSON.parse(readNotes))
});

router.post("/api/notes", async function(req, res) {
    console.log(req.body)
    const readNotes = await readFileAsync("./db/db.json", "utf8");
    var posting = JSON.parse(readNotes);
    var newNote = {
    title: req.body.title,
    text: req.body.text
    }
    posting.push(newNote);
    console.log(posting);

    var done = await writeFileAsync("./db/db.json", JSON.stringify(posting));
    res.send("Note Sent!")
});
module.exports = router;