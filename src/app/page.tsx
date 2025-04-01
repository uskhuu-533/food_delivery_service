/* eslint-disable @next/next/no-img-element */

import Header from "@/components/Header";
import MenuContainer from "@/app/_features/Menu-Container";
import Footer from "@/components/Footer";
import { DebounceLoadingProvider } from "@/provider/DebounceLoaderProvider copy";

const Home = () => {
  return (
    <DebounceLoadingProvider>
    <div className="bg-[#404040] w-screen">
      <Header/>
      <div className="flex w-full max-h-[700px] h-fit relative overflow-hidden">
        <img
          className="w-full h-auto  lg:mt-0 mt-12"
          src={`/mainbg.jpg`}
          alt="home"
        />
      </div>
      <MenuContainer />
      <Footer/>
    </div>
    </DebounceLoadingProvider>

  );
};
export default Home;
