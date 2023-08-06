import { TicTacToeGame } from "./TicTacaToeGame";

async function startGame() {
    
    let game: TicTacToeGame = new TicTacToeGame();
    game.initializeGame();
    try {
        let winner = await game.startGame();
        console.log("Game winner is : "+winner);
    } catch(err){
        console.log(err);
    }
}

startGame()