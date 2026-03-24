const express = require('express');
const router = express.Router();

let items = [
    { 'id': 1, "name": "Максим" },
    { 'id': 2, "name": "Дилия" }
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

router.get('/', function(req, res, next) {
    const userId = req.params.id;
    const user = null;
    for (const item of items) {
        if (item['id'] != userId) {
            continue;
        }
        return res.status(201).json(item);
    }
    return res.status(404);
});

module.exports = router;