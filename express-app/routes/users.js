const express = require('express');
const router = express.Router();

let items = [
    { id: 1, name: "Максим" },
    { id: 2, name: "Дилия" }
]

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.send({
    //"items": items
    //})
    return db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

router.post('/', function(req, res, next) {
    const name = req.body;
    //items.push(newUser);
    const insert = "INSERT INTO users (name) VALUES (@name)";
    db.run(insert, [name]);
    return res.status(201).json(name);
})

router.get('/:id', function(req, res, next) {
    const userId = parseInt(req.params.id);
    //for (const item of items) {
    //if (item.id !== userId) {
    // continue;
    //}
    //return res.send(res.json(item));
    //}
    //return res.send(res.status(404));
    return db.all("SELECT id, name FROM users WHERE id = @userId", [userId], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});


module.exports = router;