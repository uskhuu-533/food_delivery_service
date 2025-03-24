"use client";

import Category from "../../_components/Category";
import CategoryFoods from "../../_features/Category-Food-List";
import { useQueryState } from "nuqs";

const MenuContainerCategory = () => {
  const [categoryId] = useQueryState("categoryid");

  return (
    <div className="w-screen h-fit flex dark:text-white justify-center">
      <div className="max-w-[1264px] w-full h-fit flex flex-col gap-8 mt-[100px]">
        <Category/>
        <div className="flex flex-col w-full gap-6 pb-10">
          {categoryId && (
            <CategoryFoods category={categoryId} categoryTitle={undefined} />
          )}
        </div>
      </div>
    </div>
  );
};
export default MenuContainerCategory;
