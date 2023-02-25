import "./menuStyles.css"
import { logout, RequestError } from "../User/userService"
import { useNavigate } from "react-router-dom";
import { useSessionUser } from "../User/userStore";
import { environment } from "../environment";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import request from "axios"
import { errorHandler } from "../helpers/errorHandler";

const HeaderLogged: React.FC = () => {
    const history = useNavigate()
    const user = useSessionUser()    

    const handleLogout = async () => {
        try{
            const resLogout = await logout()
            if(resLogout.status != 200){                
                alert(errorHandler(resLogout))
            }
            history('/')
        }catch(error:unknown) {
            if (request.isAxiosError(error)) {                    
                alert(error.message)
            }
        }        
    }

    let UserImage = (        
        <img src={user?.avatar === undefined ? "https://t4.ftcdn.net/jpg/03/73/50/09/360_F_373500999_wAWkzJZRb2XHm9KeHEDcCJBkx4wR67us.jpg" : environment.backendUrl + user?.avatar } 
            className="rounded-circle-pfp" alt={user?.username}/>
    )

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
            <Container>
                <Navbar.Brand href="/">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/createGame">Crear Juego</Nav.Link>
                        <Nav.Link href="/joinGame">Unirse a un Juego</Nav.Link>
                        <Nav.Link href="/myGames">Mis Partidas</Nav.Link>
                    </Nav>
                    <Nav>   
                        <Navbar.Text className= "text-white">{user?.username}</Navbar.Text>
                        <NavDropdown align={"end"} title={UserImage} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>                                               
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>
                                Logout 
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

};

export default HeaderLogged