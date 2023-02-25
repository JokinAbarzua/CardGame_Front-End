import React, { Component, FC } from "react"
import { Navigate } from "react-router-dom"
import { useSessionToken } from "../User/userStore"

interface PropType {
    component: React.FC
}

export const StateLogged: FC<PropType> = ( {component: Component} ) => {
    const token = useSessionToken() //utilizo el custom hook que mantiene el token
    const isAuthenticated = token !== undefined //el token esta definido?

    if (isAuthenticated) return <Component />
    return <Navigate to='/Login' />
}