"use client";

import axios from "axios";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Props = {
  item: item;
  getCartItems: Function;  
};

type food = {
  food_image: string | undefined;
  food_name: string;
  food_description: string;
  price: number;
  _id: string;
};

type item = {
  food: string;
  quantity: number;
  _id: string;
};

const CartItem = ({ item, getCartItems}: Props) => {

  const [foodDetail, setFoodDetail] = useState<food>({
    food_image: undefined,
    food_name: "",
    food_description: "",
    price: 0,
    _id: "",
  });

  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [debouncedQuantity] = useDebounce(localQuantity, 1000);

  const getFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/food/orderitem/${item.food}`
      );
      setFoodDetail(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  useEffect(() => {
    if (debouncedQuantity === item.quantity) return;

    const updateQuantity = async () => {
      const delta : number = debouncedQuantity - item.quantity;

      if (delta === 0) return;

      try {
        await axios.put(`http://localhost:3000/foodorderitems/${item._id}`, {
          count: delta,
        });
        getCartItems();

      } catch (error) {
        console.log(error);
        setLocalQuantity(item.quantity);
      }
    };
    
    updateQuantity();
  }, [debouncedQuantity, item._id, item.quantity, getCartItems]);

  const plusItem = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  const minusItem = () => {
    if (localQuantity <= 1) return;
    setLocalQuantity((prev) => prev - 1);
  };

  const removeItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/foodorderitems/${item._id}`
      );
      console.log(response.data);

      getCartItems();
    } catch (error) {
      console.log(error);
    }
  };
const price = (localQuantity * (foodDetail?.price || 0)).toFixed(2)

  return (
    <div className="w-full h-[120px] flex gap-[10px]">
      <div className="w-[124px] h-full relative rounded-md overflow-hidden">
        <img
          className="w-[124px] h-auto absolute"
          src={foodDetail?.food_image}
          alt={foodDetail?.food_name}
        />
      </div>
      <div className="flex w-[70%] flex-col gap-6">
        <div className="w-full flex h-[60%] justify-between">
          <div>
            <h1>{foodDetail?.food_name}</h1>
            <p>{foodDetail?.food_description}</p>
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
