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

const Qltk = () => {
    const urltk = 'https://619095e7f6bf450017484c3b.mockapi.io/user/';
    const tk = [];
    const [tkUser,settkUser]=useState(tk);
    const [load,setload]=useState();
    // tk
    useEffect(() => {
      axios.get(urltk).then((e) => {
        const { data } = e;
        settkUser(data);
      });
    }, [load]);
    const btnDelet = function(e,lisuser,index){
        axios.delete(urltk+lisuser.id)
        .then((e)=>{
            const {data}=e;
            setload(data);
        })
    }
  
    return (
        <div>
            <Navmenu></Navmenu>
            <div className="bodys">
            <div className="bodys">
          {/* <div className='menua'>
            Name : <input type="name" name="name"  className='in'></input> <br/>
            Price : <input type="name" name="price" className='in'></input><br/>
            Url : <input type="name" name="url" className='in'></input><br/><br/>
            <button className="btn">Them</button>
          </div> */}
        <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1500 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell align="center">ID &nbsp;</TableCell>
            <TableCell align="center">Tk &nbsp;</TableCell>
            <TableCell align="center">Loai &nbsp;</TableCell>
            <TableCell align="center">Tính năng &nbsp;</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {tkUser.map((lisuser,index)=>(
            <TableRow key={index}>
            <TableCell align="center">{lisuser.id}</TableCell>
            <TableCell align="center">{lisuser.name}</TableCell>
            <TableCell align="center">{lisuser.loai}</TableCell>
            <TableCell align="center">
              <button className='btn' onClick={function(e){
                btnDelet(e,lisuser,index);
              }}>Xóa</button>
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>

            </div>
        </div>
    )
}

export default Qltk
