require('dotenv').config();

const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    expressValidator = require("express-validator"),
    config = require('./config/local'),
    routes = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json({
    limit: '10mb'
}));

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.get('/', (req, res) => {
    res.json('Welcome to Tracker');
});
app.use('/', routes);
app.use(expressValidator());

app.use(function (err, req, res, next) {
    console.error(err);
    var error = {
        status: false,
        status_code: 500,
        message: "Something bad happened. Please contact system administrator or try again"
    };
    res.send(error);
});

mongoose.Promise = global.Promise;

startMongo = (mongoObj) => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(mongoObj.url, mongoObj.options);
    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb on %s", mongoObj.url);
    })
    mongoose.connection.on("error", (err) => {
        if (err) {
            console.log("not connected to mongodb due to %s", err);
            process.exit();
        }
    })
}

app.listen(config.PORT, () => {
    console.log("Server is listening on port " + config.PORT);
    startMongo(config.mongo);
});