"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vars = require("../config/vars.js");

var mariadb = require('mariadb/callback');

var _require = require('util'),
    promisify = _require.promisify;

var db = mariadb.createConnection({
  host: _vars.asmazirDB.host,
  user: _vars.asmazirDB.user,
  database: _vars.asmazirDB.database,
  password: _vars.asmazirDB.password
});
db.connect(function (err) {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected ! connection id is " + conn.threadId);
  }
});
db.query = promisify(db.query);
var _default = db;
exports["default"] = _default;