"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCaretSquareDown } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Options() {
  const [visibility, setVisibility] = useState(true);

  return (
    <div className={`fixed right-5 top-40 z-50 sm:right-0`}>
      <div className="relative">
        <IoCloseCircleOutline
          onClick={() => {
            setVisibility(!visibility);
          }}
          className={`text-black absolute ${
            visibility ? "right-40 -rotate-90" : "right-3 rotate-90"
          } transition-all duration-300 cursor-pointer`}
          size={25}
        />
      </div>

      <div
        className={`*:flex *:items-center *:justify-center  *:cursor-pointer *:shadow-2xl space-y-3 ${
          visibility ? "translate-x-0" : "translate-x-full"
        } transition-all duration-300`}
      >
        {/* <Link
          href={"/study-abroad"}
          className=" h-10 w-40 bg-[#BB0000] text-white active:scale-90 transition-all duration-300 border animation-come-from-right1"
        >
          <span className="text-xs font-semibold">Study Abroad</span>
        </Link> */}
        <Link
          href={"https://travliostudyabroad.in/"}
          className="blueGBtn gBtn animation-come-from-right1"
        >
          <span className="text-xs font-semibold">Study Abroad</span>
        </Link>
        <Link
          href={"/tours/domestic-tour-packages"}
          className="goldenGBtn gBtn animation-come-from-right2"
        >
          <span className="text-xs font-semibold">Domestic Travel</span>
        </Link>
        <Link
          href={"/tours/international-tour-packages-from-kolkata"}
          className="skyBlueGBtn gBtn animation-come-from-right3"
        >
          <span className="text-xs font-semibold">International Travel</span>
        </Link>
        {/* <Link
          href={"/study-abroad"}
          className="greenGBtn gBtn animation-come-from-right3"
        >
          <span className="text-xs font-semibold">Visa</span>
        </Link> */}
      </div>
    </div>
  );
}
