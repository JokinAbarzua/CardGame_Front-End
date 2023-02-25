import "./formStyles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, FormGroup } from "react-bootstrap";
import { login, Data, RequestError } from "./userService";
import { AxiosError } from "axios";
import request from "axios";
import { errorHandler } from "../helpers/errorHandler";

export default function Login() {
    const history = useNavigate()
    const [data, setData] = useState<User>()
    const [requestError, setRequestError] = useState<string | undefined>(undefined)
    const { formState: { errors, isValid }, register, handleSubmit } = useForm<User>();
    type User = {
        username: string;
        password: string;
    }


    const onSubmit = async (data: User) => {
        setData(data)
        let rta: Data
        if (isValid) {
            try {                
                rta = await login({ username: data.username, password: data.password })
                console.log(rta)
                if(rta.status != 200){                                        
                    setRequestError(errorHandler(rta))
                }else{
                    history('/')
                }                                             
                
            } catch(error: any) {                
                if (request.isAxiosError(error)){
                    error as AxiosError
                    setRequestError(error.message)          
                }
            }
        }
    }
    

    return (
        <div className="mt-5 pt-5 px-5 row justify-content-center">
            <div className="pt-3 px-4 bg-dark col-sm-6">
                <h2 className="text-center text-white">Ingresar</h2>
                <Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label className="text-white">Nombre de Usuario</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Nombre"
                            className="text-center"
                            {...register("username", { required: "*Debe ingresar su nombre de usuario" })} />
                        {errors.username && (
                            <Form.Text className="text-danger">{errors.username.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="text-white">Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            className="text-center"
                            {...register("password", { required: "*Debe ingresar su contraseña" })} />
                        {errors.password && (
                            <Form.Text className="text-danger">{errors.password.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Button className="my-4 btn  bg-white text-black w-100 rounded-pill" type="submit">Ingresar</Button>                    
                </Form>
                {requestError != undefined && (
                    <Alert variant="danger">
                        {requestError}
                    </Alert>                    
                )}                
            </div>            
        </div>
    );
}