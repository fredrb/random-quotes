'use strict';
module.exports = (function() {
    let jade    = require('jade');
    let fs      = require('fs');
    let express = require('express');
    let app     = express();

    app.set('view engine', 'jade');
    app.set('views', __dirname + '/view');

    app.get('/', (req, res) => {
        let backgrounds = [
            'background01.css',
            'background02.css',
            'background03.css'
        ]
        phrase((author, text) => {
            // res.send(`${author} : "${text}"`);
            res.render('index', {
                authorName : author,
                testField : text,
                background : backgrounds[Math.floor(Math.random(3))]
            });
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
