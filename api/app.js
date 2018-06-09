module.exports = (app) => {
    require('../api/routes/search.routes')(app)
    return app
};