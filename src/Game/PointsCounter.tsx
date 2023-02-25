import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { addPoint,removePoint, GameData, Player } from "./gameService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { getCurrentUser, RequestError } from "../User/userService";
import { useGameContext } from "../context/GameContext";
import request from "axios";


export default function PointCounter(){
    const gameContext = useGameContext()
    const currentPlayer:Player | undefined = gameContext.gameData.game.players.find(player => player.user.username == getCurrentUser()?.username)

    const handleAddPoints = (team: string) => async (event: any) => {
        try{            
            const res = await addPoint(gameContext.gameData.game.number,team)
            if(res.status != 200){
                gameContext.setRequestError((res.data as RequestError).message)
            }else{
                gameContext.setGameData(res.data as GameData)
                gameContext.setRequestError(undefined)
            }            
        }catch(error: any) {
            if (request.isAxiosError(error)){
                gameContext.setRequestError(error.message)
            }
        }
    }

    const handleRemovePoints = (team: string) => async (event: any) => {
        try{            
            const res = await removePoint(gameContext.gameData.game.number,team)
            if(res.status != 200){
                gameContext.setRequestError((res.data as RequestError).message)
            }else{
                gameContext.setGameData(res.data as GameData)
                gameContext.setRequestError(undefined)
            }
        }catch(error: any) {
            if (request.isAxiosError(error)){
                gameContext.setRequestError(error.message)
            }
        }
    }

    const displayPoints = (points:number) => {
        const fivePoints = Math.floor(points/5)        
        const remainder = points % 5
        let toDisplay :string[] = []
        for(let i = 0;i<fivePoints;i++){
            toDisplay.push("points5")
        }
        if(remainder != 0){
            toDisplay.push("points" + remainder.toString())
        }
        return toDisplay
    }

    const fillCards = (cards: string[]) => {
        let filledCards = cards.slice()
        if (cards.length < 8){
            for(let i = 0; i < 7 - cards.length; i++){
                filledCards.push("empty")
            }
        }
        
        return filledCards.reverse()
    }

    return(
        <Container className="bg-dark mx-2 px-0 py-2">
            <Row className="justify-content-center">
                <Col xs="6" className="bg-dark align-bottom text-center px-1 ">
                    {fillCards(displayPoints(gameContext.gameData.game.points_us)).map((item, index) => {
                        return <img className="img-fluid" key={index} src={require("../assets/Puntos/" + item + ".png")} />
                    })}
                    <span  className="text-white px-2">Nos</span>
                </Col>
                <Col xs="6" className="bg-dark align-bottom justify-content-xs-center text-center px-1">
                    {fillCards(displayPoints(gameContext.gameData.game.points_them)).map((item, index) => {
                        return <img className="img-fluid" key={index} src={require("../assets/Puntos/" + item + ".png")} />
                    })}
                    <span className="text-white fluid px-2">Ellos</span>
                </Col>
            </Row>
            {currentPlayer?.role == "admin" ?
            <Row className="justify-content-center">
                <Row className="pt-4">
                    <Col className="text-center px-0" onClick={handleAddPoints("us")}>
                        <FontAwesomeIcon icon={faCirclePlus} className="fa-xl fa-sm-xs" style={{color:"#6c757d"}}/>
                    </Col>                
                    <Col className="text-center px-0" onClick={handleAddPoints("them")}>
                        <FontAwesomeIcon icon={faCirclePlus} size="xl" style={{color:"#6c757d"}}/>
                    </Col>
                </Row> 
                <Row className="pt-4">
                    <Col className="text-center p-0" onClick={handleRemovePoints("us")}>
                        <FontAwesomeIcon icon={faCircleMinus} size="xl" style={{color:"#6c757d"}}/>
                    </Col>                
                    <Col className="text-center p-0" onClick={handleRemovePoints("them")}>
                        <FontAwesomeIcon icon={faCircleMinus} size="xl" style={{color:"#6c757d"}}/>
                    </Col>
                </Row>
            </Row>:
            <></>}
            
        </Container>
    )
}