import { Alert, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { environment } from "../environment";
import { useSessionUser } from "./userStore";
import Image from "react-bootstrap/Image"
import { useForm } from "react-hook-form";
import { destroy, update, User } from "./userService";
import { useState } from "react";
import "./formStyles.css"
import { errorHandler } from "../helpers/errorHandler";
import request from "axios"
import { useNavigate } from "react-router-dom";



export default function Profile() {
    const history = useNavigate()
    const user = useSessionUser()
    const [requestError, setRequestError] = useState<string | undefined>(undefined)
    const [succesfulRequest, setSuccesfulRequest] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const currentUserAvatar = user?.avatar === undefined ? "https://t4.ftcdn.net/jpg/03/73/50/09/360_F_373500999_wAWkzJZRb2XHm9KeHEDcCJBkx4wR67us.jpg" : environment.backendUrl + user?.avatar
    const [userImage, setUserImage] = useState(currentUserAvatar)    
    const { formState: { errors, isValid ,isDirty}, register, handleSubmit} = useForm<User>({defaultValues: {username: "",password:"",avatar: {} as FileList}});

    type User = {
        username: string;
        password: string;
        avatar: FileList;
    }

    const updateUserData = async (user: User) => {
        const username = user.username == "" ? null : user.username
        const password = user.password == "" ? null : user.password        
        console.log(user)        

        if (isValid && (user.username != "" || user.password != "" || user.avatar.length != 0)) {
            try {
                
                const rtaUpdate = await update({ username: username, password: password, avatar: user.avatar[0] })
                if (rtaUpdate.status != 200) {
                    setRequestError(errorHandler(rtaUpdate))
                } else {
                    setSuccesfulRequest(true)
                    console.log(rtaUpdate)
                }
            } catch (error: unknown) {
                if (request.isAxiosError(error)) {
                    setRequestError(error.message)
                }
            }
        } else {
            console.log("error")
        }
    }

    const deleteUser = async () => {
        try {
            const rtaDestroy = await destroy()
            if (rtaDestroy.status != 200) {
                setRequestError(errorHandler(rtaDestroy))
            } else {
                console.log(rtaDestroy)
                history("/")
            }
        } catch (error: unknown) {
            if (request.isAxiosError(error)) {
                setRequestError(error.message)
            }
        }
    }

    const setNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.item(0) != null && e.currentTarget.files?.item(0) !== undefined) {
            setUserImage(URL.createObjectURL(e.currentTarget.files[0] as File))
        }
    }

    return (
        <Container className="mt-5 pt-5">

            <Modal show={showModal} onHide={async() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme la accion</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro que desea borrar su cuenta?</Modal.Body>
                <Modal.Footer>                    
                    <Button variant="secondary" onClick={async() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container className="pt-3 px-4 py-4 bg-dark">
                <Form onSubmit={handleSubmit(updateUserData)}>
                    <Row className="mt-1 align-items-center">
                        <Col xs="5" md="3" className="circular">                            
                            <img src={userImage}  alt={user?.username} />
                        </Col>
                        <Col>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="text-white">Cambiar su avatar:</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="border-dark"                                    
                                    {...register("avatar",
                                        {
                                            validate: {
                                                acceptedFormats: (files) => (files[0] === undefined || ["image/jpeg", "image/png"].includes(files[0]?.type)) || "Solo se acepta PNG o JPG"
                                            }
                                        }
                                    )}
                                    onChange={setNewImage} />
                                {errors.avatar && (
                                    <Form.Text className="text-danger">{errors.avatar.message}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3 align-items-center" >
                        <Col xs="5" md="3" >
                            <h4 className="text-white text-center">{user ? user.username : "username"}</h4>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label className="text-white">Nuevo nombre</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Nombre"
                                    className="text-center border-dark"
                                    defaultValue={""}
                                    {...register("username")} />
                                {errors.username && (
                                    <Form.Text className="text-danger">{errors.username.message}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xs="5" md="3">
                            <h4 className="text-white text-center">password</h4>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label className="text-white">Nueva contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    className="text-center border-dark"
                                    defaultValue={""}
                                    {...register("password", { minLength: { value: 8, message: "La contraseña debe ser de al menos 8 caracteres" } })} />
                                {errors.password && (
                                    <Form.Text className="text-danger">{errors.password.message}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="dark" type="submit" className="my-4 btn  bg-white text-black w-100 rounded-pill">Actualizar Datos</Button>
                </Form>
                <Button variant="danger" className="my-3 btn  bg-danger text-black w-100 rounded-pill" onClick={async() => setShowModal(true)}>Borrar Cuenta</Button>
                {(requestError != undefined && !succesfulRequest) && (
                    <Alert variant="danger">
                        {requestError}
                    </Alert>
                )}
                {succesfulRequest && (
                    <Alert variant="success">
                        Se han actualizado los datos correctamente
                    </Alert>
                )}
            </Container>
        </Container>
    )
}