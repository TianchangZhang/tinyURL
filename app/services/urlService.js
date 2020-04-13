var encode = [];
var UrlModel = require('../models/urlModel');

var genCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('a', 'z'));
encode = encode.concat(genCharArray('0', '9'));

var decTo62 = function (num) {
    var result = "";
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};
var getShortUrl = function (longUrl, callback) {
    if (longUrl.indexOf("http") === -1) {
        longUrl = "http://" + longUrl;
    }
    UrlModel.findOne({longUrl: longUrl}, function (err, data) {
        if(data) {
            callback(data);
        }
        else {
            generateShortUrl(function (shortUrl) {
                var url = new UrlModel({
                    shortUrl: shortUrl,
                    longUrl: longUrl
                });
                url.save();
                callback(url);
            });
        }
    });
};

var generateShortUrl = function (callback) {
    UrlModel.countDocuments({}, function (err, num) {
        callback(decTo62(num));
    });
};

var getLongUrl = function(shortUrl, callback) {
    UrlModel.findOne({shortUrl: shortUrl}, function (err, data) {
       callback(data);
    });
};
module.exports = {
    getShortUrl : getShortUrl,
    getLongUrl: getLongUrl
};