"use client";

import MenuContainerCategory from "@/app/category/_features/CategoryPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <MenuContainerCategory />
      <Footer />
    </div>
  );
}
