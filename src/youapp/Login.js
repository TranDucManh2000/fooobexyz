import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
  const dataValue = {
    name: "",
    pass: "",
    loai: "",
    id: "",
    ulmes : "",
  };
  const dtuser = [];
  const [dataForms, setdataForms] = useState(dataValue);
  const [dataUsers, setDataUsers] = useState(dtuser);
  const [checklogin,setchecklogin]=useState();

  const urluser = "https://619095e7f6bf450017484c3b.mockapi.io/user";

  useEffect(() => {
    document.title = "Login";  
  }, []);

  useEffect(() => {
    axios.get(urluser).then((e) => {
      const { data } = e;
      setDataUsers(data);
    });
  }, []);

  const inputOnChang = function (params) {
    setchecklogin('');
    const { name, value } = params.target;
    setdataForms({
      ...dataForms,
      [name]: value,
    });
  };
  // coki
  const [cookies, setCookies, remoCookies] = useCookies(dataValue);

  const onSubmit = function () {
    // .toLowerCase() chi ve thuong
    dataUsers.map((value) => {
      if (value.name == dataForms.name && value.pass == dataForms.pass) {
        let time = new Date();
        time.setTime(time.getTime() + 60 * 60 * 24 * 30 * 365); // set thoi gian song
        // gui data len
        setCookies("name", dataForms.name, {
          path: "/",
          expires: time,
        });
        setCookies("pass", dataForms.pass, {
          path: "/",
          expires: time,
        });
        setCookies("loai", value.loai, {
          path: "/",
          expires: time,
        });
        setCookies("id", value.id, {
          path: "/",
          expires: time,
        });
        window.location.reload(); // laod lại 
      }else{
          setchecklogin("Thông tin sai");
      }
    });
  };
  if (cookies.name != null) {
    return <Navigate to="/" />; // chuyen huong '' gach cong them , "" 2 gach di luon
  }


  return (
    <div>
        <div className='formlogin'>
            <h1> Đăng nhập </h1>
            <p>Chào mừng bạn tới với chúng tôi</p>
            <div className ='frommin'>
            <label for="fullname" className='fon'>Tài Khoản </label><br/>
            <input className='inputlogin' name="name" type="text" placeholder="..." onChange={inputOnChang}/>
            <span class="form-message" style={{color:'red'}}>{checklogin}</span>
            </div>
            <div className ='frommin'>
            <label for="fullname" className='fon'>Mật Khẩu </label><br/>
            <input className='inputlogin' name="pass" type="password" placeholder="*****" onChange={inputOnChang}/>
            <span class="form-message" style={{color:'red'}}>{checklogin}</span>
            </div>
            <button className='btnlogin' onClick={onSubmit}>Đăng Nhập</button><br/>
            <div className='frommin'><a className='chuyen1'>- Quên mật khẩu -</a><a className='chuyen2' href='/register'>-Đăng ký-</a></div>
            
        </div>
    </div>
  );
};

export default Login;
