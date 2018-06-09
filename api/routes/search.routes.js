var search = require('../controllers/search.controller.js');
var express = require('express');
var app = express();

module.exports = (app) => {

    app.route('/api/search/product')
        .get(search.findProduct);

}