import Logo from "./icons/Logo";

const OrderHistory = () => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] rounded-lg">
      <div className="p-4 w-full rounded-xl h-full bg-[#FFFFFF] flex flex-col gap-5">
        <h1 className="font-bold text-xl">Order history</h1>
        <div className="py-8 px-12 w-full flex flex-col items-center gap-1 bg-[#F4F4F5] rounded-md">
          <Logo />
          <div className="text-lg font-semibold">No Orders Yet? </div>
          <div className="text-[#71717A] text-center text-sm">
          🍕 "You haven't placed any orders yet. Start exploring our menu and satisfy your cravings!"
          </div>
        </div>
        <button className="w-full border py-2 border-[#EF4444] rounded-full text-[#EF4444]">
          Add food
        </button>
      </div>
    </div>
  );
};
export default OrderHistory;
