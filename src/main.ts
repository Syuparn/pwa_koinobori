import { GameBoardHandler } from "./board";

// HACK: solve module relation without webpack
export {};

let table: HTMLTableElement = <HTMLTableElement> document.getElementById('game_table');
if (table != null) {
    table.rows[1].cells[6].innerHTML = "s";
    let handler = new GameBoardHandler(table);
}