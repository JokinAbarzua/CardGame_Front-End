import { AxiosError } from "axios";
import request from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameData, GameSummary, getGame, listGames } from "./gameService";
import { RequestError } from "../User/userService"
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import "./customAccordion.css"
import { errorHandler } from "../helpers/errorHandler";

export default function ListGames() {
    const history = useNavigate()
    const [games, setGames] = useState<GameSummary | undefined>(undefined)
    const [requestError, setRequestError] = useState<string | undefined>(undefined)

    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        try {
            const res = await listGames()
            console.log("rtaRequest", res)
            if (res.status != 200) {
                setRequestError(errorHandler(res))
            } else {
                setGames(res.data as GameSummary)
            }
        } catch (error) {
            if (request.isAxiosError(error)) {
                error as AxiosError
                setRequestError(error.message)
            }
        }
    }

    const handleClick = (gameNumber: string) => async (event: any) => {
        localStorage.setItem("game", gameNumber)
        try {

            const res = await getGame(gameNumber)
            if (res.status == 200) {
                const data = res.data as GameData
                history('/game', { state: data })
            } else {
                let reqError = res.data as RequestError
                setRequestError(reqError.message)
            }
        } catch (error) {
            if (request.isAxiosError(error)) {
                setRequestError(error.message)
            }
        }

    }

    function checkState(state: string){
        switch(state){
            case "waiting":
                return <h5 className="badge" style={{ color: "#ffff00" }}>Esperando jugadores</h5>
            case "started":
                return <h5 className="badge" style={{ color: "#66ff33" }}>Comenzada</h5>
            default:
                return <h5 className="badge" style={{ color: "#dc3545" }}>Terminada</h5>
        }
    }

    function createList(gameList: GameSummary) {
        console.log("games", gameList)
        if (gameList.games.length == 0) {
            return (
                <h2 className="text-white">No tiene ninguna partida en curso</h2>
            )
        }
        let list
        list = gameList.games.map((item, index) => {
            let date = new Date(item.created_at)
            return (
                <Accordion.Item eventKey={index.toString(10)} >
                    <Accordion.Header >                        
                        <Col xs="auto">
                            <h3 className="text-sm-start">{item.number}</h3>
                        </Col>
                        <Col xs="auto">
                            {checkState(item.state)}
                        </Col>                        
                    </Accordion.Header>
                    <Accordion.Body className="bg-dark">
                        <Row>
                            <Col className="">
                                <h4 className="text-white">Tamaño: {item.size} jugadores</h4>
                                <h4 className="text-white">Puntaje: {item.points_us} - {item.points_them}</h4>
                            </Col>
                            <Col>
                                <h4 className="text-white">Fecha de Creacion: {date.toLocaleDateString()}</h4>
                                <Button onClick={handleClick(item.number)}>Reanudar</Button>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>)
        })
        return list
    }
    return (
        <Container className="mt-5 pt-5">
            <Container className="pt-3 px-4 py-4 bg-dark">
                {requestError != undefined && (
                    <Alert variant="danger">
                        {requestError}
                    </Alert>
                )}
                <Accordion flush className="bg-dark my-4 mx-4">
                    {games === undefined ? <></> : createList(games)}
                </Accordion>
            </Container>
        </Container>
    )
}
