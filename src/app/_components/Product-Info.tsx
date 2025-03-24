"use client";

import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addToCartReq } from "@/utils/request";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  food: food;
};
type food = {
  food_image: string;
  food_name: string;
  food_description: string;
  price: string;
  _id: string;
};
export function ProductInfo({ food }: Props) {
  const [count, setCount] = useState(1);
  const addToCart = async () => {
    const response = await addToCartReq(food, count);
    if (response?.status === 200) {
      toast(
        <div className="flex text-xl text-[#EF4444] pl-10 items-center gap-5 justify-center">
          <Logo /> 
          <p >Added to cart</p>
        </div>,
        {
          description: "",
          position: "top-center",
        }
      );
    }
  };
  const totalPrice = parseInt(food.price) * count;
  const minusItem = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bottom-4 right-4 w-9 rounded-full absolute"
        >
          <Plus fill="orange" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[826px] sm:max-h-[412px] p-0 px-6">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex gap-6">
          <div className="h-full max-h-[362px] rounded-md w-[50%] relative overflow-hidden flex items-center">
            <img className="w-full h-auto" src={`${food.food_image}`} />
          </div>
          <div className="flex flex-col pt-8 h-full w-[50%] justify-between">
            <div>
              <h2 className="text-[#EF4444] text-2xl font-bold">
                {food.food_name}
              </h2>
              <p className="">{food.food_description}</p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full justify-between flex">
                <div className="">
                  <p className="text-md">Total price</p>
                  <p className="text-2xl font-bold">${totalPrice}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={minusItem}
                    className={`border rounded-full px-4 ${
                      count <= 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={count <= 1}
                  >
                    <Minus size={12} />
                  </button>
                  <div className="rounded-full border  py-[2px] px-4 items-center flex">
                    {count}
                  </div>
                  <button
                    className="border rounded-full  py-[2px] px-4"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <DialogClose
                className="bg-black text-white px-4 py-2 rounded-full"
                type="submit"
                onClick={addToCart}
              >
                Add to cart
              </DialogClose>
            </div>
          </div>
        </div>
        <DialogFooter className="w-[50%]"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ProductInfo;
