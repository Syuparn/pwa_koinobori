import {GameBoard} from "./board";


export class GameBoardHandler {
    board: GameBoard;
    table: HTMLTableElement;
    succeededImg: SucceededImgHandler;

    constructor(table: HTMLTableElement, succeededImg: HTMLImageElement) {
        this.table = table;
        this.board = new GameBoard(table.rows.length, table.rows[0].cells.length);
        this.succeededImg = new SucceededImgHandler(succeededImg);
    }

    buildHouse() {
        let colIndex: number = Math.floor(Math.random() * this.board.nCol);
        this.board.buildHouse(colIndex);
        this.board.buildKoinobori(colIndex);
        this.board.buildKoinobori(1);
        this.board.buildKoinobori(1);
        this.updateTable();
        this.updateImg();
    }

    buildKoinobori() {

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