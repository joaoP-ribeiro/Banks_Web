
interface Props{
    text:string
    colorText: string
    onClick?: () => void
}

export default function LinkText({colorText, text, onClick}:Props){
    return(
        <div onClick={onClick} className={`relativ ${colorText} text-center cursor-pointer hover:text-[#FF1577] transition duration-300`}>{text}</div>
    )
}