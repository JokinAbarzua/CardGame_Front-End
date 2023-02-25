import { useGameContext } from "../context/GameContext";
import BoardFour from "./BoardFour";
import BoardSix from "./BoardSix";
import BoardTwo from "./BoardTwo";
import { GameData } from "./gameService";


export default function GameBoard() {    
    const gameContext = useGameContext()
    switch(gameContext.gameData.game.size){
        case 2:
            return (<BoardTwo/>)            
        case 4:
            return(<BoardFour/>)
        case 6:
            return(<BoardSix/>)             
        default:
            return(<div/>)
            
    }
};