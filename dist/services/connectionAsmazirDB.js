"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vars = require("../config/vars.js");

var mariadb = require('mariadb/callback');

var util = require('util');

var db = mariadb.createConnection({
  host: _vars.asmazirPsDB.host,
  user: _vars.asmazirPsDB.user,
  password: _vars.asmazirPsDB.password,
  database: _vars.asmazirPsDB.database
}); // connect to database

db.connect(function (err) {
  if (err) {
    console.log('error mariadb connect', err);
    return err;
  }

  console.log('asmazir db connected');
});
db.query = util.promisify(db.query);
var _default = db;
exports["default"] = _default;