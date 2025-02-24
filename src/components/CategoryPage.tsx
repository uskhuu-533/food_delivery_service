"use client"

import { useEffect, useState } from "react"
import Category from "./Category"
import axios from "axios"
import CategoryFoods from "./Category-Food-List"
import { useQueryState } from 'nuqs'
type category ={
    title :string,
    foods : Array<food>
}
type food = {
    food_image : string,
    food_name :string,
    food_description : string,
    price : string
}

const MenuContainerCategory = () => {
    const [category] = useQueryState("category")
    const [categories, setCategories] = useState<category[]>([])
    useEffect(()=>{
        const fetchFoodByCategory = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/category`)
                console.log(response);
                
                if(Array.isArray(response.data)){
                    setCategories(response.data)
                }
            }catch(err){
                console.log(err);
                
            }
        }
        fetchFoodByCategory()
    },[])
   
    
    return(
        <div className="w-screen h-fit flex dark:text-white justify-center">
            <div className="max-w-[1264px] w-full h-fit flex flex-col gap-8 mt-[100px]">
                <Category categories={categories} />
                 <div className="flex flex-col w-full gap-6 pb-10">
                        <CategoryFoods category={category}/>
                 </div>
            </div>
        </div>
    )
}
export default MenuContainerCategory