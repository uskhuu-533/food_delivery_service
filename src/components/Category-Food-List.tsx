"use client";

import { useEffect, useState } from "react";
import ProductInfo from "./Product-Info";
import { useQueryState } from "nuqs";
import { getFood } from "@/utils/request";

type Props = {
  category: string | null;
  categoryTitle : string | undefined
};
type category = {
  title: string;
  _id: string | null;
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
    <div className="w-full h-fit rounded-md  flex flex-col gap-3">
      <p className="text-2xl font-semibold">{categoryTitle}</p>
      <div className="flex flex-wrap gap-6">
        {foods.map((food: food, index) => (
          <div
            key={index}
            className="w-[271px] h-[257px] text-black rounded-md bg-white   flex flex-col p-4"
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
              <p className="text-[#EF4444] text-lg font-semibold">
                {food.food_name}
              </p>
              <p>${food.price}</p>
            </div>
            <div className="text-[12px]">{food.food_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryFoods;
