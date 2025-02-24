"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
type Props = {
  categories : category[]
}
type category = {
  title : string
}
const Category = ({categories}:Props) => {
  const router = useRouter()
  
  return (
    <div className="flex flex-col gap-9 w-full">
      <p className="text-2xl font-semibold">Categories</p>
      <Carousel>
        <CarouselContent className="gap-[10px] ml-4">
          {categories.map((category:category, index)=>(
            <CarouselItem onClick={()=>router.push(`/category?category=${category.title}`)} className="pl-4 basis-1/10 bg-[#FFFFFF] px-4 py-1 text-black rounded-full" key={index}>{category.title}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default Category;
