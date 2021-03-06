"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bluebird = require("bluebird");

var _express = require("express");

var _connectionAsmazirDB = _interopRequireDefault(require("../../services/connectionAsmazirDB"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _require = require('../../config/vars'),
    secret = _require.secret;

var router = (0, _express.Router)();
router.post('/signin', /*#__PURE__*/function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT id,phone,name,email,password FROM users WHERE email="' + req.body.email + '"');

          case 3:
            data = _context.sent;

            if (!(data.length > 0)) {
              _context.next = 13;
              break;
            }

            if (!(req.body.password != data[0].password)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(200).send({
              type: 'error',
              token: "",
              user_id: 0,
              msg: 'Құпия сөз дұрыс емес'
            }));

          case 9:
            token = _jsonwebtoken["default"].sign({
              user_id: parseInt(data[0].id),
              email: data[0].email,
              phone: data[0].phone,
              name: data[0].name
            }, secret, {
              expiresIn: '1d'
            });
            return _context.abrupt("return", res.json({
              type: 'ok',
              token: token,
              user_id: parseInt(data[0].id),
              msg: ""
            }));

          case 11:
            _context.next = 14;
            break;

          case 13:
            return _context.abrupt("return", res.status(200).send({
              type: 'error',
              token: "",
              user_id: 0,
              msg: 'Қолданушы табылмады'
            }));

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(200).send({
              type: "error",
              token: "",
              user_id: 0,
              msg: _context.t0.message
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/signup', /*#__PURE__*/function () {
  var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var instUser, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body.email) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              user_id: "",
              msg: 'E-mail толтырылған жоқ',
              token: ""
            }));

          case 2:
            if (req.body.password) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              user_id: "",
              msg: 'Құпия сөз толтырылған жоқ',
              token: ""
            }));

          case 4:
            if (req.body.name) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              user_id: "",
              msg: 'Есіміңіз толтырылған жоқ',
              token: ""
            }));

          case 6:
            if (req.body.phone) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              user_id: "",
              msg: 'Тел. нөміріңіз толтырылған жоқ',
              token: ""
            }));

          case 8:
            _context2.prev = 8;
            _context2.next = 11;
            return _connectionAsmazirDB["default"].query('INSERT INTO users (email,password,name,phone) values ("' + req.body.email + '","' + req.body.password + '",' + '"' + req.body.name + '","' + req.body.phone + '")');

          case 11:
            instUser = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              user_id: instUser.insertId,
              email: req.body.email,
              phone: req.body.phone,
              name: req.body.name
            }, secret, {
              expiresIn: '1d'
            });
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              user_id: instUser.insertId,
              msg: 'Қолданушы тіркелді',
              token: token
            }));

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](8);
            return _context2.abrupt("return", res.status(401).send({
              type: "error",
              user_id: "",
              msg: _context2.t0.message,
              token: ""
            }));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 16]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;