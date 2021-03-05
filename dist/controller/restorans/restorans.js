"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _bluebird = require("bluebird");

var _express = require("express");

var _connectionAsmazirDB = _interopRequireDefault(require("../../services/connectionAsmazirDB.js"));

var _geolib = require("geolib");

var router = (0, _express.Router)();
router.post('/list', /*#__PURE__*/function () {
  var _ref = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var restoransList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT id,place_id,name,rating,lat,lng,formatted_address,table FROM restorans;');

          case 3:
            restoransList = _context.sent;
            return _context.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              restorans: restoransList
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context.t0.message,
              restorans: []
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/near', /*#__PURE__*/function () {
  var _ref2 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var restoransList, nearRestorans;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            restoransList = [];
            _context2.next = 4;
            return _connectionAsmazirDB["default"].query('SELECT id,place_id,name,rating,lat,lng,formatted_address,table FROM restorans;');

          case 4:
            restoransList = _context2.sent;

            if (!(restoransList.length > 0)) {
              _context2.next = 10;
              break;
            }

            nearRestorans = restoransList.filter(function (item) {
              var itemDistance = (0, _geolib.getDistance)({
                latitude: req.body.lat,
                longitude: req.body.lng
              }, {
                latitude: item.lat,
                longitude: item.lng
              });
              item.distance = itemDistance;
              return itemDistance <= 1500;
            });
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              restorans: nearRestorans
            }));

          case 10:
            return _context2.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              restorans: restoransList
            }));

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context2.t0.message,
              restorans: []
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/menu-list', /*#__PURE__*/function () {
  var _ref3 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var restoranMenuList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT id,`name`,description,price,restoran_id FROM restoran_menu WHERE restoran_id="' + req.body.place_id + '";');

          case 3:
            restoranMenuList = _context3.sent;
            return _context3.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              restoranMenu: restoranMenuList
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context3.t0.message,
              restoranMenu: []
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/orders-list', /*#__PURE__*/function () {
  var _ref4 = (0, _bluebird.coroutine)( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _connectionAsmazirDB["default"].query('SELECT o.id,o.user_id,o.restoran_id,GROUP_CONCAT(f.food_name) as food_name,r.name as restoran_name, CONCAT(u.name, " ", u.phone) as user,o.date,o.table,o.count_guest,o.total_sum FROM orders o ' + 'LEFT JOIN restorans r ON o.restoran_id = r.place_id ' + 'LEFT JOIN users u ON o.user_id = u.id ' + 'LEFT JOIN order_menu f ON o.id = f.order_id ' + 'WHERE restoran_id = "' + req.body.place_id + '" GROUP BY o.id');

          case 3:
            orders = _context4.sent;
            return _context4.abrupt("return", res.status(200).send({
              type: "ok",
              msg: "",
              orders: orders
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(401).send({
              type: "error",
              msg: _context4.t0.message,
              orders: []
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;