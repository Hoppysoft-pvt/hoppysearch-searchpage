"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _SentimentDissatisfiedTwoTone = _interopRequireDefault(require("@mui/icons-material/SentimentDissatisfiedTwoTone"));
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ResultNotFound = _ref => {
  let {
    searchText
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_SentimentDissatisfiedTwoTone.default, {
    fontSize: "large",
    sx: {
      mt: 5
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1",
    sx: {
      mt: 2,
      fontSize: 25
    }
  }, "Sorry! No result found for: ", /*#__PURE__*/_react.default.createElement("b", null, searchText)), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "subtitle1"
  }, "Please try using other words."));
};
var _default = ResultNotFound;
exports.default = _default;