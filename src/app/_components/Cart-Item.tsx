/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteItem, putOrderItem } from "@/utils/request";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  food: food;
  getCartItems(): Promise<void>;
  itemId: string;
  quantity: number;
};

type food = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};

const CartItem = ({ food, getCartItems, itemId, quantity }: Props) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [debouncedQuantity] = useDebounce(localQuantity, 1000);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (debouncedQuantity === quantity) return;

    const updateQuantity = async () => {
      const delta: number = debouncedQuantity - quantity;

      if (delta === 0) return;
      try {
        await putOrderItem(itemId, delta);
        getCartItems();
      } catch (error) {
        console.log(error);
        setLocalQuantity(quantity);
      }
    };

    updateQuantity();
  }, [debouncedQuantity, getCartItems, itemId, quantity]);

  const plusItem = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  const minusItem = () => {
    if (localQuantity <= 1) return;
    setLocalQuantity((prev) => prev - 1);
  };

  const removeItem = async () => {
    try {
      const response = await deleteItem(itemId);
      console.log(response);

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };
  const price = (localQuantity * (food?.price || 0)).toFixed(2);

  return (
    <div className="w-full h-[120px] flex gap-[10px]">
      <div className="w-[124px] h-full relative rounded-md overflow-hidden">
        <img
          className="w-[124px] h-auto absolute"
          src={food.food_image}
          alt={food.food_name}
        />
      </div>
      <div className="flex w-[70%] flex-col gap-6">
        <div className="w-full flex h-[60%] justify-between">
          <div>
            <h1>{food.food_name}</h1>
            <p>{food.food_description}</p>
          </div>
          <button
            onClick={removeItem}
            className="w-9 h-9 items-center flex justify-center border-[#EF4444] border rounded-full"
          >
            <X stroke="#EF4444" size={16} />
          </button>
        </div>
        <div className="justify-between flex w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={minusItem}
              className={`p-1 rounded-full ${
                localQuantity <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              disabled={localQuantity <= 1}
            >
              <Minus size={20} />
            </button>
            <div className="mx-2 min-w-6 text-center">{localQuantity}</div>
            <button
              onClick={plusItem}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Plus size={20} />
            </button>
          </div>
          <div>${price}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
