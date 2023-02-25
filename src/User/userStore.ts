import axios from "axios"
import { useLayoutEffect, useState } from "react"
import { Subject } from "rxjs"
import { User } from "./userService"

const tokenSubject = new Subject<string | undefined>() 

let currentToken: string | undefined //como se define fuera es de alcance global, solo existe una que va mutando

export function useSessionToken(): string | undefined {  //Defino un hook que observa al estado del token 
    const [token,setToken] = useState(currentToken)    
    useLayoutEffect(()=> {
        tokenSubject.subscribe( (newToken) => {
            setToken(newToken)
        })
    }, [])
    return token
}


export function updateSessionToken(token: string){
    currentToken = token
    tokenSubject.next(currentToken)
    localStorage.setItem("token", token)    
}

export function cleanSessionToken(){
    currentToken = undefined
    tokenSubject.next(currentToken)
    localStorage.removeItem("token")    
}

const userSubject = new Subject<User | undefined>() 

let currentUser: User | undefined 

export function useSessionUser(): User | undefined {  
    const [user,setUser] = useState(currentUser)    
    useLayoutEffect(()=> {
        userSubject.subscribe( (newUser) => {
            setUser(newUser)
        })
    }, [])
    return user
}


export function updateSessionUser(user: User){
    currentUser = user
    userSubject.next(currentUser)
    localStorage.setItem("user", JSON.stringify(user))
    console.log("updatedUser",user)
}

export function cleanSessionUser(){
    currentUser = undefined
    userSubject.next(currentUser)     
    localStorage.removeItem("user")    
}
