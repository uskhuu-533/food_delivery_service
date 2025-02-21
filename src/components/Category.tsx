"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type Props = {
  categories : category[]
}
type category = {
  title : string
}
const Category = ({categories}:Props) => {
  console.log(categories);
  
  return (
    <div className="flex flex-col w-full">
      <p>Categories</p>
      <Carousel>
        <CarouselContent className="-ml-4">
          {categories.map((category:category, index)=>(
            <CarouselItem className="pl-4 basis-1/10" key={index}>{category.title}</CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default Category;
