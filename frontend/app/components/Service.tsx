import Image from "next/image";
import React from "react";

interface IProps {
  imgsrc: string;
  text: string;
  subtext: string;
  bgColor ? : string;
  className ? : string;

  size ? : number;
}

function Service(props: IProps) {
  return (
    <div className={`w-full flex justify-start flex-col pt-10 border border-gray-200 shadow-lg rounded-3xl ${props.className}`}>
      <div className="w-full h-28 flex items-center justify-center">
        <div style={{backgroundColor : props.bgColor}} className={`h-28 w-28 flex items-center justify-center rounded-xl`}>
          <Image
            className="transition-all duration-500"
            src={props.imgsrc}
            alt={props.imgsrc}
            height={props.size || 48}
            width={props.size || 48}
          />
        </div>
      </div>
      <div className="w-full p-5 sm:p-3">
        <h3 className="font-semibold w-full text-center text-[13px] tracking-[0.2em]">
          {props.text}
        </h3>
        <p className="w-full text-center text-xs mt-1">
          {props.subtext}
        </p>
      </div>
    </div>
  );
}

export default Service;
