"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bluebird = require("bluebird");

var _express = require("express");

var _connectionAsmazirDB = _interopRequireDefault(require("../../services/connectionAsmazirDB"));

var router = (0, _express.Router)();
router.use(function authCheck(req, res, next) {
  if (!req.user.email) {
    return res.sendStatus(401);
  }

  next();
});
router.post('/userinfo', /*#__PURE__*/function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT id,phone,name,email,password FROM users WHERE email="' + req.user.user_id + '"');

          case 3:
            data = _context.sent;

            if (!(data.length > 0)) {
              _context.next = 9;
              break;
            }

            user = {
              email: data[0].email,
              phone: data[0].phone,
              name: data[0].name
            };
            return _context.abrupt("return", res.json({
              type: 'ok',
              msg: "",
              user: user
            }));

          case 9:
            return _context.abrupt("return", res.status(200).send({
              type: 'error',
              msg: 'Қолданушы табылмады',
              user: {}
            }));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(200).send({
              type: "error",
              msg: _context.t0.message,
              user_id: {}
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());