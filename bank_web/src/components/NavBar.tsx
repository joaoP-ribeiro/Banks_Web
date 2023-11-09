"use client"
import { useState } from 'react';
import LinkText from "./LinkText";
import Logo from "./Logo";

export default function NavBar(){
    const [menu, setMenu] = useState(false)

    return(
        <div className="w-full bg-[#232323] h-[calc(5rem)] flex flex-row">
            <Logo colorText="text-[#F4F4F4]"/>
            <div className="w-3/6"></div>
            <div className="flex w-2/6 items-center sm:hidden">
                <button 
                    className="text-[#F4F4F4]"
                    onClick={() => {setMenu(!menu)}}
                >
                    Menu
                </button>
            </div>
            <div className=" hidden sm:flex w-2/6 flex-row items-center justify-center gap-20">
                <LinkText link="/home" text="Home" colorText="text-[#F4F4F4]"/>
                <LinkText link="/log" text="Login" colorText="text-[#F4F4F4]"/>
            </div>
        </div>
    )
}