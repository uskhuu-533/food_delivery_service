"use client"

import { useEffect, useState } from "react"
import Category from "./Category"
import axios from "axios"
import CategoryFoods from "./Category-Food-List"

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
        <div className="w-screen h-fit flex justify-center">
            <div className="max-w-[1264px] w-full h-fit">
                <Category categories={categories} />
                 <div className="flex flex-col w-full gap-6 pb-10">
                    {categories.map((category, index)=>(
                        <CategoryFoods key={index} category={category}/>
                    ))}
                 </div>
            </div>
        </div>
    )
}
export default MenuContainer