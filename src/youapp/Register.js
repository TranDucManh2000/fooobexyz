import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const Register = () => {
    const [cookies, setCookies, removeCookie] = useCookies([
        "name",
        "pass",
        "loai",
        "id",
        "ulmes",
      ]);
    const dataValue = {
        name: "",
        pass: "",
        loai: 0,
        id: "",
        respass : "",
      };
      const dtuser = [];
      const [dataForms, setdataForms] = useState(dataValue);
      const [dataUsers, setDataUsers] = useState(dtuser);
      const [checkpass,setcheckpass]=useState();
    
      const urluser = "https://619095e7f6bf450017484c3b.mockapi.io/user";
    
    //   useEffect(() => {
    //     axios.get(urluser).then((e) => {
    //       const { data } = e;
    //       setDataUsers(data);
    //     });
    //   }, []);
    
      const inputOnChang = function (params) {
        setcheckpass('');
        const { name, value } = params.target;
        setdataForms({
          ...dataForms,
          [name]: value,
        });
        // console.log('name',dataForms.respass);
      };
      const subRegis = function(){
          if(dataForms.respass == dataForms.pass && dataForms.name!="" && dataForms.pass!=""){
              axios.post(urluser,dataForms)
              .then(e=>{
                  const{data}=e;
                  setDataUsers([
                      ...dataUsers,
                      data,
                  ])
              });
              alert('Đã đăng ký thành công');
              setcheckpass(1)
          }else{
              setcheckpass('Thông tin chưa hợp lệ')
          }
      }
      if (checkpass == 1) {
        return <Navigate to="/login" />; // chuyen huong '' gach cong them , "" 2 gach di luon
      }
    return (
        <div>
            <div className='formlogin'>
            <h1> Đăng ký </h1>
            <p>Chào mừng bạn tới với chúng tôi</p>
            <div className ='frommin'>
            <label for="fullname" className='fon'>Tài Khoản </label><br/>
            <input className='inputlogin' name="name" type="text" placeholder="..." onChange={inputOnChang}/>
            <span class="form-message" style={{color:'red'}}></span>
            </div>
            <div className ='frommin'>
            <label for="fullname" className='fon'>Mật Khẩu </label><br/>
            <input className='inputlogin' name="pass" type="password" placeholder="*****" onChange={inputOnChang}/>
            <span class="form-message" style={{color:'red'}}></span>
            </div>
            <div className ='frommin'>
            <label for="fullname" className='fon'>Nhập Lại Mật Khẩu </label><br/>
            <input className='inputlogin' name="respass" type="password" placeholder="*****" onChange={inputOnChang}/>
            <span class="form-message" style={{color:'red'}}>{checkpass}</span>
            </div>
            <button className='btnlogin' onClick={subRegis}>Đăng Ký</button><br/>
            <div className='frommin'><a className='chuyen1'>- Quên mật khẩu -</a><a className='chuyen2' href='/login'>-Đăng Nhập-</a></div>
            
        </div>
        </div>
    )
}

export default Register
