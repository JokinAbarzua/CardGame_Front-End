import { useSessionToken } from "../User/userStore";
import HeaderLogged from "./HeaderLogged"
import HeaderUnlogged from "./HeaderUnlogged"

const Header:React.FC = () => {
    const token = useSessionToken() //utilizo el custom hook que mantiene el token
    const isAuthenticated = token !== undefined //el token esta definido?
    console.log("isAuth",isAuthenticated);
    
    return isAuthenticated ? <HeaderLogged/> : <HeaderUnlogged/>
};

export default Header