"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
type Props = {
  categories: category[];
};
type category = {
  title: string;
  _id: string | null;
};
const Category = ({ categories }: Props) => {
  const router = useRouter();

  const [categoryId, setCategory] = useQueryState("categoryid");

  const handleCategory = (_id: string | null) => {
    if (window.location.pathname === "/home") {
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
          {categories?.map((category: category, index) => (
            <CarouselItem
              onClick={() => handleCategory(category._id)}
              className="pl-4 basis-1/10 bg-[#FFFFFF] px-4 py-1 text-black rounded-full"
              key={index}
              style={categoryId === category._id ? {background:"#EF4444", color:"#FFFFFF"}:{}}
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
