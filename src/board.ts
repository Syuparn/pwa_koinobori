import {Cell, EmptyCell, Koinobori, House} from "./cell";


export class GameBoard {
    // NOTE: order of rows is upside down(the larger, the upper)!
    cells: Cell[][];
    nRow: number;
    nCol: number;
    baseHeight: number;

    constructor(nRow: number, nCol: number) {
        this.nRow = nRow;
        this.nCol = nCol;
        this.cells = new Array<Cell[]>(nRow)
            .fill([]) // HACK: avoid reference copy
            .map(() => (new Array<Cell>(nCol).fill(new EmptyCell())));
            this.baseHeight = 0;
    }

    show(): string[][]{
        // NOTE: reverse() is mutable, so copy original one
        // [...arr] is same as [*arr] in Python
        return [...this.cells].reverse()
            .map((arr) => (arr.map((cell) => (cell.emoticon))));
    }

    buildKoinobori(colIndex: number) {
        this.buildCell(colIndex, new Koinobori());
    }

    buildHouse(colIndex: number) {
        this.buildCell(colIndex, new House());
    }

    koinoboriHeight(): number {
        let cellsHeight: number = this.cellsHeight(Koinobori);
        return cellsHeight == -1 ? 0 : this.baseHeight + cellsHeight;
    }

    houseHeight(): number {
        let cellsHeight: number = this.cellsHeight(House);
        return cellsHeight == -1 ? 0 : this.baseHeight + cellsHeight;
    }

    private buildCell(colIndex: number, cell: Cell) {
        let rowIndex: number | undefined = this.puttableRowIndex(colIndex, cell);
        if (rowIndex != undefined) {
            this.cells[rowIndex][colIndex] = cell;
        }
        this.raiseView();
    }

    private raiseView() {
        // if something in the highest row, shift cells downwards
        // HACK: arr.slice(-1)[0] is same as arr[-1] in Python
        if (this.cells.slice(-1)[0].some((cell) => (!cell.isEmpty))) {
            this.cells = this.cells.slice(1)
                .concat([Array<Cell>(this.nCol).fill(new EmptyCell())]);
            this.baseHeight++;
        }
    }

    private cellsHeight(className: Function): number {
        return this.cells.map(
            (row) => (row.some((cell) => (cell instanceof className)))
        ).lastIndexOf(true);
    }

    private puttableRowIndex(colIndex: number, newCell: Cell): number | undefined {
        let colCells: Cell[] = this.col(colIndex);
        if (newCell.canReplace(colCells[0])) {
            return 0;
        }
        for (let i = 1; i < colCells.length; i++) {
            if (newCell.canReplace(colCells[i]) && newCell.canPutOn(colCells[i - 1])) {
                return i;
            }
        }
        return undefined;
    }

    private col(colIndex: number): Cell[] {
        return this.cells.map((row) => (row[colIndex]));
    }
}
