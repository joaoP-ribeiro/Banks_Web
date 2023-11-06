import BannerImg from "@/components/BannerImg";
import NavBar from "@/components/NavBar";

export default function Home(){
    return(
        <div className="bg-[#232323] h-full">
            <NavBar/>
            <BannerImg title="a" text="a"/>
        </div>
    )
}