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

var _require = require('../../config/vars'),
    secret = _require.secret;

var router = (0, _express.Router)();
router.use(function authCheck(req, res, next) {
  if (!req.user.email) {
    return res.sendStatus(401);
  }

  next();
});
router.post('/add', /*#__PURE__*/function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var instOrder, total_sum, foodList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.body.restoran_id) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'ресторан белгісіз'
            }));

          case 2:
            if (req.body.menu) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'мәзір белгісіз'
            }));

          case 4:
            if (req.body.date) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Күн белгісіз'
            }));

          case 6:
            if (req.body.table) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Стол белгісіз'
            }));

          case 8:
            if (req.body.count_guest) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.status(200).send({
              type: "error",
              msg: 'Адам саны белгісіз'
            }));

          case 10:
            _context2.prev = 10;
            _context2.next = 13;
            return _connectionAsmazirDB["default"].query('INSERT INTO `orders` SET ' + 'user_id=' + parseInt(req.user.user_id, 10) + ',' + 'restoran_id="' + req.body.restoran_id + '",' + 'date="' + req.body.date + '",' + '`table`="' + req.body.table + '",' + '`total_sum`=0,' + 'count_guest="' + req.body.count_guest + '"');

          case 13:
            instOrder = _context2.sent;
            //order food
            total_sum = 0;
            console.log(req.body.menu);
            foodList = JSON.parse(req.body.menu);
            foodList.forEach( /*#__PURE__*/function () {
              var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(element) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        total_sum += parseInt(element.price, 10);
                        _context.next = 3;
                        return _connectionAsmazirDB["default"].query('INSERT INTO `order_menu` SET ' + 'order_id=' + parseInt(instOrder.insertId, 10) + ',' + 'food_name="' + element.name + '",' + 'food_description="' + element.description + '",' + '`price`="' + element.price + '"');

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()); //update order total sum

            _context2.next = 20;
            return _connectionAsmazirDB["default"].query('UPDATE orders SET total_sum="' + total_sum + '" where id=' + instOrder.insertId);

          case 20:
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              msg: 'Тапсырыс қабылданды'
            }));

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](10);
            return _context2.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context2.t0.message
            }));

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[10, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/list', /*#__PURE__*/function () {
  var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT o.id,o.user_id,o.restoran_id,GROUP_CONCAT(f.food_name) as food_name,o.date,o.table,o.count_guest,o.total_sum,r.name as restoran_name FROM orders o LEFT JOIN order_menu f ON o.id = f.order_id LEFT JOIN restorans r ON o.restoran_id = r.place_id  WHERE user_id = "' + req.user.user_id + '" GROUP BY o.id');

          case 3:
            orders = _context3.sent;
            return _context3.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              orders: orders
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context3.t0.message,
              orders: []
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;