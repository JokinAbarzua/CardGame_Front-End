import { useEffect, useState, useContext, createContext } from "react";
import { Alert, Col, Container, Row, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { errorHandler } from "../helpers/errorHandler";
import GameBoard from "./GameBoard";
import GameErrorModal from "./GameErrorModal";
import { Data, endGame, GameData, getGame, Player } from "./gameService";
import PointsCounter from "./PointsCounter";
import request from "axios"
import { GameContext } from "../context/GameContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { getCurrentUser } from "../User/userService";



export default function Game() {
    const location = useLocation();
    const [gameData, setGameData] = useState(location.state as GameData)
    const [requestError, setRequestError] = useState<string | undefined>(undefined)
    const currentPlayer:Player | undefined = gameData.game.players.find(player => player.user.username == getCurrentUser()?.username)

    useEffect(() => {
        const interval = setInterval(() => {
            refreshGame();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const refreshGame = async () => {
        if(gameData.game.state != "finished"){
            try {
                let gameNumber = localStorage.getItem("game")

                if (gameNumber != null) {
                    const res = await getGame(gameNumber)

                    if (res.status != 200) {
                        setRequestError(errorHandler(res));
                    } else {
                        const data = res.data as GameData
                        setGameData(data)
                        console.log(gameData);
                    }

                } else {
                    // error
                }
            } catch (error: unknown) {
                if (request.isAxiosError(error)) {
                    setRequestError(error.message)
                }
            }
        }
    }

    const handleEndGame = () => async (event: any) => {
        try{                                            
            const res = await endGame(gameData.game.number)
            if (res.status != 200) {
                setRequestError(errorHandler(res));
            } else {
                const data = res.data as GameData
                setGameData(data)                    
            }                                
        }catch (error: unknown) {
            if (request.isAxiosError(error)) {
                setRequestError(error.message)
            }
        }
    }

    function checkWinner(){
        if(gameData.game.points_us > gameData.game.points_them){
            return "El equipo ganador es \"nosotros\""
        }else{  
            if(gameData.game.points_us < gameData.game.points_them){
                return "El equipo ganador es \"ellos\""            
            }else{
                return "El resultado es un empate"
            }            
        }

    }

    function checkStatus(status: string) {
        switch (status) {
            case "waiting":
                return (<Alert variant="secondary" className="my-5 text-center">Faltan juadores para que comienze la partida</Alert>)
            case "started":
                return (
                    <Row>
                        <Col xs="10">
                            <GameBoard />
                        </Col>
                        <Col xs="2">
                            <PointsCounter />
                        </Col>
                    </Row>
                )
            default:
                return (<Alert variant="secondary" className="my-5 text-center">{checkWinner()}</Alert>)
        }
    }

    return (
        <GameContext.Provider value={{ gameData, requestError,setGameData, setRequestError }}>
            <Container className="mt-5 pt-4 flex-container ">
                <Row>
                    <Col xs={{ span: 4, offset: 4 }}>
                        <h2 className="text-center">{gameData.game.number}</h2>
                    </Col>
                    {currentPlayer?.role == "admin" ?
                    <Col xs={{ span: 2, offset: 2 }}>
                        <Button variant="danger" className="btn-block" onClick={(handleEndGame())}>Terminar Partida</Button>
                    </Col> : <></>}
                </Row>                

                <GameErrorModal errorMessage={requestError} setErrorMessage={setRequestError}/>

                {checkStatus(gameData.game.state)}
            </Container>
        </GameContext.Provider>
    )
}