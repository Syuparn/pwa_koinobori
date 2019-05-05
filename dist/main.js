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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cell_1 = __webpack_require__(/*! ./cell */ \"./src/cell.ts\");\r\nclass GameBoard {\r\n    constructor(nRow, nCol) {\r\n        this.nRow = nRow;\r\n        this.nCol = nCol;\r\n        this.cells = new Array(nRow)\r\n            .fill([]) // HACK: avoid reference copy\r\n            .map(() => (new Array(nCol).fill(new cell_1.EmptyCell())));\r\n        this.baseHeight = 0;\r\n    }\r\n    show() {\r\n        // NOTE: reverse() is mutable, so copy original one\r\n        // [...arr] is same as [*arr] in Python\r\n        return [...this.cells].reverse()\r\n            .map((arr) => (arr.map((cell) => (cell.emoticon))));\r\n    }\r\n    buildKoinobori(colIndex) {\r\n        this.buildCell(colIndex, new cell_1.Koinobori());\r\n    }\r\n    buildHouse(colIndex) {\r\n        this.buildCell(colIndex, new cell_1.House());\r\n    }\r\n    koinoboriHeight() {\r\n        let cellsHeight = this.cellsHeight(cell_1.Koinobori);\r\n        return cellsHeight == -1 ? 0 : this.baseHeight + cellsHeight;\r\n    }\r\n    houseHeight() {\r\n        let cellsHeight = this.cellsHeight(cell_1.House);\r\n        return cellsHeight == -1 ? 0 : this.baseHeight + cellsHeight;\r\n    }\r\n    buildCell(colIndex, cell) {\r\n        let rowIndex = this.puttableRowIndex(colIndex, cell);\r\n        if (rowIndex != undefined) {\r\n            this.cells[rowIndex][colIndex] = cell;\r\n        }\r\n        this.raiseView();\r\n    }\r\n    raiseView() {\r\n        // if something in the highest row, shift cells downwards\r\n        // HACK: arr.slice(-1)[0] is same as arr[-1] in Python\r\n        if (this.cells.slice(-1)[0].some((cell) => (!cell.isEmpty))) {\r\n            this.cells = this.cells.slice(1)\r\n                .concat([Array(this.nCol).fill(new cell_1.EmptyCell())]);\r\n            this.baseHeight++;\r\n        }\r\n    }\r\n    cellsHeight(className) {\r\n        return this.cells.map((row) => (row.some((cell) => (cell instanceof className)))).lastIndexOf(true);\r\n    }\r\n    puttableRowIndex(colIndex, newCell) {\r\n        let colCells = this.col(colIndex);\r\n        if (newCell.canReplace(colCells[0])) {\r\n            return 0;\r\n        }\r\n        for (let i = 1; i < colCells.length; i++) {\r\n            if (newCell.canReplace(colCells[i]) && newCell.canPutOn(colCells[i - 1])) {\r\n                return i;\r\n            }\r\n        }\r\n        return undefined;\r\n    }\r\n    col(colIndex) {\r\n        return this.cells.map((row) => (row[colIndex]));\r\n    }\r\n}\r\nexports.GameBoard = GameBoard;\r\n\n\n//# sourceURL=webpack:///./src/board.ts?");

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

/***/ "./src/clocktime.ts":
/*!**************************!*\
  !*** ./src/clocktime.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass ClockTime {\r\n    constructor() {\r\n        this.intervalMS = 200;\r\n        this.timeMS = 55 * 1000;\r\n        this.speed = 1;\r\n    }\r\n    toString() {\r\n        return (this.timeMS / 1000).toFixed(1);\r\n    }\r\n    left() {\r\n        return this.timeMS > 0;\r\n    }\r\n    tick(writeTo) {\r\n        setTimeout(() => {\r\n            if (this.timeMS > 0) {\r\n                this.timeMS -= this.intervalMS * this.speed;\r\n                console.log(this.speed);\r\n                writeTo.innerHTML = this.toString();\r\n                this.tick(writeTo);\r\n            }\r\n            else {\r\n                this.timeMS = 0;\r\n                writeTo.innerHTML = this.toString();\r\n            }\r\n        }, this.intervalMS);\r\n    }\r\n}\r\nexports.ClockTime = ClockTime;\r\n\n\n//# sourceURL=webpack:///./src/clocktime.ts?");

/***/ }),

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst board_1 = __webpack_require__(/*! ./board */ \"./src/board.ts\");\r\nconst clocktime_1 = __webpack_require__(/*! ./clocktime */ \"./src/clocktime.ts\");\r\nclass GameBoardHandler {\r\n    constructor(table, succeededImg) {\r\n        this.table = table;\r\n        this.nRow = table.rows.length;\r\n        this.nCol = table.rows[0].cells.length;\r\n        this.board = new board_1.GameBoard(this.nRow, this.nCol);\r\n        this.succeededImg = new SucceededImgHandler(succeededImg);\r\n    }\r\n    addClicker(cells, heightElem, clockTime) {\r\n        // NOTE: [].forEace.call(arrLike, f) works like arr.forEach\r\n        [].forEach.call(cells, (cell, i) => {\r\n            cell.addEventListener('click', () => {\r\n                if (clockTime.left()) {\r\n                    let colIndex = i % this.nRow;\r\n                    this.buildKoinobori(colIndex);\r\n                    this.writeHeight(heightElem);\r\n                }\r\n            });\r\n        });\r\n    }\r\n    startHouseCPU(heightElem, clockTime) {\r\n        const maxIntervalMS = 500;\r\n        setTimeout(() => {\r\n            if (clockTime.left()) {\r\n                this.buildHouse();\r\n                this.writeHeight(heightElem);\r\n                this.startHouseCPU(heightElem, clockTime);\r\n            }\r\n        }, Math.random() * maxIntervalMS);\r\n    }\r\n    buildHouse(colIndex = undefined) {\r\n        if (colIndex == undefined) {\r\n            colIndex = Math.floor(Math.random() * this.board.nCol);\r\n        }\r\n        this.board.buildHouse(colIndex);\r\n        this.updateTable();\r\n        this.updateImg();\r\n    }\r\n    buildKoinobori(colIndex) {\r\n        this.board.buildKoinobori(colIndex);\r\n        this.updateTable();\r\n        this.updateImg();\r\n    }\r\n    updateImg() {\r\n        this.succeededImg.switchVisibility(this.board.koinoboriHeight() > this.board.houseHeight());\r\n    }\r\n    updateTable() {\r\n        this.board.show().forEach((row, rowIndex) => {\r\n            row.forEach((char, colIndex) => {\r\n                this.table.rows[rowIndex].cells[colIndex].innerHTML = char;\r\n            });\r\n        });\r\n    }\r\n    writeHeight(heightElem) {\r\n        heightElem.innerHTML = (this.board.koinoboriHeight() * 10).toString();\r\n    }\r\n}\r\nexports.GameBoardHandler = GameBoardHandler;\r\nclass SucceededImgHandler {\r\n    constructor(img) {\r\n        this.img = img;\r\n        this.visible = false;\r\n    }\r\n    switchVisibility(visible) {\r\n        this.img.style.opacity = visible ? \"1\" : \"0\";\r\n        this.visible = visible;\r\n    }\r\n}\r\nclass TimeHandler {\r\n    constructor(viewElem) {\r\n        this.checkIntervalMS = 1000;\r\n        this.viewElem = viewElem;\r\n        this.time = new clocktime_1.ClockTime();\r\n        this.time.tick(this.viewElem);\r\n    }\r\n    startCheck(board, succeededImgHandler) {\r\n        setTimeout(() => {\r\n            if (this.time.left()) {\r\n                this.changeSpeed(board, succeededImgHandler);\r\n                this.startCheck(board, succeededImgHandler);\r\n            }\r\n        }, this.checkIntervalMS);\r\n    }\r\n    changeSpeed(board, succeededImgHandler) {\r\n        if (succeededImgHandler.visible) {\r\n            this.time.speed = Math.max(this.time.speed - 1, 1);\r\n        }\r\n        if (board.koinoboriHeight() <= board.baseHeight) {\r\n            this.time.speed++;\r\n        }\r\n    }\r\n}\r\nexports.TimeHandler = TimeHandler;\r\n\n\n//# sourceURL=webpack:///./src/handler.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst handler_1 = __webpack_require__(/*! ./handler */ \"./src/handler.ts\");\r\nlet table = document.getElementById('game_table');\r\nlet succeededImg = document.getElementById('succeededlogo');\r\nlet timeElem = document.getElementById('leftseconds');\r\nlet heightElem = document.getElementById('koinoboriheight');\r\nif ([table, succeededImg, timeElem, heightElem].every((v) => (v != null))) {\r\n    // time in the game\r\n    let timeHandler = new handler_1.TimeHandler(timeElem);\r\n    // cells with houses and koinoboris\r\n    let boardHandler = new handler_1.GameBoardHandler(table, succeededImg);\r\n    // time speed changes depending on the board conditions\r\n    timeHandler.startCheck(boardHandler.board, boardHandler.succeededImg);\r\n    // put addEventListener to each cell in the game table\r\n    let cells = document.getElementsByTagName('td');\r\n    boardHandler.addClicker(cells, heightElem, timeHandler.time);\r\n    // run CPU, which builds houses randomly\r\n    boardHandler.startHouseCPU(heightElem, timeHandler.time);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });