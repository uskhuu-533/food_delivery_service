'use client'

import axios from "axios";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    foods : foods,
    getCartItems :Function
}
type food = {
    food_image: string | undefined;
    food_name: string;
    food_description: string;
    price: number;
    _id: string;
  };
type foods = {
    food : string
    quantity : number,
    _id : string
}
const CartItem = ({foods, getCartItems}:Props) => {
    const [foodDetail, setFoodDetail] = useState<food>({
      food_image: undefined,
      food_name: '',
      food_description: '',
      price: 0,
      _id: ""
    })
    
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
      const plusItem = async () => {
        try {
          const response =await axios.put(`http://localhost:3000/foodorderitems/${foods._id}`, {count : 1})

          getCartItems()
        } catch (error) {
          console.log(error);
          
        }
      }
      const minusItem = async () => {
        if (foods.quantity <= 0) return
        try {
          const response =await axios.put(`http://localhost:3000/foodorderitems/${foods._id}`, {count : -1}
          )
     
          getCartItems()
          
        } catch (error) {
          console.log(error);
          
        }
      }
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
                    <div className="justify-between flex w-full">
                      <div className="flex"> 
                        <Minus onClick={minusItem}/>
                        <div>{foods.quantity}</div>
                        <Plus onClick={plusItem}/>
                      </div>
                      <div>${foods.quantity*foodDetail?.price}</div>
                    </div>
                </div>
            </div>
    )
}
export default CartItem