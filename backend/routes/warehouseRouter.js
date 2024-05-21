const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var auth = require('../authenticate')();
const Warehouse = require('../models/warehouse');
const wareHouseRouter = express.Router();

wareHouseRouter.use(bodyParser.json());

wareHouseRouter.route('/')
    .get((req, res, next) => {
        Warehouse.find()
            .populate('state', 'stateName')
            .populate('city', 'cityName')
            .then((warehouse) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(warehouse);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth.authenticate(), (req, res, next) => {
        Warehouse.create(req.body)
            .then((warehouse) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(warehouse);
            })
    })

wareHouseRouter.route('/:wareHouseId')
    .get(auth.authenticate(), (req, res, next) => {
        Warehouse.findById(req.params.wareHouseId)
            .populate('state', 'stateName')
            .populate('city', 'cityName')
            .then((warehouse) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(warehouse);
            }, (err) => next(err)
                .catch((err) => next(err)));
    })
    .put(auth.authenticate(), (req, res, next) => {
        Warehouse.findByIdAndUpdate(req.params.wareHouseId, {
            $set: req.body
        }, { new: true })
            .then((warehouse) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(warehouse);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(auth.authenticate(), (req, res, next) => {
        Warehouse.findByIdAndDelete(req.params.wareHouseId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })


module.exports = wareHouseRouter;