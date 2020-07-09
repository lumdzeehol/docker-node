/*
 * @Author: lumdzeehol
 * @Date: 2020-07-09 15:39:16
 * @LastEditors: lumdzeehol
 */ 
var express = require('express');
var axios = require('axios').default;
var path = require('path');
var app = express();

var romaticTalk = new (require('./romaticTalk'));
var PORT = 10086;
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/*', function(req, res) {
  if(!romaticTalk.isFresh()) {
    axios.get('https://api.vvhan.com/api/love?type=json').then(response => {
      if(response.data && response.data.success === true) {
        romaticTalk.setTalk(response.data.ishan);
        res.status(200).send({status: 0,msg: 'success', data: romaticTalk.getTalk()});
      } else {
        res.status(200).send({status: 1,msg: 'nothing'});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).send({status: -1, msg: err});
    })
  } else {
    res.status(200).send({status: 0,msg: 'success', data: romaticTalk.getTalk()});
  }
})
app.listen(PORT, function() {console.log('server listen at ' + PORT)});