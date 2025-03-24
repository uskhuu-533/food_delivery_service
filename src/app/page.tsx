import Header from "@/components/Header";
import MenuContainer from "@/app/_features/Menu-Container";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/provider/CategoryProvider";


const Home = () => {
  return (
    <CategoryProvider>
    <div >
      <Header/>
      <div className="flex w-full max-h-[800px] h-fit relative overflow-hidden">
        <img
          className="w-full h-auto  lg:mt-0 mt-12"
          src={`/mainbg.jpg`}
          alt="home"
        />
      </div>
      <MenuContainer />
      <Footer/>
    </div>
    </CategoryProvider>
  );
};
export default Home;
