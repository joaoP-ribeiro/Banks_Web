import LinkText from "./LinkText"
import Image from "next/image"
import imgs from "@/imgs/imgs"
import Logo from "./Logo"

interface Props{
    img1: string
    img2: string
}

export default function Footer({img1, img2}:Props){
    const imgSrc1 = imgs[img1]
    const imgSrc2 = imgs[img2]
    return(
        <div className="h-25 flex flex-col bg-[#232323] mt-20">
            <div className="flex flex-row items-center justify-center text-center gap-10 h-2/4  mt-10">
                <LinkText link="/home" text="Segurança" colorText="text-[#F4F4F4]"/>
                <LinkText link="/home" text="Tecnologia" colorText="text-[#F4F4F4]"/>
                <LinkText link="/home" text="Comprometimento" colorText="text-[#F4F4F4]"/>
                <LinkText link="/home" text="Futuro" colorText="text-[#F4F4F4]"/>
            </div>
            <div className="flex items-center justify-center text-center h-2/4 mt-10">
                <Logo colorText="text-[#F4F4F4]"/>
            </div>
        </div>
    )
}