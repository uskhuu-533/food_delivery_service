"use client";

import Logo from "../../components/icons/Logo";
import { useEffect, useState } from "react";
import OrderList from "../_components/Orders-List";
import { getOrders } from "@/utils/request";
import { SheetClose } from "@/components/ui/sheet";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const getOrder = async () => {
    try {
      const response = await getOrders();
      setOrderHistory(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="w-full h-full bg-[#FFFFFF] rounded-lg">
      <div className="p-4 w-full rounded-xl h-full bg-[#FFFFFF] overflow-scroll flex flex-col gap-5">
        <h1 className="font-bold text-xl">Order history</h1>
        {orderHistory.length === 0 ? (
          <>
            {" "}
            <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
              <Logo />
              <div className="text-lg font-semibold">No Orders Yet? </div>
              <div className="text-[#71717A] text-center text-sm">
                🍕 &quot;You haven&apos;t placed any orders yet. Start exploring our menu
                and satisfy your cravings!&quot;
              </div>
            </div>
            <SheetClose className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
              Add food
            </SheetClose>
          </>
        ) : (
          orderHistory.map((order, index) => (
            <OrderList order={order} key={index} />
          ))
        
        )}
      </div>
    </div>
  );
};
export default OrderHistory;
