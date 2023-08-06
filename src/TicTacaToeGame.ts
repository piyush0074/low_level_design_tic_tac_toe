import { Board } from "./Controller/Board";
import { FreeCell } from "./Controller/FreeCell";
import { PieceType } from "./Controller/PieceType";
import { Player } from "./Controller/Player";
import { PlayingPieceO } from "./Controller/PlayingPieceO";
import { PlayingPieceX } from "./Controller/PlayingPieceX";
import { QueueClass } from "./Queue";
import promptSync from 'prompt-sync';

export class TicTacToeGame {

    players: QueueClass<Player>;
    gameBoard: Board;

    initializeGame(): void {
        this.players = new QueueClass();

        let crossPiece: PlayingPieceX = new PlayingPieceX();
        let player1: Player = new Player("Player1", crossPiece);

        let noughtsPiece: PlayingPieceO = new PlayingPieceO();
        let player2: Player = new Player("Player2", noughtsPiece);

        this.players.enQueue(player1);
        this.players.enQueue(player2);

        this.gameBoard = new Board(3);
    }

    public startGame(): Promise<string> {
        return new Promise(async (resolve, reject) => {

            const prompt = promptSync();

            let noWinner: boolean = true;

            while (noWinner) {
                let playerTurn: Player | undefined = this.players.deQueue();

                if (!playerTurn) return reject('Error in Playing Turn');
                this.gameBoard.printBoard();
                let freeSpace: FreeCell[] = this.gameBoard.getFreeCells();

                if (freeSpace.length === 0) {
                    noWinner = false;
                    continue;
                }

                let input: string[] = [];
                let inputRow: number;
                let inputColumn: number;


                input = prompt("Player:" + playerTurn?.name + " Enter row,column: ").split(',');
                inputRow = Number(input[0]);
                inputColumn = Number(input[1]);

                let pieceAddedSuccessfully: boolean = this.gameBoard.addPiece(
                    inputRow,
                    inputColumn,
                    playerTurn?.playingPiece
                );

                if (!pieceAddedSuccessfully) {
                    console.log("Incorredt possition chosen, try again");
                    this.players.enQueue(playerTurn);
                    let player: Player = this.players.deQueue();
                    this.players.enQueue(player)
                    continue;
                }
                this.players.enQueue(playerTurn);

                let winner: boolean = this.isThereWinner(
                    inputRow,
                    inputColumn,
                    playerTurn.playingPiece.pieceType
                )
                if (winner) {
                    this.gameBoard.printBoard()
                    return resolve(playerTurn.name);
                }
            }
            return resolve('tie');
        })

    }

    isThereWinner(row: number, column: number, pieceType: PieceType): boolean {
        let rowMatch: boolean = true;
        let columnMatch: boolean = true;
        let diagonalMatch: boolean = true;
        let antiDiagonalMatch: boolean = true;


        for (let i = 0; i < this.gameBoard.size; i++) {

            if (
                this.gameBoard.board[row][i] == null ||
                this.gameBoard.board[row][i].pieceType != pieceType
            ) {
                rowMatch = false;
            }
        }

        for (let i = 0; i < this.gameBoard.size; i++) {

            if (
                this.gameBoard.board[i][column] == null ||
                this.gameBoard.board[i][column].pieceType != pieceType
            ) {
                columnMatch = false;
            }
        }

        for (let i = 0; i < this.gameBoard.size; i++) {
            if (
                this.gameBoard.board[i][i] == null ||
                this.gameBoard.board[i][i].pieceType != pieceType
            ) {
                diagonalMatch = false;
            }
        }

        for (let i = 0, j = this.gameBoard.size - 1; i < this.gameBoard.size; i++, j--) {
            if (
                this.gameBoard.board[i][j] == null ||
                this.gameBoard.board[i][j].pieceType != pieceType
            ) {
                antiDiagonalMatch = false;
            }
        }

        return rowMatch || columnMatch || diagonalMatch || antiDiagonalMatch;
    }
}