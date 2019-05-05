export class GameBoardHandler {
    board: GameBoard;
    table: HTMLTableElement;

    constructor(table: HTMLTableElement) {
        this.table = table;
        this.board = new GameBoard(table.rows.length, table.rows[0].cells.length);
    }
}

class GameBoard {
    cells: number[][];

    constructor(nRow: number, nCol: number) {
        this.cells = new Array<number[]>(nRow)
            .fill(new Array<number>(nCol).fill(0));
    }
}