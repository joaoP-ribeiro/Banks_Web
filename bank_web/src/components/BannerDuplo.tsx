import Image from "next/image"
import imgs from "@/imgs/imgs"

interface Props {
  img1: string
  img2: string
  title1?: string
  text1?: string
  colorText1: string
  title2?: string
  text2?: string
  colorText2: string
}

export default function BannerImgDuplo({img1, img2, title1, text1,  colorText1, title2, text2,  colorText2}: Props) {
  const imgSrc1 = imgs[img1]
  const imgSrc2 = imgs[img2]

  
  return (
    <div className={`flex w-full flex-col h-[calc(35rem)] p-4 rounded-lg relative mt-2 mb-4 sm:flex-row sm: items-center`}>
      <div className="w-full flex items-center flex-col sm:w-2/4">
        <div className="w-2/4 flex items-center justify-center">
            <Image
            src={imgSrc1}
            alt="Baner"
            width={493}
            height={493}
            objectFit="cover"
            layout="fixed"
            />
        </div>
        <div className="w-full flex text-center justify-center flex-col gap-10 items-center p-4">
            <h1 className={`${colorText1} text-lg `}>{title1}</h1>
            <p className="text-[#8A8A8A] text-justify">{text1}</p>
        </div>
      </div>
      <div className="w-full flex items-center flex-col sm:w-2/4">
        <div className="w-2/4 flex items-center justify-center">
            <Image
            src={imgSrc2}
            alt="Baner"
            width={493}
            height={493}
            objectFit="cover"
            layout="fixed"
            />
        </div>
        <div className="w-full flex text-center justify-center flex-col gap-10 items-center p-4">
            <h1 className={`${colorText2} text-lg `}>{title2}</h1>
            <p className="text-[#8A8A8A] text-justify">{text2}</p>
        </div>
      </div>
    </div>
  );
}
