'use strict';

var GroceryItem = require('./../models/GroceryItem');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    GroceryItem.find(function (err, items) {
        if (err) return next(err);

        res.status(200).send(items);
    });
});

router.post('/', function (req, res, next) {
    var item = req.body;
    var groceryItem = new GroceryItem(item);
    groceryItem.save(function (err, data) {
        if (err) return next(err);

        res.status(201).send();
    });
});

router.delete('/:id', function (req, res, next) {
    GroceryItem.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);

        res.status(200).send();
    });
});

router.patch('/:id', function (req, res, next) {
    GroceryItem.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
        if (err) return next(err);

        res.status(200).send('Item updated...' + item._id);
    });
});


module.exports = router;
