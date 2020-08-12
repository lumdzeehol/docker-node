/*
 * @Author: lumdzeehol
 * @Date: 2020-07-09 15:39:16
 * @LastEditors: lumdzeehol
 */

var express = require("express");
var axios = require("axios").default;
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");
var app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});

var romaticTalk = new (require("./romaticTalk"))();
var PORT = 10086;

app.use(express.static(path.resolve(__dirname, "static")));
morgan.format(
  "ld",
  ":method :url :status :res[content-length] - :response-time ms"
);
app.use(morgan("ld", { stream: accessLogStream }));

function httpLogInfo(url, params, res, method) {
  
  console.log(`[method]: ${method} [status]: ${JSON.stringify(res.status)} [response]: ${JSON.stringify(res.data)}`);
}

app.get("/getTalk", function(req, res) {
  if (!romaticTalk.isFresh()) {
    axios
      .get("https://api.vvhan.com/api/love?type=json")
      .then(response => {
        httpLogInfo("https://api.vvhan.com/api/love?type=json", null, response, 'GET');
        if (response.data && response.data.success === true) {
          romaticTalk.setTalk(response.data.ishan);
          res
            .status(200)
            .send({ status: 0, msg: "success", data: romaticTalk.getTalk() });
        } else {
          res.status(200).send({ status: 1, msg: "nothing" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ status: -1, msg: err });
      });
  } else {
    res
      .status(200)
      .send({ status: 0, msg: "success", data: romaticTalk.getTalk() });
  }
});
app.listen(PORT, function() {
  console.log("server listen at " + PORT);
});
