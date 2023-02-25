import { useState } from "react"
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { RequestError } from "../User/userService"
import { joinGame } from "./gameService"
import request from "axios";




export default function JoinGame() {
    const history = useNavigate()
    const [requestError, setRequestError] = useState<string | undefined>(undefined)
    const { formState: { errors, isValid }, register, handleSubmit,setValue } = useForm<JoinForm>();

    type JoinForm = {
        gameNumber: string,        
        gameTeam: string
    }

    const onSubmit = async (data: JoinForm) => {               
        try{
            const rta = await joinGame(data.gameNumber,data.gameTeam)

            console.log(rta)

            if(rta.status != 200){                    
                let reqError = rta.data as RequestError
                setRequestError(reqError.message)                
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
                <h2 className="text-center text-white">Unirse a un Juego</h2>
                <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formGameNumber">
                        <Form.Label className="text-white">Numero del Juego</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Numero del Juego"
                            className="text-center"
                            {...register("gameNumber", { required: "*Debe ingresar el numero del juego",
                                pattern: {
                                    value: /[a-zA-Z0-9_-]{4,}[#][0-9]{1,3}?$/,
                                    message: "Debe ingresar el numero de partida de la forma \"nombre del creador de la partida\"#\"numero de partida\""
                                }})} />
                        {errors.gameNumber && (
                            <Form.Text className="text-danger">{errors.gameNumber?.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button className="my-4 btn  bg-white text-black w-100 rounded-pill" type="submit" onClick={() => setValue("gameTeam","us")}>
                                Unirse al equipo "nosotros"
                            </Button>
                        </Col>
                        <Col>
                            <Button className="my-4 btn  bg-white text-black w-100 rounded-pill" type="submit" onClick={() => setValue("gameTeam","them")}>
                                Unirse al equipo "ellos"
                            </Button>
                        </Col>
                    </Row>                    
                </Form>
                {requestError != undefined && (
                    <Alert variant="danger">
                        {requestError}
                    </Alert>                    
                )}
            </Container>
        </Container>

                
    )    
}