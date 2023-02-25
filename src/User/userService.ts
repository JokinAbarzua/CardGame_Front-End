import { Blob, DirectUpload } from "activestorage"
import axios from "axios"
import { reduce } from "rxjs"
import { environment } from "../environment"
import { cleanSessionToken, cleanSessionUser, updateSessionToken, updateSessionUser } from "./userStore"
import request from "axios"


export interface Data {
  status: number,
  data: RequestError | UserData
}

export interface RequestError {
  message: string
}

export interface UserData {
  token: string,
  user: User
}


export interface User {
  id: number,
  username: string,
  avatar: string
}

export async function login(params: {
  username: string
  password: string
}): Promise<Data> {
  const res = (
    await axios.post("/auth/login?", params)
  ).data as Data
  if (res.status == 200) {
    updateSessionToken((<UserData>res.data).token)
    updateSessionUser((<UserData>res.data).user)
    axios.defaults.headers.common['Authorization'] = getCurrentToken()
  }

  return res
}

export async function register(params: {
  username: string,
  password: string,
  avatar: File | null
}): Promise<Data> {

  var rtaRegister: Data | undefined = undefined
  
  if (params.avatar != null) { //si el usuario cargó una imagen            
    const upload = new DirectUpload(params.avatar, environment.backendUrl + "/rails/active_storage/direct_uploads")
    upload.create(async (error, blob) => {
      if (error) {
        rtaRegister = { status: 400, data: { message: "Error al cargar el avatar en el servidor" } }
      } else {
        try {
          rtaRegister = (
            await axios.post("/users?", { user: { username: params.username, password: params.password, avatar: blob.signed_id } })
          ).data as Data          
        } catch (error: unknown) {
          if (request.isAxiosError(error)) {
            rtaRegister = { status: 400, data: { message: error.message } }            
          }
        }
      }
    })
    while (rtaRegister === undefined){
      await new Promise(r => setTimeout(r, 50));
    }
    console.log("despues de esperar",rtaRegister)
    return (rtaRegister as unknown) as Data
  } else {
    rtaRegister = (
      await axios.post("/users?", { user: { username: params.username, password: params.password } })
    ).data as Data
    return rtaRegister
  }
}

export async function update(params: {
  username: string | null,
  password: string | null,
  avatar: File | null
}): Promise<Data> {
  var rtaUpdate: Data | undefined = undefined
  if (params.avatar != null) {
    const upload = new DirectUpload(params.avatar, environment.backendUrl + "/rails/active_storage/direct_uploads")
    upload.create(async (error, blob) => {
      if (error) {
        rtaUpdate = { status: 400, data: { message: "Error al cargar el avatar en el servidor" } }
      } else {
        try {
          rtaUpdate = (
            await axios.put("/user", { user: { username: params.username, password: params.password, avatar: blob.signed_id } })
          ).data as Data          
        } catch (error: unknown) {
          if (request.isAxiosError(error)) {
            rtaUpdate = { status: 400, data: { message: error.message } }            
          }
        }
      }
    })
    
    while (rtaUpdate === undefined){
      await new Promise(r => setTimeout(r, 50));
    }    
    
    console.log("despues de esperar",rtaUpdate)
  }else {      
    rtaUpdate = (
      await axios.put("/user", { user: { username: params.username, password: params.password} })
    ).data as Data            
  }
  if (rtaUpdate?.status == 200) {    
    let userData = <UserData>rtaUpdate.data
    updateSessionUser(userData.user)
  }
  return rtaUpdate as unknown as Data
}

export async function logout():Promise<Data> {
  const resLogout = (
    await axios.post("/auth/logout?")
  ).data as Data
  console.log(JSON.stringify(resLogout as any))
  if (resLogout.status == 200){
    cleanSessionToken()
    cleanSessionUser()
    axios.defaults.headers.common.Authorization = ""
  }
  return resLogout    
}

export async function destroy():Promise<Data>{
  const resDestroy = (
    await axios.delete("/user")
  ).data as Data
  if (resDestroy.status == 200){
    cleanSessionToken()
    cleanSessionUser()
    axios.defaults.headers.common.Authorization = ""
  }
  return resDestroy
}


export function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

export function getCurrentUser(): User | undefined {
  let result = localStorage.getItem("user") as string
  return result != "undefined" ? JSON.parse(result) as User : undefined
}