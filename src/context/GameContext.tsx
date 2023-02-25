import React, { createContext, useContext, useState } from "react";
import { GameData } from "../Game/gameService";

interface GameContextProps {
    gameData: GameData
    requestError: string | undefined
    setGameData: React.Dispatch<React.SetStateAction<GameData>>
    setRequestError: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const GameContext = createContext<GameContextProps | null>(null);

export const useGameContext = () => {
    const gameContext = useContext(GameContext)

    if(!gameContext){
        throw new Error(
            "Error: null game context, it has to ve used with <GameContext.Provider>"
        ); 
    }

    return gameContext
}


