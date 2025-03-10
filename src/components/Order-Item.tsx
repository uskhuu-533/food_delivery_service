"use client";

import axios from "axios";
import { Soup } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  itemId: string;
};
type Item = {
food: string;
  quantity: number;
};
type food = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};
const OrderItem = ({ itemId }: Props) => {
  const [food, setFood ] = useState<food>({
    food_image: undefined,
    food_name: "",
    food_description: "",
    price: 0,
    _id: "",
  })
  const [item, setItem] = useState<Item>({
    quantity : 0,
    food : ""
  })
   const getCartItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/foodorderitems/${itemId}`
      );
      setItem(response.data)
      if (response.data) {
        getFood(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartItem();
  }, []);
  const getFood = async (data: Item) => {
    console.log(data);

    try {
      const res = await axios.get(
        `http://localhost:3000/food/orderitem/${data.food}`
      );
      setFood(res.data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Soup size={16}/>
          <p>{food.food_name}</p>
          </div>
        <div>x{item.quantity}</div>
      </div>
    </div>
  );
};
export default OrderItem;
