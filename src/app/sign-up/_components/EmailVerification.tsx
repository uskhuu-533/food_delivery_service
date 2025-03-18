"use client";


import { getUserEmail } from "@/utils/request";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type props = {
  email :string
};
type User = {
  email: string;
  password: string;
};

const OPT = ({email}: props) => {
  
  return (
    <>
      <button className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
        <ChevronLeft />
      </button>
      <div>
        <p className="font-bold text-2xl">Create your account</p>
        <p className="text-[#71717A]">
          Sign up to explore your favorite dishes
        </p>
      </div>
     
      <button
    
        className="py-[4px] w-full border rounded-md"
      >
        let's go
      </button>
    </>
  );
};
export default OPT;
