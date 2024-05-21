const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var auth = require('../authenticate')();
const Cities = require('../models/cities');
const cityRouter = express.Router();

cityRouter.use(bodyParser.json());

cityRouter.route('/')
    .get((req, res, next) => {
        Cities.find()
        .populate('state','stateName')
            .then((cities) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(cities);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth.authenticate(), (req, res, next) => {
        Cities.create(req.body)
            .then((city) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(city);
            })
    })

cityRouter.route('/:cityId')
    .get(auth.authenticate(),(req, res, next) => {
        Cities.findById(req.params.cityId)
        .populate('state', 'stateName')
            .then((city) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(city);
            }, (err) => next(err)
                .catch((err) => next(err)));
    })
    .put(auth.authenticate(), (req,res,next) => {
        Cities.findByIdAndUpdate(req.params.cityId, {
            $set: req.body
        }, {new: true})
        .then((city) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(city);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(auth.authenticate(), (req,res,next) => {
        Cities.findByIdAndDelete(req.params.cityId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    })


module.exports = cityRouter;