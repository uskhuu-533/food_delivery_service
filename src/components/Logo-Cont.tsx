import Logo from "./icons/Logo";

const LogoCont = () => {
  return (
    <div className="flex gap-2">
      <Logo />
      <div className="flex flex-col gap-0">
        <div className="dark:text-white text-black font-[600] text-xl flex"><p>Nom</p><p className="text-[#EF4444]">Nom</p></div>
        <div className="text-sm font-[400] dark:text-[#F4F4F5]">Swift delivery</div>
      </div>
    </div>
  );
};
export default LogoCont;
