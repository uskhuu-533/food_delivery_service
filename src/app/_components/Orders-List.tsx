"use client";

import { Map, Soup, Timer } from "lucide-react";

import { useEffect, useState } from "react";
import { getUserAddress } from "@/utils/request";


type Props = {
  order: order;
};
type order = {
  orderItems: item[];
  status: string;
  createdAt: Date;
  user: string;
  totalPrice: number;
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
const OrderList = ({ order }: Props) => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await getUserAddress();
        setAddress(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col p-3 gap-3 border-b border-dashed">
      <div className="w-full flex justify-between">
        <p>${order.totalPrice}</p>
        <div>{order.status}</div>
      </div>
      <div className="flex flex-col text-[#09090B80]">
        {order.orderItems.map((item :item, index) => (
           <div key={index} className="flex w-full flex-col">
           <div className="flex justify-between">
             <div className="flex gap-2 items-center">
               <Soup size={16} />
               <p>{item.food.food_name}</p>
             </div>
             <div>x{item.quantity}</div>
           </div>
         </div>
        ))}
        <div className="w-full flex items-center gap-2">
          <Timer size={16} stroke="#09090B80" />
          <p>{order.createdAt.toString().split("T")[0]}</p>
        </div>
        <div className="w-full flex items-center gap-2">
          <Map size={16} stroke="#09090B80" />
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};
export default OrderList;
