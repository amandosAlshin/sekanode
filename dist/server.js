"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _index = require("./controller/index.js");

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var app = (0, _express["default"])();

var _require = require('./config/vars'),
    port = _require.port,
    secret = _require.secret;

var cors = require('cors');

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'client/build')));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json()); // parse form data client

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.get('*', function (req, res) {
  return res.sendFile(_path["default"].join(__dirname + '/client/build/index.html'));
});
app.post('/cabinet/*', (0, _expressJwt["default"])({
  secret: secret
}), function (err, req, res, next) {
  if (err) {
    if (err.name = 'UnauthorizedError') {
      return res.sendStatus(401);
    }
  }
});
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use('/api/restorans', cors(corsOptions), _index.restorans);
app.use('/api/users', cors(corsOptions), _index.users);
app.use('/cabinet/orders', cors(corsOptions), _index.orders);
app.use('/cabinet/userapp', cors(corsOptions), _index.userapp);
app.listen(port, function () {
  return console.log("Server serik diplom listinging on localhost: ".concat(port));
});