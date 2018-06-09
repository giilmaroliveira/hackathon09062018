var search = require('../controllers/search.controller.js');
var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

module.exports = (app) => {

    app.route('/api/search/product')
        .post(upload.single('data'), search.findProduct)
        .get(search.findProduct);

}