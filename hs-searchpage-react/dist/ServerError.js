"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _ReportGmailerrorredOutlined = _interopRequireDefault(require("@mui/icons-material/ReportGmailerrorredOutlined"));
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ServerError = () => {
  return /*#__PURE__*/React.createElement(_Box.default, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(_ReportGmailerrorredOutlined.default, {
    fontSize: "large",
    sx: {
      mt: 5
    }
  }), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "subtitle1",
    sx: {
      mt: 2,
      fontSize: 25
    }
  }, "Oops, something went wrong!"), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "subtitle1"
  }, "Our server encountered an error and we were unable to complete your request. \n                We apologize for any inconvenience this may have caused."), /*#__PURE__*/React.createElement(_material.Typography, {
    variant: "subtitle1"
  }, "If the problem persists, please report ", /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: "https://help@hoppysearch.com/"
  }, "here"), " and include this \n                error message and any relevant details about the action you were attempting to perform."));
};
var _default = ServerError;
exports.default = _default;