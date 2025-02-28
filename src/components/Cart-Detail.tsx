"use client";

import axios from "axios";
import Logo from "./icons/Logo";
import { useEffect, useState } from "react";
import CartItem from "./Cart-Item";
import AddOrder from "./Add-Order";

const CartDetail = () => {
  const [cartFood, setCartFood] = useState([]);
  const [itmesPrice, setItmesPrice] = useState<number>(0);
  const getCartItems = async () => {
    const token = localStorage.getItem("user");
    try {
      const response = await axios.get(`http://localhost:3000/foodorderitems`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(response.data);

      setCartFood(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);
  

  const totalPrice = itmesPrice + 0.99;
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="p-4 w-full rounded-xl h-[60%] bg-[#FFFFFF] flex flex-col gap-5 overflow-scroll">
        <h1 className="font-bold text-xl">My cart</h1>
        {cartFood.length === 0 ? (
          <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
            <Logo />
            <div className="text-lg font-semibold">Your cart is empty</div>
            <div className="text-[#71717A] text-center text-sm">
              Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
              cravings!
            </div>
          </div>
        ) : (
          cartFood.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              getCartItems={getCartItems}
            />
          ))
        )}
        <button className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add foods
        </button>
      </div>
      <div className="p-4 h-[30%] bg-[#FFFFFF] rounded-xl flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Payment info</h1>
        <div className="text-[#71717A]">
          <div className="flex justify-between">
            <p>Items</p>
            <p>{}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>0.99</p>
          </div>
        </div>
        <div className="flex justify-between text-[#71717A]">
          <p>Total</p>
          <p>{totalPrice}</p>
        </div>
       <AddOrder getCartItems={getCartItems} cartFood={cartFood}/>
      </div>
    </div>
  );
};
export default CartDetail;
