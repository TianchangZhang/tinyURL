var express = require('express');
var router = express.Router();
var urlService = require("../services/urlService");
var statsService = require("../services/statsService");
var path = require('path');
router.get('*', function (req, res){
    var shortUrl = req.originalUrl.slice(1);
    urlService.getLongUrl(shortUrl, function (data) {
        if (data) {
            res.redirect(data.longUrl);
            statsService.logRequest(shortUrl, req);
        }
        else {
            res.sendFile("404.html", {root: path.join(__dirname, '../public/views/')});
        }
    });
});

module.exports = router;