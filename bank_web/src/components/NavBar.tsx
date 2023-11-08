import LinkText from "./LinkText";
import Logo from "./Logo";

export default function NavBar(){
    return(
        <div className="w-full bg-[#232323] h-[calc(5rem)] flex flex-row">
            <Logo colorText="text-[#F4F4F4]"/>
            <div className="w-3/6"></div>
            <div className="flex w-2/6 flex-row items-center justify-center gap-20">
                <LinkText link="/home" text="Home" colorText="text-[#F4F4F4]"/>
                <LinkText link="/log" text="Login" colorText="text-[#F4F4F4]"/>
               
            </div>
        </div>
    )
}