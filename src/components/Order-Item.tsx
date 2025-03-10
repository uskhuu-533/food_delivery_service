'use client'

import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
    itemId : string
}
const OrderItem = ({itemId}:Props) => {
    const [item, setItem] = useState([]) 
    const getCartItem = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/foodorderitems/${itemId}`);
          setItem(response.data);
          console.log(response);
          
        } catch (error) {
          console.log(error);

        }
      };
      useEffect(()=>{
        getCartItem()
      },[])
    
    return(
        <div></div>
    )
}
export default OrderItem