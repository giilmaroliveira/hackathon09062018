'use strict';
var XLSX = require('xlsx')
var axios = require('axios');
var config = require('../../config/config');
var fetch = require('node-fetch');
var ItemDisplayModel = require('../models/itemDisplay.model')

exports.findProduct = async (req, res) => {

    var partness = [
        'www.pontoslivelo.com.br',
        'www.shoppingsmiles.com.br',
        'www.pontosmultiplus.com.br'
    ];
    var produtos = [];
    var esferaPrices = [];
    let result = [];
    let key = config.keyGoogle;

    if (req.file) {
        var workbook = XLSX.readFile(req.file.path, {
            type: 'buffer'
        });
        var wsname = workbook.SheetNames[0];
        var ws = workbook.Sheets[wsname];
        var data = XLSX.utils.sheet_to_json(ws, {
            header: 1
        });
        for (let i = 1; i < data.length; i++) {
            produtos.push(data[i][0]);
            esferaPrices.push(data[i][6]);
        }
    }
    // var produto = 'Jogo Batman Return to Arkham - PS4';

    for (let i = 0; i < produtos.length; i++) {
        await axios.get('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=003216286274829255770:9xnumqivkoa&q=' + produtos[0])
            .then(async function (responseGoogle) {
                if (responseGoogle.data.items) {
                    for (let item of responseGoogle.data.items) {
                        let link = item.displayLink;
                        fetch(item.link)
                            .then(res => res.text())
                            .then(text => {
                                var itemDisplay = {
                                    name: "",
                                    priceEsfera: 0,
                                    priceMultiplus: 0,
                                    priceLivelo: 0,
                                    priceSmile: 0,
                                };
                                itemDisplay.name = produtos[i];
                                itemDisplay.priceEsfera = esferaPrices[i];
                                itemDisplay.priceMultiplus = esferaPrices[i];
                                itemDisplay.priceLivelo = esferaPrices[i];
                                itemDisplay.priceSmile = esferaPrices[i];
                                result.push(itemDisplay);
                            });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    res.json(result);
}