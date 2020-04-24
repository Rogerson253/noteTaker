let fs = require("fs");
let router = require("express").Router()
let util = require('util');
const uuid1 = require("uuid/v1");
let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);  

router.get("/api/notes", async function(req, res) {
    const readNotes = await readFileAsync("./db/db.json", "utf8");
    res.send(JSON.parse(readNotes))
});

router.post("/api/notes", async function(req, res) {

    const readNotes = await readFileAsync("./db/db.json", "utf8");
    let posting = JSON.parse(readNotes);
    let newNote = {
    id: uuid1(),
    title: req.body.title,
    text: req.body.text
    };

    posting.push(newNote);
    console.log(posting);
    console.log("===============")
    let done = await writeFileAsync("./db/db.json", JSON.stringify(posting));

    res.send("Note Sent!");
});

module.exports = router;