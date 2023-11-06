import LinkText from "./LinkText";

export default function NavBar(){
    return(
        <div className="w-full bg-[#232323] h-[calc(5rem)] flex flex-row">
            <div className="text-[#FFFFFF] w-1/6 text-center my-auto text-4xl font-bold cursor-pointer">
                BANK<span className="text-[#FF1577]">!</span>
            </div>
            <div className="w-3/6"></div>
            <div className="flex text-white w-2/6 flex-row items-center justify-center gap-20">
                <LinkText text="Download"/>
                <LinkText text="Login"/>
               
            </div>
        </div>
    )
}