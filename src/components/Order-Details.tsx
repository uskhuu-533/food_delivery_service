"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import CartDetail from "./Cart-Detail";
import OrderHistory from "./Order-History";
import { useState } from "react";
const OrderDetail = () => {
  const [tab, setTab] = useState("cart");
  return (
    <Sheet>
      <SheetTrigger>
        <div className="rounded-full flex items-center w-11 h-11 justify-center bg-[#FFFFFF]">
          <ShoppingCart stroke="black" size={16} />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[535px] sm:max-w-xl bg-[#404040] border-none flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>
            <div className="flex text-[#FFFFFF] gap-3">
              <ShoppingCart />
              <div>Order detail</div>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="w-full rounded-full py-1 px-2 bg-[#FFFFFF] flex gap-2">
          <button
            className="w-1/2 flex rounded-full justify-center py-1"
            onClick={() => setTab("cart")}
            style={tab==="cart"?{background:"#EF4444", color:"white"}:{}}
          >
            Cart
          </button>
          <button
            className="w-1/2 flex rounded-full justify-center py-1"
            onClick={() => setTab("order")}
            style={tab==="order"?{background:"#EF4444", color:"white"}:{}}
          >
            Order
          </button>
        </div>
        {tab === "order" && <OrderHistory />}
        {tab === "cart" && <CartDetail />}
      </SheetContent>
    </Sheet>
  );
};
export default OrderDetail;
