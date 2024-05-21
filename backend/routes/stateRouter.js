const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var auth = require('../authenticate')();
const States = require('../models/states');
const stateRouter = express.Router();

stateRouter.use(bodyParser.json());

stateRouter.route('/')
    .get((req, res, next) => {
        States.find()
            .then((states) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(states);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(auth.authenticate(), (req, res, next) => {
        States.create(req.body)
            .then((state) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(state);
            })
    })

stateRouter.route('/:stateId')
    .get(auth.authenticate(),(req, res, next) => {
        States.findById(req.params.stateId)
            .then((state) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(state);
            }, (err) => next(err)
                .catch((err) => next(err)));
    })
    .put(auth.authenticate(), (req,res,next) => {
        States.findByIdAndUpdate(req.params.stateId, {
            $set: req.body
        }, {new: true})
        .then((state) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(state);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(auth.authenticate(), (req,res,next) => {
        States.findByIdAndDelete(req.params.stateId, {
            $set: req.body
        })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    })


module.exports = stateRouter;