var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect("mongodb+srv://user:user@tinyurl-cwyb9.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})

app.use('/public', express.static(__dirname + "/public"));
app.use(useragent.express());
app.use("/api/v1", restRouter);
app.use('/', indexRouter);
app.use("/:shortUrl", redirectRouter);
app.listen(3000);