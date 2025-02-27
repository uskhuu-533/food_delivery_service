'use client'

import axios from "axios";
import Logo from "./icons/Logo";
import { useEffect, useState } from "react";
import OrderList from "./Orders-List";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([])
  const getOrder = async () => {
    const token = localStorage.getItem('user')
    try {
      const response = await axios.get(
        `http://localhost:3000/foodorder`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setOrderHistory(response.data)
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  } 
  useEffect(()=>{
    getOrder()
  },[])
  return (
    <div className="w-full h-full bg-[#FFFFFF] rounded-lg">
      <div className="p-4 w-full rounded-xl h-full bg-[#FFFFFF] flex flex-col gap-5">
        <h1 className="font-bold text-xl">Order history</h1>
       {orderHistory.length === 0 ? (<> <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
          <Logo />
          <div className="text-lg font-semibold">No Orders Yet? </div>
          <div className="text-[#71717A] text-center text-sm">
          🍕 "You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"
          </div>
        </div>
        <button className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add food
        </button></>):
        orderHistory.map((order, index)=> <OrderList order={order} key={index}/>)}
      </div>
    </div>
  );
};
export default OrderHistory;
