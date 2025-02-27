"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

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
    try {
      const token = localStorage.getItem("user");
      const response =await axios.post(
        `http://localhost:3000/foodorderitems/${food._id}`,
        {count: count},
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = parseInt(food.price) * count;
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
                    className="border rounded-full px-4"
                    onClick={() => setCount(count - 1)}
                  >
                    <Minus size={12} />
                  </button>
                  <div className="rounded-full border  py-[2px] px-4 items-center flex">
                    {count}
                  </div>
                  <button
                    className="border rounded-full  py-[2px] px-4"
                    onClick={() => setCount(count + 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <Button
                className="w-full rounded-full"
                type="submit"
                onClick={addToCart}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="w-[50%]"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ProductInfo;
