import Image from "next/image"
import imgs from "@/imgs/imgs"

interface Props {
  img: string
  title?: string
  text?: string
  reverse?: boolean
  horizontalLayout?: boolean
  backGround?: boolean
  colorText: string
}

export default function BannerImg({ img, title, text, reverse, horizontalLayout, backGround, colorText }: Props) {
  const imgSrc = imgs[img];

  const flexRowClass = reverse ? "flex-row-reverse" : "flex-row";
  const backGorundWhite = backGround ? "bg-white" : "";

  return (
    <div 
      className={`flex w-full flex-col ${backGorundWhite} items-center p-4 rounded-lg mt-2 mb-4 sm:${flexRowClass} `}
    >
      <div className="w-full sm:w-2/4 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt="Banner"
          width={341}
          height={513}
          objectFit="cover"
          layout="fixed"
        />
      </div>
  
      <div className="w-full sm:w-2/4 flex text-center justify-center flex-col gap-10 items-center p-4">
        <h1 className={`text-2xl sm:text-xl ${colorText}`}>{title}</h1>
        <p className="text-[#8A8A8A] text-lg text-justify sm:text-sm">{text}</p>
      </div>
    </div>
  );
}
