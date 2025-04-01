"use client";

import { useCategory } from "@/provider/CategoryProvider";
import LogoCont from "./Logo-Cont";
import { FacebookIcon, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter()
  const { categories } = useCategory();
  return (
    <footer className="h-[550px] w-full bg-[#18181B] flex flex-col py-20 gap-10 items-center">
      <div className="relative w-full overflow-hidden bg-[#EF4444] py-7">
        <div className="flex gap-[56px] whitespace-nowrap animate-marquee">
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          {}
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
          <p className="text-white text-[30px] font-bold">
            Fresh fast delivered
          </p>
        </div>
      </div>
      <div className="w-[1264px] flex gap-[220px]">
        <div>
          <LogoCont flex="col" />
        </div>
        <div className="flex gap-[112px]">
          <div className="flex flex-col gap-4 text-white">
            <div className="text-[#71717A]">NOMNOM</div>
            <div>Home</div>
            <div>Contact us</div>
            <div>Delivery zone</div>
          </div>
          <div className="flex gap-[56px]">
            <div className="flex flex-col gap-4 text-white">
              <div className="text-[#71717A]">MENU</div>
              {categories.slice(0, 5).map((category) => (
                <div onClick={()=>router.push(`/category?categoryid=${category._id}`)} key={category._id}>{category.title}</div>
              ))}
            </div>
            <div className="flex flex-col gap-4 text-white">
              <div className="text-[#71717A]">MENU</div>
              {categories.slice(5, 10).map((category) => (
                <div key={category._id}>{category.title}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[#71717A]">FOLLOW US</p>
            <div className="flex gap-4">
            <FacebookIcon size={28} fill="#18181B" path="0 0 1 1" className="rounded-full bg-white flex flex-col items-end"/>
            <Instagram size={28} stroke="white"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
