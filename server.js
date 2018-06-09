process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express      = require('express');
var app          = express();
var httpapp      = express();
var io           = null;

require('./middlewares')(app);
require('./api/app')(app);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'homolog') {
    var http = require('http').Server(app);
    http.listen(process.env.PORT, () => {
        console.log('API Running on PORT: ' + process.env.PORT + ' and Env: ' + process.env.NODE_ENV);
    });
}

httpapp.get('*',function(req,res){  
    res.redirect("https://" + req.headers['host'] + req.url)
})

module.exports = app;