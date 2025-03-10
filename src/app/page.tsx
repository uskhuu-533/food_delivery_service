"use client";

import SignUP from "@/features/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex h-screen items-center">
      <SignUP/>
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}