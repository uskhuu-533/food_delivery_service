"use client"

import { useEffect, useState } from "react"
import Category from "../_components/Category"
import axios from "axios"
import CategoryFoods from "./Category-Food-List"

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
                const response = await axios.get(`http://localhost:3000/category`)
                console.log(response);
                
                if(Array.isArray(response.data)){
                    setCategory(response.data)
                }
            }catch(err){
                console.log(err);
                
            }
        }
        fetchFoodByCategory()
    },[])
    return(
        <div className="w-screen h-fit flex dark:text-white justify-center">
            <div className="max-w-[1264px] w-full h-fit flex py-8 flex-col gap-8">
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