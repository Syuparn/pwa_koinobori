import { GameBoardHandler, TimeHandler } from "./handler";


let table: HTMLTableElement | null = <HTMLTableElement> document.getElementById('game_table');
let succeededImg: HTMLImageElement | null = <HTMLImageElement> document.getElementById('succeededlogo');
let timeElem: HTMLSpanElement | null = <HTMLSpanElement> document.getElementById('leftseconds');
let heightElem: HTMLSpanElement | null = <HTMLSpanElement> document.getElementById('koinoboriheight');


if ([table, succeededImg, timeElem, heightElem].every((v) => (v != null))) {
    // time in the game
    let timeHandler = new TimeHandler(timeElem);
    // cells with houses and koinoboris
    let boardHandler = new GameBoardHandler(table, succeededImg);
    // time speed changes depending on the board conditions
    timeHandler.startCheck(boardHandler.board, boardHandler.succeededImg);
    // put addEventListener to each cell in the game table
    let cells: HTMLCollectionOf<HTMLTableDataCellElement> = document.getElementsByTagName('td');
    boardHandler.addClicker(cells, heightElem, timeHandler.time);
    // run CPU, which builds houses randomly
    boardHandler.startHouseCPU(heightElem, timeHandler.time);
}