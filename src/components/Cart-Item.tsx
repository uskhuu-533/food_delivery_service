'use client'

import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    foods : foods
}
type food = {
    food_image: string;
    food_name: string;
    food_description: string;
    price: string;
    _id: string;
  };
type foods = {
    food : string
    count : number
}
const CartItem = ({foods}:Props) => {
    const [foodDetail, setFoodDetail] = useState<food>()
    const getFood = async () => {
        try {
          const response =await axios.get(
            `http://localhost:3000/food/id/${foods.food}`);
          console.log(response);
          setFoodDetail(response.data)
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
        getFood()
      },[])
    return(
        <div className="w-full h-[120px] flex gap-[10px]">
              <div className="w-[124px] h-full relative rounded-md overflow-hidden">
                <img className="w-[124px] h-auto absolute" src={foodDetail?.food_image}/>
              </div>
              <div className="flex w-[70%] flex-col gap-6">
                    <div className="w-full flex h-[60%] justify-between">
                        <div>
                            <h1>{foodDetail?.food_name}</h1>
                            <p>{foodDetail?.food_description}</p>
                        </div>
                        <button className="w-9 h-9 items-center flex justify-center border=[#EF4444] border rounded-full"><X stroke="#EF4444" size={16}/></button>
                    </div>
                    <div className="justify-between w-full"></div>
                </div>
            </div>
    )
}
export default CartItem