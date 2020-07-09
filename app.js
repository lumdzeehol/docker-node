/*
 * @Author: lumdzeehol
 * @Date: 2020-07-09 15:39:16
 * @LastEditors: lumdzeehol
 */ 
var express = require('express');
var path = require('path');
var app = express();
var PORT = 10086;
app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(PORT, function() {console.log('server listen at ' + PORT)});