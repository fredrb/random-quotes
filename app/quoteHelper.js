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

        static _writeToObjectAsync(data, callback) {
            fs.readFile(__dirname + '/quotes.json', 'utf8', (err, data) => {
                if(err) throw err;
                let json = JSON.parse(data).content;
                json.push(data);

                fs.writeFile(__dirname + '/quotes.json', JSON.stringify(json), 'utf8', (err) => {
                    callback(err);
                });
            });
        }
    }

    return QuoteHelper;
})();
