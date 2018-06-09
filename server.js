process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express      = require('express');
var app          = express();
var httpapp      = express();
var io           = null;

require('./middlewares')(app);
require('./api/app')(app);

/*
var http = require('http');
var axios = require('axios');

var server = http.createServer(function (req, res) {
    res.writeHead(200)
    res.end('teste');

    var partness = [
        'www.pontoslivelo.com.br',
        'www.shoppingsmiles.com.br',
        'www.pontosmultiplus.com.br'
    ];

    var result = [];

    var produto = 'Jogo Batman Return to Arkham - PS4';

    produto = produto.replace(' ','+');

    var buscaGeral = axios.get('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=012800600422885102694:ff4mxjkilwq&q=' + produto)
        .then(function (responseGoogle) {


            responseGoogle.data.items.forEach(x => {

                let link = x.displayLink;

                if (partness.indexOf(link) != -1 && result.indexOf(link) != -1) {

                    axios.get(x.link)
                        .then(function (response) {
                            result.push(x.displayLink);
                            console.log(x.displayLink);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            });

            console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        });
});

*/

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