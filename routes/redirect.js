var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var path = require('path');

router.get("*", function (req, res) {
    var shortUrl = req.originalUrl.slice(1);

    urlService.getLongUrl(shortUrl, function (url) {
        res.redirect(url.longUrl);
    });
});

module.exports = router;