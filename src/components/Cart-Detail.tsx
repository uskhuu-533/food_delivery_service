import Logo from "./icons/Logo";

const CartDetail = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="p-4 w-full rounded-xl h-full bg-[#FFFFFF] flex flex-col gap-5">
        <h1 className="font-bold text-xl">My cart</h1>
        <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
          <Logo />
          <div className="text-lg font-semibold">Your cart is empty</div>
          <div className="text-[#71717A] text-center text-sm">
            Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
            cravings!
          </div>
        </div>
        <button className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add food
        </button>
      </div>
      <div className="p-4 h-[40%] bg-[#FFFFFF] rounded-xl flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Payment info</h1>
        <div className="text-[#71717A]">
          <div className="flex justify-between">
            <p>Items</p>
            <p>-</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>-</p>
          </div>
        </div>
        <div className="flex justify-between text-[#71717A]">
          <p>Total</p>
          <p>-</p>
        </div>
        <button className="w-full py-2 rounded-full bg-[#EF4444] text-[#FFFFFF]">
          Check out
        </button>
      </div>
    </div>
  );
};
export default CartDetail;
