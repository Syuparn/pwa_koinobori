export interface Cell {
    readonly emoticon: string;
    readonly isEmpty: boolean;
    canPutOn(cell: Cell): boolean;
    canReplace(cell: Cell): boolean;
}


export class Koinobori implements Cell {
    emoticon: string;
    isEmpty: boolean;

    constructor() {
        this.emoticon = "🎏";
        this.isEmpty = false;
    }

    canPutOn(cell: Cell) {
        return cell instanceof Koinobori || cell instanceof House;
    }

    canReplace(cell: Cell) {
        return cell.isEmpty;
    }
}


export class House implements Cell {
    emoticon: string;
    isEmpty: boolean;

    constructor() {
        let candidates: string[] = [
            "🏘", "🏚", "🏛", "🏟", "💒", "🏠", "🏡", "🏢", "🏣", "🏤",
            "🏥", "🏦", "🏨", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰"
        ];
        this.emoticon = candidates[Math.floor(Math.random() * candidates.length)];
        this.isEmpty = false;
    }

    canPutOn(cell: Cell) {
        return cell instanceof House;
    }

    canReplace(cell: Cell) {
        return cell.isEmpty || cell instanceof Koinobori;
    }
}

export class EmptyCell implements Cell {
    emoticon: string;
    isEmpty: boolean;

    constructor() {
        this.emoticon = "　";
        this.isEmpty = true;
    }

    canPutOn(cell: Cell) {
        return true;
    }

    canReplace(cell: Cell) {
        return false;
    }
}