"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.split.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ListItemTextWithHighlightedText = _ref => {
  let {
    primary,
    secondary,
    highlightedWords
  } = _ref;
  const highlightText = text => {
    if (!text) {
      text = "";
    }
    const regex = new RegExp("(".concat(highlightedWords.join("|"), ")"), "gi");
    const parts = text.split(regex);
    return parts.map((part, i) => highlightedWords.includes(part.toLowerCase()) ? /*#__PURE__*/_react.default.createElement("span", {
      key: i,
      style: {
        color: "#3f51b5",
        fontWeight: "bold"
      }
    }, part) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: i
    }, part));
  };
  return /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
    primary: highlightText(primary),
    secondary: highlightText(secondary)
  });
};
var _default = ListItemTextWithHighlightedText;
exports.default = _default;