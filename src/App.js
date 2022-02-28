import "./App.css";
import React from "react";
import "./youcss/cssbig.css";
import "./youcss/cssmin.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./youapp/Home";
import Login from "./youapp/Login";
import LogOut from "./youapp/LogOut";
import Category from "./youapp/Category";
import Admin from "./youapp/Admin";
import Register from "./youapp/Register";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Comment from "./youapp/Comment";
import Danhmuc from "./youapp/Danhmuc";
import Qltk from "./youapp/Qltk";
import Propss from "./youapp/Propss";
import Prop2 from "./youapp/Prop2";
function App() {
  const [cookies, setCookies,removeCookie] = useCookies(["name","pass","loai","id"]);
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={cookies.name == null ? <Login/> : <Home/>}/>
          <Route exact path="/danhmuc" element={cookies.id != 1 ? <Home/> :<Danhmuc/>}/>
          <Route exact path="/out" element={<LogOut/>}/>
          <Route exact path="/cate" element={ cookies.name == null ? <Login/> :<Category/>}/>
          <Route exact path="/comment" element={ cookies.name == null ? <Login/> :<Comment/>}/>
          <Route exact path="/admin" element={cookies.id != 1 ? <Home/> :<Admin/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/tk" element={cookies.id != 1 ? <Home/> :<Qltk/>}/>
          <Route exact path="/po" element={<Propss/>}/>
          <Route exact path="/po2" element={<Prop2/>}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
