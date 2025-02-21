
type Props = {
    category : category
}
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
const CategoryFoods = ({category}:Props) => {
    return(
        <div className="w-full h-fit rounded-md p-6 bg-white flex flex-col gap-3">
        <p>{category.title}</p>
        <div className="flex flex-wrap gap-6">
        
          {category.foods.map((food:food, index)=>(
            <div key={index} className="w-[239px] h-[225px] rounded-md border-[#EF4444] border flex flex-col p-4">
              <div className="w-full h-[70%] overflow-hidden rounded-md flex items-center">
                <img src={`${food.food_image}`} alt="food" className="w-full scale-100"/>
              </div>
              <div className="w-full flex justify-between">
                <p>{food.food_name}</p>
                <p>{food.price}</p>
              </div>
              <div className="text-[12px]">{food.food_description}</div>
            </div>
          ))}
         
        </div>
      </div>
    )
}
export default CategoryFoods