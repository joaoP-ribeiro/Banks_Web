
interface Props{
    text:string
}

export default function LinkText({text}:Props){
    return(
        <div className="relative text-center cursor-pointer hover:text-[#FF1577] transition duration-300">{text}</div>
    )
}