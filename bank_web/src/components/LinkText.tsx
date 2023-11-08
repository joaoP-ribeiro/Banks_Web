import Link from "next/link"

interface Props{
    text:string
    colorText: string
    link: string
}

export default function LinkText({colorText, text, link}:Props){
    return(
        <Link href={`${link}`} className={`relativ ${colorText} text-center cursor-pointer hover:text-[#FF1577]`}>
            {text}
        </Link>
    )
}
