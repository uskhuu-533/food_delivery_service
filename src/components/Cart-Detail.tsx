'use client'

import axios from "axios";
import { useEffect, useState } from "react";

import AddOrder from "./Add-Order";
import Logo from "./icons/Logo";
import CartItem from "./Cart-Item";

type CartItemType = {
  food: string;
  quantity: number;
  _id: string;
};

type FoodDetail = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};

const CartDetail = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [foodDetails, setFoodDetails] = useState<{[key: string]: FoodDetail}>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);


  const getCartItems = async () => {
    const token = localStorage.getItem("user")
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/foodorderitems`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setCartItems(response.data);
      
      await Promise.all(response.data.map((item: CartItemType) => getFoodDetail(item.food)));
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  const getFoodDetail = async (foodId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/food/orderitem/${foodId}`
      );
      setFoodDetails(prev => ({
        ...prev,
        [foodId]: response.data
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(foodDetails).length > 0 && cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        const foodDetail = foodDetails[item.food];
        return foodDetail ? sum + (foodDetail.price * item.quantity) : sum;
      }, 0);
      
      setTotalPrice(total);
    }
  }, [cartItems, foodDetails]);

  // Initial load
  useEffect(() => {
    getCartItems();
  }, []);
  

  return (
    <div className="w-full h-full flex flex-col gap-6 lg:gap-3 ">
      <div className="p-4 w-full rounded-xl h-[60%] bg-[#FFFFFF] flex flex-col gap-5 overflow-scroll">
        <h1 className="font-bold text-xl lg:text-md">My cart</h1>
        {loading == false ?(<>{cartItems.length === 0 ? (
          <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
            <Logo />
            <div className="text-lg font-semibold">Your cart is empty</div>
            <div className="text-[#71717A] text-center text-sm">
              Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
              cravings!
            </div>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              getCartItems={getCartItems}
            />
          ))
        )}</>):(<div>loading ...</div>)}
        <button className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add foods
        </button>
      </div>
      <div className="p-4 h-[30%] bg-[#FFFFFF] rounded-xl flex flex-col gap-5 lg:gap-1">
        <h1 className="text-lg font-semibold lg:text-md">Payment info</h1>
        <div className="text-[#71717A] lg:text-sm">
          <div className="flex justify-between">
            <p>Items</p>
            <p>{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>0.99</p>
          </div>
        </div>
        <div className="flex justify-between text-[#71717A]">
          <p>Total</p>
          <p>{totalPrice + 0.99}</p>
        </div>
       <AddOrder getCartItems={getCartItems} setCartItems={setCartItems} cartItems={cartItems} totalPrice={totalPrice}/>
      </div>
    </div>
  );
};
export default CartDetail;
