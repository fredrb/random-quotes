'use strict';
module.exports = (function() {
    let fs = require('fs');

    class QuoteHelper {
        static addPhrase(author, text, callback) {
            let data = { author:author, text:text };
            this._writeToObjectAsync(data, (err) => {
                callback(err, data);
            });
        }

        static _writeToObjectAsync(quote, callback) {
            fs.readFile(__dirname + '/quotes.json', 'utf8', (err, data) => {
                if(err) throw err;
                let json = JSON.parse(data);
                json.content.push(quote);

                fs.writeFile(__dirname + '/quotes.json', JSON.stringify(quote), 'utf8', (err) => {
                    callback(err);
                });
            });
        }

        static phrase(callback) {
            fs.readFile(__dirname + '/quotes.json', 'utf8', (err,data) => {
                if(err) throw err;
                let obj = JSON.parse(data).content;
                let magicNumber = Math.random() * obj.length;

                callback(obj[Math.floor(magicNumber)].author,
                    obj[Math.floor(magicNumber)].text);
            });
        }
    }

    return QuoteHelper;
})();
