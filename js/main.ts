let table: HTMLTableElement = <HTMLTableElement> document.getElementById('game_table');
if (table != null) {
    
    console.log(table.rows[0]);
    console.log(table.rows[0].cells[2]);
    table.rows[1].cells[6].innerHTML = "s";
}