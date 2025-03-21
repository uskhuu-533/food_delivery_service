"use client";

import { useEffect, useState } from "react";

import Logo from "../../components/icons/Logo";
import CartItem from "../_components/Cart-Item";
import { addToOrder, fetchFoodDetail, getUserCart } from "@/utils/request";
import { Button } from "../../components/ui/button";
import { useUser } from "@/provider/User-Provider";
import { toast } from "sonner";

type CartItemType = {
  food: food;
  quantity: number;
  _id: string;
};

type food = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};

const CartDetail = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const { address, setOpenAddressDialog, openAddressDialog } = useUser();
  console.log(openAddressDialog);

  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await getUserCart();
      setCartItems(response);

      setLoading(false);
      console.log(loading);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + Number(item.food.price) * item.quantity,
    0
  );

  useEffect(() => {
    getCartItems();
  }, []);
  const addOrder = async () => {
    if (address) {
      await addToOrder(cartItems, totalPrice, getCartItems);
    } else {
      toast("Address not found, Add your address", {
        description: "",
        action: {
          label: "add address",
          onClick: () => {
            setOpenAddressDialog(true);
          },
        },
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 lg:gap-3 ">
      <div className="p-4 w-full rounded-xl h-[60%] bg-[#FFFFFF] flex flex-col gap-5 overflow-scroll">
        <h1 className="font-bold text-xl lg:text-md">My cart</h1>

        {cartItems.length === 0 ? (
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
              food={item.food}
              itemId={item._id}
              quantity={item.quantity}
              getCartItems={getCartItems}
            />
          ))
        )}

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
        <Button
          className="w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF] lg:text-sm lg:py-[2px]"
          onClick={addOrder}
        >
          Check out
        </Button>
      </div>
    </div>
  );
};
export default CartDetail;
