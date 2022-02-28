import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../youcss/cssbig.css";
import "./../youcss/cssmin.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCookies } from "react-cookie";
import Admin from "./Admin";
import Navmenu from "./Navmenu";
import Chan from "./Chan";
import KhoaMobi from "./KhoaMobi";
import Comment from "./Comment";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Home = () => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "name",
    "pass",
    "loai",
    "id",
    "ulmes",
  ]);
  const dm = [];
  const sp = [];
  const [tims,setTims]=useState();
  const [dempt,setdempt]=useState(sp);
  const [sopt,setsopt]=useState();
  const [page,setpage]=useState(1);
  const [lissdm, setlissdm] = useState(dm);
  const urldm = "https://6188f8b6d0821900178d7680.mockapi.io/danhmuc";
  const [lissps, setlisssp] = useState(sp);
  const [vitridm, setvitridm] = useState(1);
  const urlsp = `https://6188f8b6d0821900178d7680.mockapi.io/danhmuc/${vitridm}/sanpham`;
  // gio hang
  const gh = {
    name: "",
    price: "",
    id: "",
    userId: "",
    url : "",
  };
  const [giohang, setgiohang] = useState(gh);
  const urlgio = `https://619095e7f6bf450017484c3b.mockapi.io/user/${cookies.id}/giohang`;
  
  useEffect(() => {
    document.title = "Grass Tea";  
  }, []);
  // dm
  console.log(lissps);
  useEffect(() => {
    axios.get(urldm).then((e1) => {
      const { data } = e1;
      setlissdm(data);
    });
  }, []);
  // dem so phan tu trong muc
  function ax(dempt){
    let am = Math.ceil(dempt.length /7);
    return am;
  }
  // console.log('dem',ax(dempt));
  useEffect(() => {
    axios.get(urlsp)
    .then((e) => {
      const { data } = e;
      setdempt(data);
      setsopt(ax(dempt));
    });
  }, [vitridm,lissps]);
  // sp
  useEffect(() => {
    const limit = 7; 
    // react có cái limit  minh dang dung de gioi hạn phần tử mỗi trang thông qua sửa url
    axios.get(urlsp+'?limit=' + limit + '&page=' + page)
    .then((e) => {
      const { data } = e;
      setlisssp(data);
    });
  }, [vitridm,page]);
  //
  const danhmucOnChange = function (event) {
    setvitridm(event.target.value);
  };
  // them vao gio
  const ckmua = function (params) {
    if(cookies.name == null){
      alert('Đăng nhập để tiếp tục')
    }else{
      alert('Đã thêm vào giỏ hàng')
    }
  }  
  const BtnMua = function (e, name, price,url) {
    ckmua();
    // console.log(e);
    // console.log(name);
    // console.log(price);
    axios
      .post(urlgio, {
        name: name,
        price: price,
        url : url,
      })
      .then((e) => {
        const { data } = e;
        // console.log("data", data);
      });
  };
  const Btncoment = function (id) {
    setCookies("ulmes",`https://6188f8b6d0821900178d7680.mockapi.io/danhmuc/${vitridm}/sanpham/${id}`, {
      path: "/",
    });
    // console.log(cookies.ulmes);
  };
  // const pagek= function(){
  //   setpage(page+1)
  // }
  const onChangpage = function(e,value){
    setpage(value)
  }
  const timOnchange = function(e){
    setTims(e.target.value); 
  } 
  let timsp = lissps.filter(function(e) {
    return e.name == tims;
  });
  const btntimsp = function(){
    setlisssp(timsp);
  }
  return (
    <Fragment> 
      <Navmenu/>
      <div className="divnen2">
        <div className="bodi">
          <div className="mesp">
            
            <div className="khungsp">
              <img
                className="anhsp2"
                src="https://th.bing.com/th/id/OIP.hLTzgUBmKXb6ZFqtRMAgbgHaE7?pid=ImgDet&rs=1"
              ></img>
              <h3 className='name2'>Menu</h3>
               Danh Mục : &emsp;
              <select onChange={danhmucOnChange} className='lec'>
                {lissdm.map((lisdm, index) => (
                  <option key={index} value={lisdm.id}>
                    {lisdm.name}
                  </option>
                ))}
              </select><br/>
              <p>Tìm SP : <input onChange={timOnchange} className="cltim"></input> 
              <button onClick={btntimsp} className="clbtntim">Tìm</button></p>
            </div>

            {lissps.map((lissp, index) => (
              <div className="khungsp" key={lissp.id} value={lissp.id}>
                <img
                  className="anhsp"
                  src={lissp.url}
                ></img>
                <h3 className="namesp" name="name">
                  {lissp.name}
                </h3>
                <p className="giasp" name="price">
                  Giá sản phẩm :{lissp.price} VND
                </p>
                <button
                  className="btn"
                  onClick={function (e, name, price,url) {
                    name = lissp.name;
                    price = lissp.price;
                    url = lissp.url;
                    BtnMua(e, name, price,url);
                  }}
                >
                  Mua
                </button>
                &emsp;
                <button className="btn"
                 onClick={function (id) {
                  id = lissp.id;
                  Btncoment(id);
                }}
                >
                  <a href='/comment'>Đánh giá</a></button>
              </div>
            ))}
          </div>
        </div>
        <Stack spacing={2} className='page'>
        <Pagination
        onChange={onChangpage}
        size="large" count={ax(dempt)} siblingCount={0} className='page1'></Pagination>
        </Stack>
        <nav aria-label="Page navigation example">
</nav>
        <Chan />
      </div>
    </Fragment>
  );
};

export default Home;
