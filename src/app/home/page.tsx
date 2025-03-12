import Header from "@/components/Header";
import MenuContainer from "@/features/Menu-Container";


const Home = () => {
  return (
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
    </div>
  );
};
export default Home;
