'use strict';
module.exports = (function() {
    let QuoteHelper = require('./quoteHelper');
    let jade        = require('jade');
    let bodyParser  = require('body-parser');
    let fs          = require('fs');
    let express     = require('express');
    let app         = express();

    app.use(bodyParser.urlencoded({extended : true}));

    app.set('view engine', 'jade');
    app.set('views', __dirname + '/view');

    app.get('/', (req, res) => {
        QuoteHelper.phrase((author, text) => {
            res.render('index', {
                title : 'Quotes',
                author : author,
                text : text
            });
        });
    });

    app.get('/new', (req, res) => { res.render('new', { title : 'New quote'}); });

    app.post('/new', (req, res) => {
        QuoteHelper.addPhrase(req.body.author, req.body.text, (err, data) => {
            // show error page & result page
            if(err) throw err;
            res.send('Added new quote');
        });
    });

    return app;
})();
