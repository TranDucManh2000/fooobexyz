import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../youcss/cssbig.css";
import "./../youcss/cssmin.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCookies } from "react-cookie";
import Admin from "./Admin";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";

const Navmenu = () => {
    const [cookies, setCookies,removeCookie] = useCookies(["name","pass","loai","id"]);
   //
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
   

    return (
      <div>
        <header className="head">
        <h1 className="name">Grass Tea</h1>
        <h1 className="muc">
          <a href="/">Trang Chủ</a>
        </h1>
        <h1 className="muc" 
        style={cookies.id == 1 ? {display:'initial'}:{display:'none'}}>
          <a href="admin">Trang Admin</a>
        </h1>
        <h1 className="muc" 
        style={cookies.id == 1 ? {display:'initial'}:{display:'none'}}>
          <a href="/tk">Trang QLtk</a>
        </h1>
        <h1 className="muc2" 
        style={cookies.name == null ? {display:'initial'}:{display:'none'}}>
          <a href="/login">|Đăng Nhập</a>
        </h1>
        <h1 className="muc2" 
        style={cookies.name == null ? {display:'initial'}:{display:'none'}}>
          <a href="/register">Đăng Ký |</a>
        </h1>
        <h1 className="muc2" 
        style={cookies.name == null ? {display:'none'}:{display:'initial'}}>
          <a href="/out"> Đăng Xuất</a>
        </h1>
        <h1 className="muc2" 
        style={cookies.name == null ? {display:'none'}:{display:'initial'}}>
          <a> Xin Chào :{cookies.name} </a>
        </h1>
        <h1 className="muc2">
          <a href="/cate"><AiOutlineShoppingCart style={{fontSize:'25px'}}/></a>
        </h1>
      </header>
      
      <header className='head2'>
        <h1 className="namedt">Grass Tea</h1>
            <div id="menuToggle">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <ul id="menu">
              <li><a className="a1" href="/">Trang Chủ</a></li>
              <li style={cookies.id == 1 ? {display:'initial'}:{display:'none'}}><a className="a1" href="/admin">Admin</a></li><br/>
              <li style={cookies.name == null ? {display:'none'}:{display:'initial'}}><a className="a1" href="/cate">Giỏ hàng</a></li><br/>
              <li style={cookies.name == null ? {display:'initial'}:{display:'none'}}><a className="a1" href="/login">Đăng nhập </a></li><br/>
              <li style={cookies.name == null ? {display:'none'}:{display:'initial'}}><a className="a1" href="/out">Đăng xuất</a></li><br/>
            </ul>
           </div>
           
      </header>
      </div>
    )
}

export default Navmenu
