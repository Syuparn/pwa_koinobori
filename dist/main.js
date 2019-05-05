/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cell_1 = __webpack_require__(/*! ./cell */ \"./src/cell.ts\");\r\nclass GameBoard {\r\n    constructor(nRow, nCol) {\r\n        this.nRow = nRow;\r\n        this.nCol = nCol;\r\n        this.cells = new Array(nRow)\r\n            .fill([]) // HACK: avoid reference copy\r\n            .map(() => (new Array(nCol).fill(new cell_1.EmptyCell())));\r\n        this.baseHeight = 0;\r\n    }\r\n    show() {\r\n        // NOTE: reverse() is mutable, so copy original one\r\n        // [...arr] is same as [*arr] in Python\r\n        return [...this.cells].reverse()\r\n            .map((arr) => (arr.map((cell) => (cell.emoticon))));\r\n    }\r\n    buildKoinobori(colIndex) {\r\n        this.buildCell(colIndex, new cell_1.Koinobori());\r\n    }\r\n    buildHouse(colIndex) {\r\n        this.buildCell(colIndex, new cell_1.House());\r\n    }\r\n    koinoboriHeight() {\r\n        return this.baseHeight + this.cellsHeight(cell_1.Koinobori);\r\n    }\r\n    houseHeight() {\r\n        return this.baseHeight + this.cellsHeight(cell_1.House);\r\n    }\r\n    buildCell(colIndex, cell) {\r\n        let rowIndex = this.puttableRowIndex(colIndex, cell);\r\n        if (rowIndex != undefined) {\r\n            this.cells[rowIndex][colIndex] = cell;\r\n        }\r\n        this.raiseView();\r\n    }\r\n    raiseView() {\r\n        // if something in the highest row, shift cells downwards\r\n        // HACK: arr.slice(-1)[0] is same as arr[-1] in Python\r\n        if (this.cells.slice(-1)[0].some((cell) => (!cell.isEmpty))) {\r\n            this.cells = this.cells.slice(1)\r\n                .concat([Array(this.nCol).fill(new cell_1.EmptyCell())]);\r\n        }\r\n    }\r\n    cellsHeight(className) {\r\n        return this.cells.map((row) => (row.some((cell) => (cell instanceof className)))).lastIndexOf(true);\r\n    }\r\n    puttableRowIndex(colIndex, newCell) {\r\n        let colCells = this.col(colIndex);\r\n        if (newCell.canReplace(colCells[0])) {\r\n            return 0;\r\n        }\r\n        for (let i = 1; i < colCells.length; i++) {\r\n            if (newCell.canReplace(colCells[i]) && newCell.canPutOn(colCells[i - 1])) {\r\n                return i;\r\n            }\r\n        }\r\n        return undefined;\r\n    }\r\n    col(colIndex) {\r\n        return this.cells.map((row) => (row[colIndex]));\r\n    }\r\n}\r\nexports.GameBoard = GameBoard;\r\n\n\n//# sourceURL=webpack:///./src/board.ts?");

/***/ }),

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Koinobori {\r\n    constructor() {\r\n        this.emoticon = \"🎏\";\r\n        this.isEmpty = false;\r\n    }\r\n    canPutOn(cell) {\r\n        return cell instanceof Koinobori || cell instanceof House;\r\n    }\r\n    canReplace(cell) {\r\n        return cell.isEmpty;\r\n    }\r\n}\r\nexports.Koinobori = Koinobori;\r\nclass House {\r\n    constructor() {\r\n        let candidates = [\r\n            \"🏘\", \"🏚\", \"🏛\", \"🏟\", \"💒\", \"🏠\", \"🏡\", \"🏢\", \"🏣\", \"🏤\",\r\n            \"🏥\", \"🏦\", \"🏨\", \"🏪\", \"🏫\", \"🏬\", \"🏭\", \"🏯\", \"🏰\"\r\n        ];\r\n        this.emoticon = candidates[Math.floor(Math.random() * candidates.length)];\r\n        this.isEmpty = false;\r\n    }\r\n    canPutOn(cell) {\r\n        return cell instanceof House;\r\n    }\r\n    canReplace(cell) {\r\n        return cell.isEmpty || cell instanceof Koinobori;\r\n    }\r\n}\r\nexports.House = House;\r\nclass EmptyCell {\r\n    constructor() {\r\n        this.emoticon = \"　\";\r\n        this.isEmpty = true;\r\n    }\r\n    canPutOn(cell) {\r\n        return true;\r\n    }\r\n    canReplace(cell) {\r\n        return false;\r\n    }\r\n}\r\nexports.EmptyCell = EmptyCell;\r\n\n\n//# sourceURL=webpack:///./src/cell.ts?");

/***/ }),

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst board_1 = __webpack_require__(/*! ./board */ \"./src/board.ts\");\r\nclass GameBoardHandler {\r\n    constructor(table, succeededImg) {\r\n        this.table = table;\r\n        this.board = new board_1.GameBoard(table.rows.length, table.rows[0].cells.length);\r\n        this.succeededImg = new SucceededImgHandler(succeededImg);\r\n    }\r\n    buildHouse() {\r\n        let colIndex = Math.floor(Math.random() * this.board.nCol);\r\n        this.board.buildHouse(colIndex);\r\n        this.board.buildKoinobori(colIndex);\r\n        this.board.buildKoinobori(1);\r\n        this.board.buildKoinobori(1);\r\n        this.updateTable();\r\n        this.updateImg();\r\n    }\r\n    buildKoinobori() {\r\n    }\r\n    updateImg() {\r\n        this.succeededImg.switchVisibility(this.board.koinoboriHeight() > this.board.houseHeight());\r\n    }\r\n    updateTable() {\r\n        this.board.show().forEach((row, rowIndex) => {\r\n            row.forEach((char, colIndex) => {\r\n                this.table.rows[rowIndex].cells[colIndex].innerHTML = char;\r\n            });\r\n        });\r\n    }\r\n}\r\nexports.GameBoardHandler = GameBoardHandler;\r\nclass SucceededImgHandler {\r\n    constructor(img) {\r\n        this.img = img;\r\n    }\r\n    switchVisibility(visible) {\r\n        this.img.style.opacity = visible ? \"1\" : \"0\";\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/handler.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst handler_1 = __webpack_require__(/*! ./handler */ \"./src/handler.ts\");\r\nlet table = document.getElementById('game_table');\r\nlet succeededImg = document.getElementById('succeededlogo');\r\nif (table != null) {\r\n    let handler = new handler_1.GameBoardHandler(table, succeededImg);\r\n    handler.buildHouse();\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });