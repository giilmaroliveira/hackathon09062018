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


    var buscaGeral = axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCcQpo7-hkjtTQDJ7QQ8rCXb2MFC7rNrEA&cx=012800600422885102694:ff4mxjkilwq&q=Jogo+Batman+Return+to+Arkham+-+PS4')
        .then(function (responseGoogle) {

            responseGoogle.data.items.forEach(x => {

                axios.get(x.link)
                    .then(function (response) {
                        result.push(x.displayLink);
                        console.log(result);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

        })
        .catch(function (error) {
            console.log(error);
        });
});

server.listen(3000);