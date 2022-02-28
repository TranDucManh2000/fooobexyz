import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';

export const Danhmuc = ({ami,bmi}) => {
    const dm = [];
    const data0 = {
        id:'',
        name:'',
        quaty:''
    };
    const [lissdm,setlissdm] = useState(dm);
    const [formData,setFormData] = useState(data0);
    const urldm = 'https://6188f8b6d0821900178d7680.mockapi.io/danhmuc';

    useEffect(() => {
        axios.get(urldm)
        .then(e =>{
            const {data} = e;
            setlissdm(data);
            console.log(data);
        })
    },[])
    const inputOnChang = function(params) {
        const {name,value,} = params.target;
        console.log('name',name);
        console.log('vali',value);
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    const btnThem = function() {

            axios.post(urldm,formData)
            .then(e =>{
                const{data} = e;
                console.log('data',data);
                setlissdm([
                    ...lissdm,data
                ]);
            })

    }
    console.log('ni',bmi);
    return (
        <div>
            <input onChange={inputOnChang} type="name" name="name"/> 
            {/* <input onChange={inputOnChang} type="name" name="quaty"/> */}
            <button onClick={btnThem}>them</button>
            {
                lissdm.map( lisdm =>(
                  <h1 key={lisdm.id}>{lisdm.name}{lisdm.quaty}</h1>
                ))
            }
            
        </div>
    )
}
export default Danhmuc;
