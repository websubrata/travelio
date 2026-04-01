"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { GrFormNext } from "react-icons/gr";

const blog_info = [
  {
    img: "/Banner/Banner1.jpg",
    heading: "Checkout The Best Europe Tour <br /> Packages from Kolkata",
    buttonLink: "/tour/darsaniya-europe-with-louvre-durga-puja-special",
  },
  {
    img: "/Banner/Banner2.jpg",
    heading: "Hire The Best International Travel <br /> Agent in Kolkata",
    buttonLink: "/about-us",
  },
  {
    img: "/Banner/Banner3.jpg",
    heading: "Check Our Foreign Tour Packages <br /> from Kolkata",
    buttonLink:
      "/blogs/welcome-to-travlio-your-guide-to-foreign-tour-packages-from-kolkata",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goNext = () => {
    setCurrent((preState) => {
      if (preState === blog_info.length - 1) return 0;
      return preState + 1;
    });
  };

  const goBack = () => {
    setCurrent((preState) => {
      if (preState === 0) return blog_info.length - 1;
      return preState - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // Define a minimum distance for a valid swipe

    if (distance > minSwipeDistance) {
      //swipe left
      goNext();
    } else if (distance < -minSwipeDistance) {
      //swipe right
      goBack();
    }

    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      goNext();
    }, 4000);

    return () => clearTimeout(timeOutId);
  }, [current]);

  return (
    <section className="w-full h-[60vh] px-20 mt-8 overflow-hidden sm:px-0 sm:aspect-video">
      <div className="size-full relative overflow-hidden">
        {blog_info.map((item, index) => (
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            key={index}
            className={`absolute left-0 right-0 ${
              current === index ? "z-10 opacity-100" : "z-0 opacity-0"
            } size-full overflow-hidden rounded-[2rem] shadow-2xl border transition-all duration-1000 sm:rounded-none sm:border-none`}
          >
            <div className="size-full relative">
              <Image
                className="w-full h-full sm:object-cover z-0"
                src={item.img}
                alt="Banner 1"
                height={1200}
                width={1200}
              />

              <div className={`size-full fade-to-left absolute inset-0`}>
                <div className="w-full h-full flex flex-col justify-center items-start pt-5 px-20 sm:px-7">
                  <h2
                    dangerouslySetInnerHTML={{ __html: item.heading }}
                    className={`w-full text-3xl font-semibold text-white leading-[2.5rem] sm:text-2xl sm:hidden`}
                  ></h2>

                  {/* This heading for small screen size */}
                  <h2
                    className={`hidden w-full text-3xl font-semibold text-white leading-[2.5rem] sm:text-2xl sm:block`}
                  >
                    {item.heading.replaceAll("<br />", " ")}
                  </h2>

                  <Link className="mt-2" href={item.buttonLink}>
                    <button className="text-xs shadow-2xl border tracking-wider font-semibold bg-white border-gray-200 min-w-32 py-2 text-black rounded-md hover:bg-transparent hover:text-white transition-all duration-500">
                      Check It Out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute top-0  bottom-0 z-20 w-10 flex items-center justify-center sm:items-end">
          <button
            onClick={goBack}
            className="size-10 bg-gray-200 flex items-center justify-center active:scale-90"
          >
            <GrFormNext className="-rotate-180" />
          </button>
        </div>
        <div className="absolute top-0 right-0 bottom-0 z-20 w-10 flex items-center justify-center sm:items-end">
          <button
            onClick={goNext}
            className="size-10 bg-gray-200 flex items-center justify-center active:scale-90"
          >
            <GrFormNext />
          </button>
        </div>
      </div>
    </section>
  );
}
