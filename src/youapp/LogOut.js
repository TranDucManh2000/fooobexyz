import React from 'react'
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    const [cookies,setCookies,remoCookies]=useCookies(["name","pass","loai","id","ulmes"]);
    remoCookies('name');
    remoCookies('pass');
    remoCookies('loai');
    remoCookies('id');
    remoCookies('ulmes');
    if(cookies.name == null){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            
        </div>
    )
}

export default LogOut
