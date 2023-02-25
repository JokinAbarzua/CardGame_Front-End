import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HeaderUnlogged: React.FunctionComponent = ()=>{

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-top">
            <Container>
                <Navbar.Brand href="/">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Ingresar</Nav.Link>
                        <Nav.Link href="/register">Registrarse</Nav.Link>
                    </Nav>                    
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    );

    };

export default HeaderUnlogged