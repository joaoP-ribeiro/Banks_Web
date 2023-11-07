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

export default function BannerImg({img, title, text, reverse, horizontalLayout, backGround, colorText}: Props) {
  const imgSrc = imgs[img];

  const flexRowClass = reverse ? "flex-row-reverse" : "flex-row";
  const flexColClass = horizontalLayout ? "flex-col items-center" : "";
  const backGorundWhite = backGround ? "bg-white" : ""
  return (
    <div className={`flex w-full ${flexRowClass} ${flexColClass} ${backGorundWhite} h-[calc(35rem)] p-4 rounded-lg mt-2 mb-4`}>
      <div className="w-2/4 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt="Baner"
          width={341}
          height={513}
          objectFit="cover"
          layout="fixed"
        />
      </div>
      <div className="w-2/4 flex text-center justify-center flex-col gap-10 items-center p-4">
        <h1 className={`${colorText} text-2xl `}>{title}</h1>
        <p className="text-[#8A8A8A] text-lg text-justify">{text}</p>
      </div>
    </div>
  );
}
