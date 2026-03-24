const express = require('express');
const router = express.Router();

let items = [
    { id: 1, name: "Максим" },
    { id: 2, name: "Дилия" }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send({
        "items": items
    })
});

router.post('/', function(req, res, next) {
    const newUser = req.body;
    items.push(newUser);
    return res.status(201).json(newUser);
})

router.get('/:id', function(req, res, next) {
    const userId = parseInt(req.params.id);
    for (const item of items) {
        if (item.id !== userId) {
            continue;
        }
        return res.send(res.json(item));
    }
    return res.send(res.status(404));
});

module.exports = router;