'use strict';
module.exports = (function() {
    let QuoteHelper = require('./quoteHelper');
    let jade        = require('jade');
    let bodyParser  = require('body-parser');
    let fs          = require('fs');
    let express     = require('express');
    let app         = express();

    // app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.set('view engine', 'jade');
    app.set('views', __dirname + '/view');

    app.get('/', (req, res) => {
        phrase((author, text) => {
            // res.send(`${author} : "${text}"`);
            res.render('index', {
                authorName : author,
                testField : text
            });
        });
    });

    app.get('/new', (req, res) => {
        res.render('new');
    });

    app.post('/new', (req, res) => {
        QuoteHelper.addPhrase(req.body.author, req.body.text, (err, data) => {
            // show error page
            if(err) throw err;
            res.send('Added new quote');
        });
    });

    let phrase = callback => {
        fs.readFile(__dirname + '/quotes.json', 'utf8', (err,data) => {
            if(err) throw err;
            let obj = JSON.parse(data).content;
            let magicNumber = Math.random() * obj.length;

            console.log(magicNumber);
            callback(obj[Math.floor(magicNumber)].author,
                obj[Math.floor(magicNumber)].text);
        });
    }

    return app;
})();
