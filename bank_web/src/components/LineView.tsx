interface Props{
    title: string,
    text: string
}

export default function LineView({title, text}:Props){
    return(
        <div className="flex items-center justify-center flex-col mt-10 gap-4">
            <div className="text-[#FFBD15] text-2xl">{title}</div>
            <div className="text-[#F4F4F4] text-sm">{text}</div>
        </div>
    )
}