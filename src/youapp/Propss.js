import React from 'react'
import Prop2 from './Prop2';

const Propss = () => {
    const abc = function(){
       return <h1> Props </h1>
    }
    return (
        <Prop2 abc={abc()}/>
    )
}

export default Propss
