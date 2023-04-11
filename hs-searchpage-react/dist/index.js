"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-int.js");
var _material = require("@mui/material");
var _Search = _interopRequireDefault(require("@mui/icons-material/Search"));
var _react = _interopRequireWildcard(require("react"));
var _history = require("history");
var _axios = _interopRequireDefault(require("axios"));
var _ListItemTextWithHighlightedText = _interopRequireDefault(require("./ListItemTextWithHighlightedText"));
var _ResultNotFound = _interopRequireDefault(require("./ResultNotFound"));
var _ServerError = _interopRequireDefault(require("./ServerError"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const throwMandatoryAttributeError = (name, value) => {
  if (!value) throw new Error("".concat(name, " is a mandatory attribute for HSSearchPage"));
};
const HSSearchPage = _ref => {
  let {
    primaryText,
    secondaryText,
    targetURL,
    iconURL,
    apiKey,
    indexId,
    onTypeSearch
  } = _ref;
  // throw error
  throwMandatoryAttributeError("indexId", indexId);
  throwMandatoryAttributeError("apiKey", apiKey);
  throwMandatoryAttributeError("targetURL", targetURL);
  throwMandatoryAttributeError("primaryText", primaryText);

  // createBrowserHistory
  const history = (0, _history.createBrowserHistory)();

  // UseState
  const [searchText, setSearchText] = (0, _react.useState)('');
  const [searchResultDocuments, setSearchResultDocuments] = (0, _react.useState)([]);
  const [isSearchServerFailed, setIsSearchServerFailed] = (0, _react.useState)(false);
  const [searchPageController, setSearchPageController] = (0, _react.useState)({
    pageIndex: 0,
    pageSize: 10
  });
  const [totalSearchHitCount, setTotalSearchHitCount] = (0, _react.useState)(0);

  // function
  const handlePageChange = (event, newPage) => {
    setSearchPageController(_objectSpread(_objectSpread({}, searchPageController), {}, {
      pageIndex: newPage
    }));
  };
  const handleChangePageSize = event => {
    setSearchPageController(_objectSpread(_objectSpread({}, searchPageController), {}, {
      pageSize: parseInt(event.target.value, 10),
      pageIndex: 0
    }));
  };
  function debounce(callback, timeout) {
    var _this = this;
    let timer;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback.apply(_this, args);
      }, timeout);
    };
  }
  const handleSearchJsonData = searchText => {
    const simpleSearchEndpoint = searchText ? "https://".concat(indexId, ".hoppysearch.com/search?q=").concat(searchText, "&pageIndex=").concat(searchPageController.pageIndex, "&pageSize=").concat(searchPageController.pageSize) : "https://".concat(indexId, ".hoppysearch.com/search?pageIndex=").concat(searchPageController.pageIndex, "&pageSize=").concat(searchPageController.pageSize);
    _axios.default.get(simpleSearchEndpoint, {
      headers: {
        'Authorization': apiKey
      }
    }).then(response => {
      var _response$data, _response$data3, _response$data3$total;
      history.push("/search?q=".concat(searchText));
      if (response !== null && response !== void 0 && (_response$data = response.data) !== null && _response$data !== void 0 && _response$data.documents) {
        var _response$data2;
        setSearchResultDocuments(response === null || response === void 0 ? void 0 : (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.documents);
      } else {
        setSearchResultDocuments([]);
      }
      if (response !== null && response !== void 0 && (_response$data3 = response.data) !== null && _response$data3 !== void 0 && (_response$data3$total = _response$data3.totalHits) !== null && _response$data3$total !== void 0 && _response$data3$total.value) {
        var _response$data4, _response$data4$total;
        setTotalSearchHitCount(response === null || response === void 0 ? void 0 : (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : (_response$data4$total = _response$data4.totalHits) === null || _response$data4$total === void 0 ? void 0 : _response$data4$total.value);
      }
    }).catch(err => {
      console.log(err);
      setIsSearchServerFailed(true);
    });
  };

  // useCallback
  const handleSearchJsonDataOnType = (0, _react.useCallback)(debounce(searchText => handleSearchJsonData(searchText), 500), []);

  // useEffect
  (0, _react.useEffect)(() => {
    handleSearchJsonData(searchText);
  }, [searchPageController]);
  return /*#__PURE__*/_react.default.createElement(_material.Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    sx: {
      backgroundColor: "#ffffff",
      width: "80vw"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 11
  }, onTypeSearch ? /*#__PURE__*/_react.default.createElement(_material.TextField, {
    id: "outlined-full-width",
    label: "Search",
    placeholder: "Search",
    fullWidth: true,
    margin: "normal",
    value: searchText,
    onChange: e => setSearchText(e.target.value),
    InputLabelProps: {
      shrink: true
    },
    onKeyPress: event => {
      if (event.key === "Enter") {
        handleSearchJsonData(event.target.value);
      }
    },
    onKeyUp: event => handleSearchJsonDataOnType(event.target.value)
  }) : /*#__PURE__*/_react.default.createElement(_material.TextField, {
    id: "outlined-full-width",
    label: "Search",
    placeholder: "Search",
    fullWidth: true,
    margin: "normal",
    value: searchText,
    onChange: e => setSearchText(e.target.value),
    InputLabelProps: {
      shrink: true
    },
    onKeyPress: event => {
      if (event.key === "Enter") {
        handleSearchJsonData(event.target.value);
      }
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12,
    md: 1
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "outlined",
    style: {
      color: '#673ab7',
      height: 55,
      width: 80,
      borderColor: '#673ab7',
      marginTop: 17
    },
    onClick: () => handleSearchJsonData(searchText)
  }, /*#__PURE__*/_react.default.createElement(_Search.default, null))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 12
  }, isSearchServerFailed ? /*#__PURE__*/_react.default.createElement(_ServerError.default, null) : /*#__PURE__*/_react.default.createElement(_material.List, {
    sx: {
      width: '100%'
    }
  }, searchResultDocuments.length === 0 && /*#__PURE__*/_react.default.createElement(_ResultNotFound.default, {
    searchText: searchText
  }), searchResultDocuments.map((document, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: index
  }, /*#__PURE__*/_react.default.createElement(_material.ListItem, {
    button: true,
    component: _material.Link,
    href: document === null || document === void 0 ? void 0 : document[targetURL],
    sx: {
      '&:hover': {
        border: '2px solid #2196f3',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#e3f2fd',
        cursor: 'pointer'
      }
    }
  }, iconURL && /*#__PURE__*/_react.default.createElement(_material.ListItemAvatar, null, /*#__PURE__*/_react.default.createElement(_material.Avatar, {
    alt: document === null || document === void 0 ? void 0 : document[primaryText],
    src: document === null || document === void 0 ? void 0 : document[iconURL]
  })), /*#__PURE__*/_react.default.createElement(_ListItemTextWithHighlightedText.default, {
    primary: document === null || document === void 0 ? void 0 : document[primaryText],
    secondary: secondaryText ? document === null || document === void 0 ? void 0 : document[secondaryText] : "",
    highlightedWords: searchText.toLowerCase().split(" ")
  })), /*#__PURE__*/_react.default.createElement(_material.Divider, null)))), searchResultDocuments.length !== 0 && !isSearchServerFailed && /*#__PURE__*/_react.default.createElement(_material.TablePagination, {
    component: "div",
    onPageChange: handlePageChange,
    page: searchPageController.pageIndex,
    count: totalSearchHitCount,
    rowsPerPage: searchPageController.pageSize,
    onRowsPerPageChange: handleChangePageSize
  }))));
};
var _default = HSSearchPage;
exports.default = _default;