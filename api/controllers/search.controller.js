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

    //produto = produto.replace(/ /g, '+');

    var buscaGeral = axios.get('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=003216286274829255770:9xnumqivkoa&q=' + produto)
        .then(function (responseGoogle) {
            if (responseGoogle.data.items) {
                for (let item of responseGoogle.data.items) {
                    let link = item.displayLink;

                    if (partness.indexOf(link) != -1 && !(result.indexOf(link) != -1)) {
                        axios.get(item.link)
                            .then(function (response) {
                                result.push(link);
                                console.log(link);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                }
            }

            console.log('teste');
            res.json(result);

        })
        .catch(function (error) {
            console.log(error);
        });

}