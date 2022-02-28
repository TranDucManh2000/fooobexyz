import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Home from "./Home";
import Navmenu from "./Navmenu";
import Thu2 from "./Chan";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chan from "./Chan";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Admin = () => {
  const dm = [];
  const sp = [];
  const formVali = {
    name : '',
    price : '',
    url : '',
    namedm : '',
    danhmucId : '',
  }
  const a = {display:"contents"};
  const [formvalue,setFormvalue] = useState(formVali);
  const [lissdm, setlissdm] = useState(dm);
  const urldm = "https://6188f8b6d0821900178d7680.mockapi.io/danhmuc";
  const [lissps, setlisssp] = useState(sp);
  const [vitridm, setvitridm] = useState(1);
  const urlsp = `https://6188f8b6d0821900178d7680.mockapi.io/danhmuc/${vitridm}/sanpham/`;
  const [ClickRow, setClickRow] = useState(-1);
  // dm
  console.log(lissps);
  useEffect(() => {
    axios.get(urldm).then((e1) => {
      const { data } = e1;
      setlissdm(data);
    });
  }, []);
  // sp
  useEffect(() => {
    axios.get(urlsp).then((e) => {
      const { data } = e;
      setlisssp(data);
    });
  }, [vitridm]);
  //
  const danhmucOnChange = function (event) {
    setvitridm(event.target.value);
  };
  const vaLi = function(e){
    const {name,value} = e.target;
    setFormvalue({
      ...formvalue,
      [name]:value,
    })
  }
  const submit = function(){
    if(ClickRow == -1){
      axios.post(urlsp,formvalue)
    .then(e=>{
      const {data} = e;
      setlisssp([
        ...lissps,
        data,
      ]);
      setFormvalue(formVali);
    },[])
  }else{
    btnUpdate();
  }
    
  }
  const btnDelet = function(e,lisp,index){
    console.log(e)
    console.log(lisp)
    console.log(index)
    axios.delete(urlsp+lisp.id)
    .then(event =>{
      const lismoi = lissps.filter(function(value,indexd){
        return indexd == index ? false:true;
      })
      setlisssp(lismoi);
    })
  }; 

  const btnUpdate = function(){
    axios.put(urlsp+formvalue.id,formvalue)
    .then(function (response) {
      const { data } = response;
      const list = lissps.map(function (val, idx) {
        if (idx == ClickRow) {
          // console.log('vl',val,"dt",data)
          return data;
        } else {
          return val;
        }

        })
      setlisssp(list);
      setClickRow(-1);
      setFormvalue(formVali);
      })
}
const submithanler = function(e,lisp,index){
  setClickRow(index);
  setFormvalue(lisp); // lấy dưc liệu form dẽ vl nay
}

 
  return (
    <div>
      <Navmenu/>
      <div className="divnen2">

        <div className="bodys">
          <div className='menua'>
          Danh mục Sp : <select onChange={danhmucOnChange} className='dmsp'>
            {lissdm.map((lisdm, index) => (
              <option key={index} value={lisdm.id}>
                {lisdm.name}
              </option>
            ))}
           </select><br/>
            Name : <input type="name" name="name" value={formvalue.name} onChange={vaLi} className='in'></input> <br/>
            Price : <input type="number" name="price" value={formvalue.price} onChange={vaLi} className='in'></input><br/>
            Url : <input type="name" name="url" value={formvalue.url} onChange={vaLi} className='in'></input><br/><br/>
            <button onClick={submit} className="btn">Them</button>
          </div>
        <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1500 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell align="center">ID &nbsp;</TableCell>
            <TableCell align="center">Name &nbsp;</TableCell>
            <TableCell align="center">Price &nbsp;</TableCell>
            <TableCell align="center">Url &nbsp;</TableCell>
            <TableCell align="center">Tính năng &nbsp;</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody style={a}>
          {lissps.map((lisp,index)=>(
            <TableRow key={index}>
            <TableCell align="center">{lisp.id}</TableCell>
            <TableCell align="center">{lisp.name}</TableCell>
            <TableCell align="center">{lisp.price}</TableCell>
            <TableCell align="center">
              <img src={lisp.url} className='fixurladmin'></img>
            </TableCell>
            <TableCell align="center">
              <button className='btn' onClick={function(e){
                btnDelet(e,lisp,index);
              }}>Xóa</button>
              &nbsp;<button className='btn'
              onClick={function(e){
                submithanler(e,lisp,index);
              }}
              >Sửa</button>
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
      </div>
    </div>
  );
};

export default Admin;
