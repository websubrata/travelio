"use client";

import React, { useState } from "react";
import NavUpper from "./NavUpper";
import Image from "next/image";
import { GLOBAL_X_PADDING } from "../constant";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Logo from "@/public/Travlio-new-logo.webp";
import { FaCaretDown } from "react-icons/fa";

function Navbar() {
  const [isNavMenuVisiable, setIsNavMenuVisiale] = useState(false);
  const pathname = usePathname();

  const navOptions = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about-us" },
    {
      name: "TOUR PACKAGES",
      path: "/tours",
      child: [
        {
          name: "International Tour",
          path: "/tours/international-tour-packages-from-kolkata",
        },
        { name: "Domestic Tour", path: "/tours/domestic-tour-packages" },
      ],
    },
    {
      name: "STUDY ABROAD",
      path: "https://travliostudyabroad.in/",
    },
    { name: "GALLERY", path: "/gallery" },
    { name: "BLOGS", path: "/blogs" },
    { name: "CONTACT US", path: "/contact-us" },
  ];

  return (
    <>
      <NavUpper />
      <header
        className={`${GLOBAL_X_PADDING} w-full py-3 flex items-center justify-between sm:relative`}
      >
        <Link href="/">
          <Image src={Logo} alt="logo" width={170} />
        </Link>

        {/* <nav
          className={`flex items-center sm:w-44 gap-10 sm:absolute sm:flex-col ${
            isNavMenuVisiable ? "sm:flex" : "sm:hidden"
          } sm:right-0 sm:gap-3 sm:bg-white sm:top-16 z-10 sm:items-start sm:py-2 sm:px-4 sm:border sm:shadow`}
        > */}
        <nav
          className={`flex items-center sm:w-full gap-10 sm:absolute sm:flex-col sm:overflow-hidden z-20 ${
            isNavMenuVisiable ? "sm:flex h-auto" : "sm:hidden h-0"
          } sm:right-0 sm:gap-3 sm:bg-white sm:top-16 sm:items-start sm:py-2 sm:px-4 sm:border sm:shadow transition-all duration-500`}
        >
          {navOptions.map((item, index) => (
            <Link
              onClick={() => (item.child ? null : setIsNavMenuVisiale(false))}
              key={index}
              href={item.child ? "#" : item.path}
              className={`font-medium text-[14px] relative ${
                pathname === item.path ? "text-black" : "text-[#94999F]"
              }  transition-all duration-300 group/parentnavitem`}
            >
              <div className="flex items-center gap-x-3">
                {item.name}
                {item.child ? <FaCaretDown /> : null}
              </div>

              {item.child ? (
                <div className="absolute invisible group-hover/parentnavitem:visible md:group-focus-within/parentnavitem:visible sm:group-focus-within/parentnavitem:visible z-[99999]">
                  <div className="w-40 relative top-3 bg-white shadow-md z-[99999]">
                    {item.child.map((cItem) => (
                      <Link
                        onClick={() => setIsNavMenuVisiale(false)}
                        key={cItem.path}
                        className="block px-3 py-2 hover:bg-slate-300 text-black"
                        href={cItem.path}
                      >
                        {cItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </Link>
          ))}
        </nav>

        {isNavMenuVisiable ? (
          <IoCloseOutline
            onClick={() => setIsNavMenuVisiale(false)}
            size={32}
            className="hidden sm:block text-gray-600"
          />
        ) : (
          <IoIosMenu
            onClick={() => setIsNavMenuVisiale(true)}
            size={38}
            className="hidden sm:block text-gray-600"
          />
        )}
      </header>
    </>
  );
}

export default Navbar;
