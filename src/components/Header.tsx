import CartUser from "@/components/Cart-User-Loc";
import LogoCont from "@/components/Logo-Cont";

const Header = () => {
  return (
    <header className="w-screen fixed h-[68px] py-[12px] px-[88px] fixed items-center justify-center py-[12px] bg-[#18181B] z-10">
      <div className="h-full w-full w-full flex justify-between">
        <LogoCont flex="row" />
        <CartUser />
      </div>
    </header>
  );
};
export default Header;
