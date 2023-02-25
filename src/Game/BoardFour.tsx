import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { getCurrentUser, RequestError } from "../User/userService"
import { GameData, Player, playCard, deal, discard } from "./gameService"
import request from "axios"
import  "./game.css"
import { useGameContext } from "../context/GameContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons"
 



export default function BoardFour() {
    const gameContext = useGameContext()
    const currentPlayerIndex :number = gameContext.gameData.game.players.findIndex(player => player.user.username == getCurrentUser()?.username)
    const currentPlayer = gameContext.gameData.game.players[(0 + currentPlayerIndex) % 4]
    const player2 = gameContext.gameData.game.players[(1 + currentPlayerIndex) % 4]
    const player3 = gameContext.gameData.game.players[(2 + currentPlayerIndex) % 4]
    const player4 = gameContext.gameData.game.players[(3 + currentPlayerIndex) % 4]    
    console.log(currentPlayer)
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
        <Container className="pt-3 px-4 py-4 bg-dark">
            <Row className="mb-2">
                <Col xs="4" className="justify-content-center">                    
                    <Col xs={{span:4,offset:4}} className="mt-4">
                        {<img className="img-fluid inverted-deck" src= {require("../assets/MazoNaipes/" + checkRightDeck(player3) + ".png")}/>}                        
                    </Col>                    
                </Col>
                <Col xs="4">
                    <h5 className="text-white text-center">{player3.user.username}</h5>                    
                    <Row>                                                
                        {fillCards(showHand(player3)).map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>                    
                </Col>
                <Col xs="4">                    
                    <Col xs={{span:4,offset:4}} className="mt-4">
                        {<img className="img-fluid horizontal-deck-right" src= {require("../assets/MazoNaipes/" + checkRightDeck(player2) + ".png")}/>}
                    </Col>
                </Col>      
            </Row>

            <Row className="justify-content-center">
                <Col xs="5" className="border border-bottom-0">
                    <Row className="justify-content-center">                                          
                        {fillCards(player3.played).map((item, index) => {
                            return <Col xs="3" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}                        
                    </Row>
                </Col>                
            </Row>

            <Row className="justify-content-center">
                <Col xs="3" className="m-0 p-0">
                    <h5 className="text-white text-center verticaltext-left">{player4.user.username}</h5>                    
                    <Row className="horizontal-card-left">
                        {fillCards(showHand(player4)).reverse().map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>
                </Col>

                <Col xs="5" className="border border-top-0 border-bottom-0">                    
                    <Row>
                        <Col xs="4">
                            {fillCards(player4.played).map((item, index) => {
                                return <Row className="px-3 py-0"><img className="img-fluid horizontal-played-card-right" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Row>
                            })}
                        </Col>
                        <Col xs="4">
                        </Col>
                        <Col xs="4">
                            {fillCards(player2.played).map((item, index) => {
                                return <Row className="px-3"><img className="img-fluid horizontal-played-card-left" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Row>
                            })}
                        </Col>
                    </Row>                              
                </Col>                

                <Col xs="3" className="m-0 p-0">
                    
                    <h5 className="text-white text-center verticaltext-right">{player2.user.username}</h5>                    
                    <Row className="horizontal-card-right">
                        {fillCards(showHand(player2)).map((item, index) => {
                            return <Col xs="4" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}
                    </Row>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="5" className="border border-top-0">
                    <Row className="px-1 justify-content-center">                                          
                        {fillCards(currentPlayer.played).map((item, index) => {
                            return <Col xs="3" className="px-1"><img className="img-fluid" key={index} src={require("../assets/MazoNaipes/" + item + ".png")} /></Col>
                        })}                        
                    </Row>
                </Col>                
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs="4">
                    <Col xs={{span:4,offset:4}} >
                        {<img className="img-fluid horizontal-deck-left" src= {require("../assets/MazoNaipes/" + checkRightDeck(player4) + ".png")}/>}                        
                    </Col>                        
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