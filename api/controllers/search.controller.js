'use strict';

var axios = require('axios');
var config = require('../../config/config');

exports.findProduct = (req, res) => {

    var partness = [
        'www.pontoslivelo.com.br',
        'www.shoppingsmiles.com.br',
        'www.pontosmultiplus.com.br'
    ];

    let result = [];

    let key = config.keyGoogle;

    var produto = 'Jogo Batman Return to Arkham - PS4';

    produto = produto.replace(' ', '+');

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

            res.json(result);

            console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        });

}