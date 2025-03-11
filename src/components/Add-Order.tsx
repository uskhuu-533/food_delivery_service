import { addToOrder } from "@/utils/request";
type Props = {
  getCartItems: Function;
  cartItems: foods[];
  totalPrice: number;
  setCartItems: (cartItems: CartItemType[]) => void;
};
type foods = {
  food: string;
  quantity: number;
  _id: string;
};
type CartItemType = {
  food: string;
  quantity: number;
  _id: string;
};

const AddOrder = ({
  cartItems,
  totalPrice,
  getCartItems
}: Props) => {
  return (
    <button
      className="w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF] lg:text-sm lg:py-[2px]"
      onClick={()=>addToOrder(cartItems, totalPrice, getCartItems)}
    >
      Check out
    </button>
  );
};
export default AddOrder;
