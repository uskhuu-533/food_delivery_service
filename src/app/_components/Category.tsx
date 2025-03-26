"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCategory } from "@/provider/CategoryProvider";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

const Category = () => {
  const router = useRouter();
  const { categories } = useCategory();
  const [categoryId, setCategory] = useQueryState("categoryid");
  const handleCategory = (_id: string | null) => {
    if (window.location.pathname === "/") {
      router.push(`/category?categoryid=${_id}`);
    } else if (window.location.pathname === `/category`) {
      console.log("worked");
      setCategory(_id);
    }
  };
  return (
    <div className="flex flex-col gap-9 w-full">
      <p className="text-2xl font-semibold">Categories</p>
      <Carousel>
        <CarouselContent className="gap-[10px] ml-4">
          {categories
            .filter((category) => category.food_count.length > 0)
            .map((category, index) => (
              <CarouselItem
                onClick={() => handleCategory(category._id)}
                className="pl-4 basis-1/10 bg-[#FFFFFF] px-4 py-1 text-black rounded-full"
                key={index}
                style={
                  categoryId === category._id
                    ? { background: "#EF4444", color: "#FFFFFF" }
                    : {}
                }
              >
                {category.title}
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default Category;
