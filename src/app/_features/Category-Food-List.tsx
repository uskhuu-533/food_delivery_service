"use client";

import { useEffect, useState } from "react";
import ProductInfo from "../_components/Product-Info";
import { useQueryState } from "nuqs";
import { getFood } from "@/utils/request";

type Props = {
  category: string | null;
  categoryTitle : string | undefined
};

type food = {
  food_image: string;
  food_name: string;
  food_description: string;
  price: string;
  _id : string
};

const CategoryFoods = ({ category, categoryTitle }: Props) => {
  const [foods, setFoods] = useState([]);
  const [categoryId] = useQueryState("categoryid");
  const getFoods = async () => {
    if (!category) return
    try {
      const response =await getFood(category)
      setFoods(response);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  
  useEffect(() => {
    getFoods();
  }, [categoryId]);

  return (
    <div className="w-full h-fit rounded-md  flex flex-col gap-3 p-8">
      <p className="text-2xl font-semibold">{categoryTitle}</p>
      <div className="grid grid-cols-3 gap-6">
        {foods.map((food: food, index) => (
          <div
            key={index}
            className="h-[100px] xl:h-[350px] lg:h-[305px] md:h-[200px] sm:[150px] text-black rounded-lg bg-white flex flex-col p-4 gap-2"
          >
            <div className="w-full h-[70%] relative overflow-hidden rounded-md flex items-center">
              <img
                src={`${food.food_image}`}
                alt="food"
                className="w-full scale-100"
              />
              <ProductInfo food={food} />
            </div>
            <div className="w-full flex justify-between">
              <p className="text-[#EF4444] text-xl font-semibold">
                {food.food_name}
              </p>
              <p className="text-xl">${food.price}</p>
            </div>
            <div className="text-md">{food.food_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryFoods;
