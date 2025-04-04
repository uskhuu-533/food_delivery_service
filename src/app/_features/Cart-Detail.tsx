"use client";

import { useEffect, useState } from "react";

import Logo from "../../components/icons/Logo";
import CartItem from "../_components/Cart-Item";
import { addToOrder, getUserCart } from "@/utils/request";
import { Button } from "../../components/ui/button";
import { useUser } from "@/provider/User-Provider";
import { toast } from "sonner";
import { useLoading } from "@/provider/LoaderProvider";
import { useDebounceLoading } from "@/provider/DebounceLoaderProvider copy";
import { LoaderIcon } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";

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
const {debounceLoading} = useDebounceLoading()
  const { setLoading } = useLoading();
  const { user, setOpenAddressDialog} = useUser();
  const getCartItems = async () => {
    try {
      const response = await getUserCart();
      setCartItems(response);
    } catch (error) {
      console.log(error);
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
    if (cartItems.length === 0) return;
    if (debounceLoading) return
    if (user?.address) {
      setLoading(true);
      await addToOrder(cartItems, totalPrice, getCartItems);
      setLoading(false);
      toast(`Checked out ${cartItems.length} items`, {
        position: "top-center",
      });
    } else {
      toast("Address not found, Add your address", {
        description: "",
        action: {
          label:<div className="z-50 cursor-pointer">add address</div> ,
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

        <SheetClose className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add foods
        </SheetClose>
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
          {debounceLoading ? (<LoaderIcon className="animate-spin"/>):(<p>{totalPrice + 0.99}</p>)}
        </div>
        <Button
          className={`w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF] lg:text-sm lg:py-[2px] ${
            cartItems.length < 1 && "cursor-not-allowed"
          } ${debounceLoading && " cursor-not-allowed "}`}
          onClick={addOrder}
        >
          Check out
        </Button>
      </div>
    </div>
  );
};
export default CartDetail;
