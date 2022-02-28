import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import { useCookies } from "react-cookie";
import Navmenu from './Navmenu';
import Chan from './Chan';

const Category = () => {
    const cate =[];
    const [tong,settong]=useState();
    const [cateGory,setCateGory] = useState(cate);
    const [cookies, setCookies,removeCookie] = useCookies(["name","pass","loai","id"]);
    const urlct = `https://619095e7f6bf450017484c3b.mockapi.io/user/${cookies.id}/giohang/`;

    useEffect(() => {
        document.title = "Gio hang";  
      }, []);

    useEffect(() => {
        axios.get(urlct)
        .then(e=>{
            const {data} = e;
            setCateGory(data);
        })
    }, []);

    const huyOnclick = function(e,cated,index){
      if(window.confirm(`Bạn muốn hủy đơn ${cated.name} ?`) == true){
        axios.delete(urlct + cated.id )
        .then(e=>{
          const lisctmoi = cateGory.filter(function(value,indexi){
            return indexi == index ? false:true;
          })
            setCateGory(lisctmoi);
        })
      }
      
    }
    const thanhtoanOnclick = function(){
      alert('tính năng đang hoàn thiện')
    }

    var uni = cateGory
    .map(v => v['price']);

    // function sumTien(uni){
    //   let sum = 0;
    //   for (let i = 0; i < uni.length; i++){
    //       sum += Number(uni[i]);
    //   }
    //   return sum;
    // }
    // console.log('t',sumTien(uni)); 
    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < uni.length; i++){
            sum += Number(uni[i]);
        }
         settong(sum);
    }, [cateGory])
    // console.log('tong',tong); 


    // loc sp trung lap
    var locArray = cateGory
    .map(v => v['name'])
    .map((v, i, array) => array.indexOf(v) === i && i)
    .filter(v => cateGory[v])
    .map(v => cateGory[v]);
    // console.log('un',locArray);
//   const pounds = [11, 21, 16, 19, 46, 29, 46, 19, 21];
//   const Oncount = pounds.reduce( (data,cate) => {
//   // console.log('data',data);
//   // console.log('pound',pound)
//   data[cate] = (data[cate] || 0) + 1 ;
//   return data;
// } , {})
// console.log(Oncount); // { '11': 1, '16': 1, '19': 2, '21': 2, '29': 1, '46': 2 }
   return (
        <div>
            <Navmenu/>
            <div className="divnen2">
                <div className='ktrong'></div>
            {
                cateGory.map((cated,index)=>(
                    <div className="khungsp" key={index}>
                    <img
                      className="anhsp"
                      src={cated.url}
                    ></img>
                    <h3 className="namesp" name="name">
                    {cated.name}
                    </h3>  
                    <p className="giasp" name="price">
                      Giá sản phẩm :{cated.price} VND
                    </p>
                    <button className="btn" onClick={function(e){
                      // name = cated.name
                      // id = cated.id
                      // console.log(index);
                      huyOnclick(e,cated,index)
                    }}>Hủy Đơn</button>
                  </div>
                ))
            }   <div className='ttoan'>
                  <h2 className='hd'>Tổng Hóa Đơn : {tong} VND</h2>
                  <button className="btntt" onClick={thanhtoanOnclick}>Thanh Toán</button>
                </div>
                {/* <div className='ktrong'></div> */}
            
            </div><Chan/>
        </div>
    )
}

export default Category
