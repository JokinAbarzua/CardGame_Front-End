import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { getCurrentUser, RequestError } from "../User/userService"
import { GameData, Player, playCard, deal, discard } from "./gameService"
import request from "axios"
import { useGameContext } from "../context/GameContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons"
 



export default function BoardTwo() {
    const gameContext = useGameContext()
    const opponent:Player | undefined = gameContext.gameData.game.players.find(player => player.user.username != getCurrentUser()?.username)
    const currentPlayer:Player | undefined = gameContext.gameData.game.players.find(player => player.user.username == getCurrentUser()?.username)    

    const handlePlayCard = (card: string) => async (event: any) => {
        try{            
            const res = await playCard(gameContext.gameData.game.number,card)
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

    const handleDeal = () => async (event: any) => {
        
        try{
            const res = await deal(gameContext.gameData.game.number)
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

    const handleDiscard = (card:string) => async (event: any) => {
        try{            
            const res = await discard(gameContext.gameData.game.number,card)
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

    const showHand = (player: Player) => {
        let hand: string[] = []
        
        if(gameContext.gameData.hand.length == 0 && currentPlayer?.played.length == 0){
            return hand
        }

        for (let i = 0; i < 3 - player.played.length; i++) {
            hand.push("nocard")
        }
        return hand
    }

    const fillCards = (cards: string[]) => {
        let filledCards = cards.slice()
        for(let i = 0; i<3 - cards.length; i++){
            filledCards.push("empty")
        }

        return filledCards
    }

    const checkRightDeck = (player:Player|undefined):string => {        
        if(player && (player.seat + 1) % gameContext.gameData.game.size == gameContext.gameData.game.deals){
            return "mazo2"                                    
        }else{
            return "empty"
        }            
    }
    


    return (
        <Container className="pt-3 px-1 py-1 mx-0 bg-dark">
            <Row className="mb-2">
                <Col xs="4" className="justify-content-center">                       
                    <Col xs={{span: 4,offset: 4}} >
                    {<img className="img-fluid inverted-deck" src= {require("../assets/MazoNaipes/" + checkRightDeck(opponent) + ".png")}/>}
                    </Col>                    
                </Col>
                <Col xs="4">
                    <h5 className="text-white text-center">{opponent!.user.username}</h5>                    
                    <Row>                                                
                        {fillCards(showHand(opponent!)).map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>                    
                </Col>
                <Col xs="4">                    
                </Col>      
            </Row>

            <Row className="justify-content-center">
                <Col xs="4" className="border">
                    <Row>
                        {fillCards(opponent!.played).map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>                    
                    <Row>
                        {fillCards(currentPlayer!.played).map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs="4">                    
                </Col>
                <Col xs="4">                                        
                    <Row>
                        {fillCards(gameContext.gameData.hand).map((item, index) => {
                            return <Col xs="4" className="px-1"><img onClick={handlePlayCard(item)} className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>
                    <Row>
                        {gameContext.gameData.hand.map((item,index)=>{
                            return <Col xs="4" className="px-1 py-2 text-center">
                                <Button variant="danger" size="sm" onClick={handleDiscard(item)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Col>
                        })}
                    </Row>
                    <h5 className="text-white text-center">{getCurrentUser()?.username}</h5>
                </Col>
                <Col xs="4" className="justify-content-center d-flex">                                        
                    {gameContext.gameData.game.deals == currentPlayer?.seat ? 
                        <Button onClick={handleDeal()} className="align-self-center">Repartir</Button> : 
                        <Col xs={{span: 4,offset: 4}}> 
                            <img className="img-fluid" src= {require("../assets/MazoNaipes/" + checkRightDeck(currentPlayer) + ".png")}/>
                        </Col>
                    }                                        
                </Col>
            </Row>                        
        </Container>
    )
}