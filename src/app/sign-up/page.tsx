"use client";

import SignUP from "@/app/sign-up/_features/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex h-screen items-center">
      <SignUP/>
      <Image src="https://res.cloudinary.com/dqhu3nn3p/image/upload/v1743504703/jezmdb0t9cumknmscba3.webp" width={856} height={904} alt="home" />
    </div>
  );
}