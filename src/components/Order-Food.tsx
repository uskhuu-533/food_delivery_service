"use client";

import { getCartItems, getFoodByOrder } from "@/utils/request";
import { Soup } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  item: item;
};
type item = {
  food: food;
  quantity: number;
};
type food = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};
const OrderFood = ({ item }: Props) => {
  

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Soup size={16} />
          <p>{item.food.food_name}</p>
        </div>
        <div>x{item.quantity}</div>
      </div>
    </div>
  );
};
export default OrderFood;
