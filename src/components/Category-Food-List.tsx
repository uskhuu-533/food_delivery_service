'use client'

import { useEffect, useState } from "react"
import ProductInfo from "./Product-Info"
import axios from "axios"
import { useQueryState } from "nuqs"

type Props = {
    category : string | null
}

type food = {
    food_image : string,
    food_name :string,
    food_description : string,
    price : string
}

const CategoryFoods = ({category}:Props) => {
  const [foods, setFoods] = useState([])
  const getFood = async () =>{
    try{
  
      const response = await axios.get(`http://localhost:3000/food/${category}`)  
      setFoods(response.data)
    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=> {
    getFood()
  },[category])
    return(
        <div className="w-full h-fit rounded-md  flex flex-col gap-3">
        <p className="text-2xl font-semibold">{category}</p>
        <div className="flex flex-wrap gap-6">
        
          {foods.map((food:food, index)=>(
            <div key={index} className="w-[271px] h-[257px] text-black rounded-md bg-white   flex flex-col p-4">
              <div className="w-full h-[70%] relative overflow-hidden rounded-md flex items-center">
                <img src={`${food.food_image}`} alt="food" className="w-full scale-100"/>
                <ProductInfo food={food}/>
              </div>
              <div className="w-full flex justify-between">
                <p className="text-[#EF4444] text-lg font-semibold">{food.food_name}</p>
                <p>${food.price}</p>
              </div>
              <div className="text-[12px]">{food.food_description}</div>
            </div>
          ))}
         
        </div>
      </div>
    )
}
export default CategoryFoods