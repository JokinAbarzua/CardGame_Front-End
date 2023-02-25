import { Blob } from "activestorage";
import request, { AxiosError } from "axios"
import { useState } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { environment } from "../environment";
import { errorHandler } from "../helpers/errorHandler";
import { Data, login, register as serviceRegister, RequestError } from "./userService";


export default function Register() {
    const history = useNavigate()
    const { formState: { errors, isValid }, getValues, register, handleSubmit, watch } = useForm<User>();
    const [data, setData] = useState<User>()    
    const [requestError, setRequestError] = useState<string | undefined>(undefined)
    let password = watch("password", "")
    type User = {
        username: string;
        password: string;
        confirmPassword: string;
        avatar: FileList;
    }

    const onSubmit = async (data: User) => {

        setData(data);        

        let rtaRegister : Data
        let rtaLogin : Data
        if (isValid) {
            try {                                
                rtaRegister = await serviceRegister({ username: data.username, password: data.password, avatar: data.avatar[0]})                
                console.log("rtaRegister", rtaRegister);

                if(rtaRegister.status != 200){
                    setRequestError(errorHandler(rtaRegister));
                }else{
                    history("/login")
                }
            } catch (error: unknown) {
                if (request.isAxiosError(error)) {                    
                    setRequestError(error.message)
                }
            }
        }
    }

    return (
        <div className="my-5 pt-5 px-5 row justify-content-center">
            <div className="pt-3 px-4 bg-dark col-sm-6">
                <h2 className="text-center text-white">Registrarse</h2>
                <Form className="mt-5" onSubmit={handleSubmit(onSubmit)} >
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
                            {...register("password", { required: "*Debe ingresar su contraseña", minLength: { value: 8, message: "La contraseña debe ser de al menos 8 caracteres" } })} />
                        {errors.password && (
                            <Form.Text className="text-danger">{errors.password.message}</Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="text-white">Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repetir Contraseña"
                            className="text-center"
                            {...register("confirmPassword", {
                                required: "*Debe confirmar su contraseña",
                                minLength: { value: 8, message: "La contraseña debe ser de al menos 8 caracteres" },
                                validate: value => value === password || "Las contraseñas no coinciden"
                            })} />
                        {errors.confirmPassword && (
                            <Form.Text className="text-danger">{errors.confirmPassword.message}</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="text-white">Ingrese su avatar</Form.Label>
                        <Form.Control
                            type="file"
                            className="avatar"                                                    
                            {...register("avatar", {                                
                                validate: {
                                    acceptedFormats: (files) => (files[0] === undefined || ["image/jpeg", "image/png"].includes(files[0]?.type)) || "Solo se acepta PNG o JPG"
                                }
                            })}/>
                            {errors.avatar && (
                            <Form.Text className="text-danger">{errors.avatar.message}</Form.Text>
                        )}
                    </Form.Group>                    

                    <Button type="submit" className="my-4 btn  bg-white text-black w-100 rounded-pill">Registrarse</Button>

                    {requestError != undefined && (
                    <Alert variant="danger">
                        {requestError}
                    </Alert>                    
                    )}
                </Form>

            </div>
        </div>
    );
}
