"use client";

import { Map, Soup, Timer } from "lucide-react";
import OrderItem from "./Order-Item";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  order: order;
};
type order = {
  foodOrderItems: string[];
  status: string;
  createdAt: Date;
  user: string;
  totalPrice: number;
};

const OrderList = ({ order }: Props) => {
    const [address, setAddress] = useState("")
    useEffect(() => {
        const getAddress = async () => {
          const token = localStorage.getItem("user");
          try {
            const response = await axios.get(
              `http://localhost:3000/users/address`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setAddress(response.data);
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
        {order.foodOrderItems.map((orderItem: string, index) => (
          <OrderItem key={index} itemId={orderItem} />
        ))}
        <div className="w-full flex items-center gap-2">
        <Timer size={16} stroke="#09090B80"/>
      <p>{(order.createdAt).toString().split("T")[0]}</p>
      </div>
      <div className="w-full flex items-center gap-2">
        <Map size={16} stroke="#09090B80"/>
      <p>{address}</p>
      </div>
      </div>
      
    </div>
  );
};
export default OrderList;
