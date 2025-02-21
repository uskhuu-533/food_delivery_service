'use client'

import Header from "@/components/Header"
import MenuContainer from "@/components/Menu-Container"


const Home = () => {
    return(
        <div className="">
            <Header/>
            <div className="flex w-full max-h-[800px] h-[800px] relative overflow-hidden">
             <img className="w-full h-auto absolute mt-[80px]" src={`/mainbg.jpg`} alt="home"/>
             </div>
             <MenuContainer />
        </div>
    )
}
export default Home