import {GameBoard} from "./board";


export class GameBoardHandler {
    nRow: number;
    nCol: number;
    board: GameBoard;
    table: HTMLTableElement;
    succeededImg: SucceededImgHandler;

    constructor(table: HTMLTableElement, succeededImg: HTMLImageElement) {
        this.table = table;
        this.nRow = table.rows.length;
        this.nCol = table.rows[0].cells.length
        this.board = new GameBoard(this.nRow, this.nCol);
        this.succeededImg = new SucceededImgHandler(succeededImg);
    }

    addClicker(cells: HTMLCollectionOf<HTMLTableDataCellElement>) {
        // NOTE: [].forEace.call(arrLike, f) works like arr.forEach
        [].forEach.call(cells, (cell: HTMLTableDataCellElement, i: number) => {
            cell.addEventListener('click', () => {
                let colIndex: number = i % this.nRow;
                this.buildKoinobori(colIndex);
            });
        });
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
}


class SucceededImgHandler {
    img: HTMLImageElement;

    constructor(img: HTMLImageElement) {
        this.img = img;
    }

    switchVisibility(visible: boolean) {
        this.img.style.opacity = visible ? "1" : "0";
    }
}