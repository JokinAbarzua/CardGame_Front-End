import './App.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Home from './menuComponents/Home';
import Header from './menuComponents/Header';
import Login from './User/Login';
import Register from './User/Register';
import { StateLogged } from './menuComponents/StateLogged';
import CreateGame from './Game/CreateGame';
import JoinGame from './Game/JoinGame';
import Game from './Game/Game';
import ListGames from './Game/ListGames';
import Profile from './User/Profile';


function App() {
  return (    
      <BrowserRouter>
        <Header/>                
        <div className='Link-div'>
          <Routes>
            <Route path="/" element={ <Home/>}></Route>            
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route> 
            <Route path="/createGame" element={<StateLogged component={CreateGame}/> }></Route>
            <Route path="/game" element={<StateLogged component={Game}/> }></Route>
            <Route path="/joinGame" element={<StateLogged component={JoinGame}/> }></Route>
            <Route path="/myGames" element={<StateLogged component={ListGames}/> }></Route>
            <Route path="/profile" element={<StateLogged component={Profile}/> }></Route>
          </Routes>
        </div>
      </BrowserRouter>    
  );

}

export default App;
