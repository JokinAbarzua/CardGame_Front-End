import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { createGame, GameData } from "./gameService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "axios";
import { errorHandler } from "../helpers/errorHandler";

export default function CreateGame() {
    const history = useNavigate()
    const [requestError, setRequestError] = useState<string | undefined>(undefined)

    const handleClick = (size : number) => async (event: any) => {
        try{
            const rta = await createGame(size)
    
            if(rta.status != 200){
                setRequestError(errorHandler(rta))
            }else{
                history('/game',{state: rta.data})
            }
        }catch(error:any){
            if (request.isAxiosError(error)){
                    setRequestError(error.message)
                }
        }
    } 

    return (
        <Container className="mt-5 pt-5">
            <Container className="pt-3 px-4 py-4 bg-dark">
                <Row className="my-2">
                    <Col>
                        <Card className="center py-2 my-2 h-100" onClick={handleClick(2)}>
                            <Col className="text-center d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                            </Col>
                            <h3 className="text-center">2 Juadores</h3>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="center py-2 my-2 h-100" onClick={handleClick(4)}>
                            <Col className="text-center d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />                                
                            </Col>
                            <h3 className="text-center">4 Juadores</h3>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="center py-2 my-2 h-100" onClick={handleClick(6)}>
                            <Col className="text-center d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />                                
                            </Col>
                            <Col className="text-center d-flex align-items-center justify-content-center">
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                                <FontAwesomeIcon icon={faUser} size="xl" className="px-1 py-1" />
                            </Col>
                            <h3 className="text-center">6 Juadores</h3>
                        </Card>
                    </Col>                    
                </Row>    
                {requestError != undefined && (
                    <Alert variant="danger" className="mt-3">
                        {requestError}
                    </Alert>                    
                )}                            
            </Container>            
        </Container>
    )
}

