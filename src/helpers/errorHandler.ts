import { useNavigate } from "react-router-dom";
import { Data } from "../Game/gameService"
import { RequestError } from "../User/userService";
import { cleanSessionToken, cleanSessionUser } from "../User/userStore";


export const errorHandler = (req : Data) => {    
    if (req.status == 401){
        cleanSessionToken();
        cleanSessionUser();
        window.location.replace("http://localhost:3001/login")
        return
    }else{
        return (<RequestError>req.data).message
    }
}