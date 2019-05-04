import { GameBoardHandler } from "./board";

// HACK: solve module relation without webpack
export {};

let table: HTMLTableElement = <HTMLTableElement> document.getElementById('game_table');
if (table != null) {
    
    console.log(table.rows[0]);
    console.log(table.rows[0].cells[2]);
    console.log(table.rows.length);
    console.log(table.rows[0].cells.length);
    table.rows[1].cells[6].innerHTML = "s";
}