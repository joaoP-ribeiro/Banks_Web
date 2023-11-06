import Image from "next/image"

interface Props{
    title: string,
    text: string
}

export default function BannerImg({title, text}:Props){
    return(
        <div className="flex w-full flex-row">
            <div className="w-3/4 h-[calc(35rem)]">
                
            </div>
            <div  className="w-2/4">
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}