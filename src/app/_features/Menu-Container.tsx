"use client";

import { useEffect, useState } from "react";
import Category from "../_components/Category";
import axios from "axios";
import CategoryFoods from "./Category-Food-List";
import { getCategory } from "@/utils/request";
import { useCategory } from "@/provider/CategoryProvider";

type category = {
  title: string;
  _id: string;
  food_count: object[];
};
type food = {
  food_image: string;
  food_name: string;
  food_description: string;
  price: string;
};

const MenuContainer = () => {
  const {categories } = useCategory()
  return (
    <div className="w-screen h-fit flex dark:text-white justify-center">
      <div className="max-w-[1440px] w-full h-fit flex py-8 flex-col gap-8">
        <Category />
        <div className="flex flex-col w-full gap-6 pb-10">
          {categories
            .filter((category) => category.food_count.length > 0)
            .map((category, index) => (
              <CategoryFoods
                categoryTitle={category.title}
                key={index}
                category={category._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default MenuContainer;
