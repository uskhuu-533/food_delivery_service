"use client";

import MenuContainerCategory from "@/app/category/_features/CategoryPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { DebounceLoadingProvider } from "@/provider/DebounceLoaderProvider copy";

export default function Home() {
  return (
     <DebounceLoadingProvider>
    <div>
      <Header />
      <MenuContainerCategory />
      <Footer />
    </div>
    </DebounceLoadingProvider>
  );
}
