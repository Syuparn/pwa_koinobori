import { GameBoardHandler } from "./handler";


// HACK: solve module relation without webpack
export {};

let table: HTMLTableElement = <HTMLTableElement> document.getElementById('game_table');
let succeededImg: HTMLImageElement = <HTMLImageElement> document.getElementById('succeededlogo');
if (table != null) {
    let handler = new GameBoardHandler(table, succeededImg);
    handler.buildHouse();
}