import { PlayingPiece } from "./PlayingPiece";

export class Player{

    name: string;
    playingPiece: PlayingPiece;

    constructor(name: string, playingPiece: PlayingPiece) {
        this.name = name;
        // console.log(" ; ",playingPiece)
        this.playingPiece = playingPiece;
    }

    get playerName(): string{
        return this.name;
    }

    set playerName(name: string){
        this.name = name;
    }

    public get playerPlayingPiece(): PlayingPiece {
        return this.playingPiece;
    }

    set playerPlayingPiece(playingPiece: PlayingPiece) {
        this.playingPiece = playingPiece;
    }
}