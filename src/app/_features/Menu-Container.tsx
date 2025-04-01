"use client";


import Category from "../_components/Category";
import CategoryFoods from "./Category-Food-List";
import { useCategory } from "@/provider/CategoryProvider";


const MenuContainer = () => {
  const { categories } = useCategory();

console.log(categories);

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
