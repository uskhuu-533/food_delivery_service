import CartUser from "@/components/Cart-User-Loc";
import LogoCont from "@/components/Logo-Cont";



const Header = () => {
  return (
    <div className="w-screen fixed h-[68px] py-[12px] px-[88px] fixed items-center bg-white justify-center py-[12px] dark:bg-[#18181B] z-10">
      <div className="h-full w-full w-full flex justify-between">
        <LogoCont />
        <CartUser />
      </div>
    </div>
  );
};
export default Header;
