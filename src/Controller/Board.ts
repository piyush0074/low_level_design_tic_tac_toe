import { FreeCell } from "./FreeCell";
import { PlayingPiece } from "./PlayingPiece";


export class Board {

    size: number;
    board: PlayingPiece[][] = [];

    constructor(size: number) {
        this.size = size;
        // this.board = new PlayingPiece[size][size];
        this.board = new Array(size)
            .fill(null)
            .map(() =>
                new Array(size).fill(null)
            );
    }

    addPiece(row: number, column: number, playingPiece: PlayingPiece): boolean {
        if (this.board[row][column] !== null) {
            return false;
        }
        this.board[row][column] = playingPiece;
        return true;
    }

    getFreeCells(): FreeCell[] {
        let freeCells: FreeCell[] = [];
        for (let row = 0; row < this.size; row++) {
            for (let column = 0; column < this.size; column++) {
                if (this.board[row][column] === null) freeCells.push({
                    row,
                    column
                })
            }
        }
        return freeCells;
    }

    printBoard(): void {
        for (let i = 0; i < this.size; i++) {
            let col: string = '';
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] != null) {
                   col += this.board[i][j].pieceType + " ";
                } else {
                    col += "  ";

                }
                col+= " | ";
            }
            console.log(col);
        }
    }
}