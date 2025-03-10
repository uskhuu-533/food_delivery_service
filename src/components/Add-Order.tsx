import axios from "axios";
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
  getCartItems,
  cartItems,
  totalPrice,
  setCartItems,
}: Props) => {
  const addToOrder = async () => {
    if (cartItems.length === 0) return;
    try {
      const token = localStorage.getItem("user");
      console.log(token);

      const response = await axios.post(
        `http://localhost:3000/foodorder`,
        { foodOrderItems: cartItems, totalPrice: totalPrice },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const res = await axios.patch(`http://localhost:3000/foodorderitems`, 
      {},
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log(res);
      
      setCartItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF] lg:text-sm lg:py-[2px]"
      onClick={addToOrder}
    >
      Check out
    </button>
  );
};
export default AddOrder;
