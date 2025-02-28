import axios from "axios";
type Props = {
    getCartItems : Function
    cartFood : foods[]
}
type foods = {
    food: string;
    quantity: number;
    _id: string;
  };

const AddOrder = ({getCartItems, cartFood}:Props) => {
    const addToOrder = async () => {
        if (cartFood.length === 0) return
        try {
          const token = localStorage.getItem("user");
          console.log(token);
    
          const response = await axios.post(
            `http://localhost:3000/foodorder`,
            { foodOrderItems: cartFood },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          const deleteRes = await axios.delete(
            `http://localhost:3000/foodorderitems`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          getCartItems();
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <button
        className="w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF]"
        onClick={addToOrder}
      >
        Check out
      </button>
    )
}
export default AddOrder