import {GameBoard} from "./board";
import {ClockTime} from "./clocktime";

export class GameBoardHandler {
    nRow: number;
    nCol: number;
    board: GameBoard;
    table: HTMLTableElement;
    succeededImg: SucceededImgHandler;
    buildable: boolean;
    readonly buildIntervalMS: number = 300;

    constructor(table: HTMLTableElement, succeededImg: HTMLImageElement) {
        this.table = table;
        this.nRow = table.rows.length;
        this.nCol = table.rows[0].cells.length
        this.board = new GameBoard(this.nRow, this.nCol);
        this.succeededImg = new SucceededImgHandler(succeededImg);
        this.buildable = true;
    }

    addClicker(cells: HTMLCollectionOf<HTMLTableDataCellElement>, heightElem: HTMLSpanElement, clockTime: ClockTime) {
        // NOTE: [].forEace.call(arrLike, f) works like arr.forEach
        [].forEach.call(cells, (cell: HTMLTableDataCellElement, i: number) => {
            cell.addEventListener('click', () => {
                if (clockTime.left() && this.buildable) {
                    let colIndex: number = i % this.nRow;
                    this.buildKoinobori(colIndex);
                    this.writeHeight(heightElem);
                }
            });
        });
    }

    startHouseCPU(heightElem: HTMLSpanElement, clockTime: ClockTime) {
        const maxIntervalMS: number = 500;
        let height: number = this.board.koinoboriHeight();
        let maxLoop: number = 10 + Math.floor(height / 50);
        let intervalMS: number = Math.random() * maxIntervalMS;
        setTimeout(() => {
            if (clockTime.left()) {
                let loopNum: number = Math.min(200 / (intervalMS + 1) + 1, 10);
                for (let i: number = 0; i < loopNum; i++){
                    this.buildHouse();
                    this.writeHeight(heightElem);
                }

                if (height > this.board.houseHeight() + 5) {
                    let colIndex = this.nCol * Math.random();
                    for (let i: number = 0; i < (height - this.board.houseHeight()) * Math.random() * 3; i++) {
                        this.buildHouse(colIndex);
                        this.writeHeight(heightElem);
                    }
                }
                this.startHouseCPU(heightElem, clockTime);
            }
        }, Math.max(intervalMS, 200));
    }

    buildHouse(colIndex: number | undefined = undefined) {
        if (colIndex == undefined) {
            colIndex = Math.floor(Math.random() * this.board.nCol);
        }
        this.board.buildHouse(colIndex);
        this.updateTable();
        this.updateImg();
    }

    buildKoinobori(colIndex: number) {
        this.board.buildKoinobori(colIndex);
        this.updateTable();
        this.updateImg();
        this.buildable = false;
        setTimeout(() => {
            this.buildable = true;
        }, this.buildIntervalMS);
    }

    private updateImg() {
        this.succeededImg.switchVisibility(
            this.board.koinoboriHeight() > this.board.houseHeight()
        );
    }

    private updateTable() {
        this.board.show().forEach((row, rowIndex) => {
            row.forEach((char, colIndex) => {
                this.table.rows[rowIndex].cells[colIndex].innerHTML = char;
            })
        });
    }

    private writeHeight(heightElem: HTMLSpanElement) {
        heightElem.innerHTML = (this.board.koinoboriHeight() * 10).toString();        
    }
}


class SucceededImgHandler {
    img: HTMLImageElement;
    visible: boolean;

    constructor(img: HTMLImageElement) {
        this.img = img;
        this.visible = false;
    }

    switchVisibility(visible: boolean) {
        this.img.style.opacity = visible ? "1" : "0";
        this.visible = visible;
    }
}


export class TimeHandler {
    time: ClockTime;
    viewElem: HTMLElement;
    readonly checkIntervalMS: number = 1000;

    constructor(viewElem: HTMLElement) {
        this.viewElem = viewElem;
        this.time = new ClockTime();
        this.time.tick(this.viewElem);
    }

    startCheck(board: GameBoard, succeededImgHandler: SucceededImgHandler) {
        setTimeout(() => {
            if (this.time.left()) {
                this.changeSpeed(board, succeededImgHandler);
                this.startCheck(board, succeededImgHandler);
            }
        }, this.checkIntervalMS);
    }

    private changeSpeed(board: GameBoard, succeededImgHandler: SucceededImgHandler) {
        if (succeededImgHandler.visible) {
            this.time.speed = Math.max(this.time.speed - 1, 1);
        }
        if (board.koinoboriHeight() <= board.baseHeight) {
            this.time.speed += 3;
        }
    }
}