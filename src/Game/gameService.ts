import axios from "axios"
import { getCurrentToken, RequestError, UserData } from "../User/userService"

//axios.defaults.headers.common['Authorization'] = getCurrentToken()

export interface Data {
  status: number,
  data: GameData | RequestError | GameSummary | UserData
}

export interface GameData {
  hand: string[],
  game: Game
}

export interface Game {
  points_us: number,
  points_them: number,
  players_count: number,
  size: number,
  state: string,
  number: string,
  deals: number,
  created_at: Date,
  players: Player[]
}

export interface Player {
  role: string,
  team: string,
  played: string[],
  seat: number,
  user: { username: string }
}

export interface GameSummary{
  games: {
    points_us: number,
    points_them: number,    
    state: string,
    number: string,  
    created_at: Date,
    size: number
  }[]
  
}

export async function createGame(size: number): Promise<Data> {
  const res = (
    await axios.post("/games", { size: size })
  ).data as Data
  if (res.status == 200) {
    localStorage.setItem("game", (<GameData>res.data).game.number)
  }
  return res
}

export async function endGame(number:string){
  const res = (
    await axios.post("/game/end", {number: number})
  ).data as Data  
  if (res.status == 200) {
    localStorage.removeItem("game")
  }
  return res
}

export async function getGame(number: string): Promise<Data> {
  const res = (
    await axios.get("/game/status", { params: { number: number } })
  ).data as Data
  if (res.status == 200) {
    //store game
  }
  return res
}

export async function joinGame(number: string, team: string): Promise<Data> {
  const res = (
    await axios.post("/game/join", { number: number, team: team })
  ).data as Data
  if (res.status == 200) {
    localStorage.setItem("game", (<GameData>res.data).game.number)
  }
  return res
}

export async function listGames(): Promise<Data> {
  const res = (
    await axios.get("/games")
  ).data as Data  
  return res
}

export async function playCard(number: string, card: string): Promise<Data> {
  const res = (
    await axios.post("/game/play",{number: number, card: card})
  ).data as Data
  return res
}

export async function discard(number: string, card: string): Promise<Data> {
  const res = (
    await axios.post("/game/discard",{number: number, card: card})
  ).data as Data
  return res
}

export async function deal(number: string): Promise<Data> {
  const res = (
    await axios.post("/game/deal",{number: number})
  ).data as Data
  return res
}

export async function addPoint(number: string,team: string): Promise<Data> {
  const res = (
    await axios.post("/game/add_point",{number: number,team: team})
  ).data as Data
  return res
}

export async function removePoint(number: string,team: string): Promise<Data> {
  const res = (
    await axios.post("/game/remove_point",{number: number,team: team})
  ).data as Data
  return res
}