import { PieceType } from "./PieceType";
import { PlayingPiece } from "./PlayingPiece";


export class PlayingPieceX extends PlayingPiece {
    
    constructor() {
        super(PieceType.X);
    }
}