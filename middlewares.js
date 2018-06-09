var express           = require('express')    
    , cors            = require('cors')
    , bodyParser      = require('body-parser')    
    , methodOverride  = require('method-override')
    , morgan          = require('morgan')
    , responseTime    = require('response-time')   
    , config          = require('./config/config');

    // , upload          = require('express-fileupload')
module.exports = (app) => {

    app.use(cors({ origin: '*' }));


    if (process.env.NODE_ENV === 'development')
    	app.use(morgan('dev'));


    app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended:true}));
        
    app.use(bodyParser.json({limit: '50mb'}));

    app.use(methodOverride('X-HTTP-Method-Override'));

    app.use(responseTime());


};