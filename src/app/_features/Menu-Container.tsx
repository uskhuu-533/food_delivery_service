"use client"

import { useEffect, useState } from "react"
import Category from "../_components/Category"
import axios from "axios"
import CategoryFoods from "./Category-Food-List"
import { getCategory } from "@/utils/request"

type category ={
    title :string,
   _id : string
}
type food = {
    food_image : string,
    food_name :string,
    food_description : string,
    price : string
}

const MenuContainer = () => {
    const [categories, setCategory] = useState<category[]>([])
    useEffect(()=>{
        const fetchFoodByCategory = async () => {
            try{
                const response = await getCategory()
                console.log(response);
               
                    setCategory(response)
                
            }catch(err){
                console.log(err);
                
            }
        }
        fetchFoodByCategory()
    },[])
    return(
        <div className="w-screen h-fit flex dark:text-white justify-center">
            <div className="max-w-[1440px] w-full h-fit flex py-8 flex-col gap-8">
                <Category categories={categories} />
                 <div className="flex flex-col w-full gap-6 pb-10">
                    {categories.map((category, index)=>(
                        <CategoryFoods categoryTitle={category.title} key={index} category={category._id}/>
                    ))}
                 </div>
            </div>
        </div>
    )
}
export default MenuContainer