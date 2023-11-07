interface Props{
    colorText: string
}

export default function Logo({colorText}:Props){
    return(
        <div className={`${colorText} w-1/6 text-center my-auto text-4xl font-bold cursor-pointer`}>
            BANK<span className="text-[#FF1577]">!</span>
        </div>
    )
}