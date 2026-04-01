"use client";

import React, { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import Link from "next/link";
import { BLOGS_LIST_DATA, MOBILE_VIEW_WIDTH } from "@/app/constant";
import ShimmerImage from "../ShimmerImage";
import { GrFormNext } from "react-icons/gr";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

function Blogs() {
  const swiperRef = useRef<SwiperRef>(null);

  const slideStarting = useRef(0);
  const slideEnd = useRef(9);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [sliderPreviewView, setSliderPreviewView] = useState(4);

  const goNext = () => {
    setCurrentIndex((preState) => {
      if (preState === slideEnd.current) return slideEnd.current;
      return preState + 1;
    });
  };

  const goBack = () => {
    setCurrentIndex((preState) => {
      if (preState === slideStarting.current) return slideStarting.current;
      return preState - 1;
    });
  };

  useEffect(() => {
    setCurrentIndex(window.innerWidth <= MOBILE_VIEW_WIDTH ? 0 : 1);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= MOBILE_VIEW_WIDTH) {
      slideStarting.current = 0;
      slideEnd.current = 9;
      setSliderPreviewView(1);
    } else {
      slideStarting.current = 1;
      slideEnd.current = 8;
      setSliderPreviewView(4);
    }

    if (currentIndex !== -1) {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideTo(currentIndex);
      }
    }
  }, [currentIndex]);

  const blogIndex = useRef(0);

  return (
    <section className="w-full py-20">
      <div className="w-full flex items-center justify-center flex-col gap-3 sm:px-4">
        <div className="w-full px-20 flex flex-col items-center sm:px-0">
          <h2 className="text-2xl font-semibold">Blogs</h2>
          <span className="text-[15px] sm:w-full text-center">
            Explore our{" "}
            <Link className="linkStyle" href={"/blogs"}>
              travel blog
            </Link>{" "}
            for the latest tips, ideas, and inspiration! Discover guides to
            international and domestic travel destinations, along with helpful
            travel advice and trending deals. Whether you&apos;re planning your next
            trip or just dreaming of far-off places, our blog is here to help
            you every step of the way!
          </span>
        </div>

        <div className="w-[15rem] h-[1px] mt-4 bg-slate-200"></div>
      </div>

      <div className="w-full sm:px-6 relative">
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={sliderPreviewView}
          centeredSlides={true}
          // effect={"coverflow"}
          className="w-full flex items-start justify-center gap-10"
        >
          {BLOGS_LIST_DATA.slice(0, 10).map((_, index) => {
            blogIndex.current = BLOGS_LIST_DATA.length - 1 - index;

            return (
              <SwiperSlide
                key={index}
                className="w-[350px] overflow-hidden sm:w-full"
              >
                <Link href={BLOGS_LIST_DATA[blogIndex.current].link || ""}>
                  <div className="h-[11rem] w-full overflow-hidden bg-black">
                    <ShimmerImage
                      className="w-full h-full hover:scale-105 cursor-pointer transition-all duration-500"
                      src={BLOGS_LIST_DATA[blogIndex.current].img}
                      alt={BLOGS_LIST_DATA[blogIndex.current].title}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <p className="font-semibold text-sky-600 text-xs tracking-wider pt-2 line-clamp-2">
                    {BLOGS_LIST_DATA[blogIndex.current].author}
                  </p>
                  <h2 className="font-bold tracking-wide line-clamp-2">
                    {BLOGS_LIST_DATA[blogIndex.current].title}
                  </h2>
                  <div className="w-full flex items-center gap-1 pt-1">
                    <CiCalendarDate />
                    <span className="font-semibold text-[10px]">
                      {BLOGS_LIST_DATA[blogIndex.current].date}
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="absolute h-full left-10 sm:left-0 top-0 bottom-0 flex items-center z-20">
          <button
            onClick={goBack}
            className="size-12 bg-white active:scale-90 shadow-xl border flex items-center rounded-full justify-center"
          >
            <GrFormNext className="-rotate-180" size={18} />
          </button>
        </div>

        <div className="absolute h-full right-10 sm:right-0 top-0 bottom-0 flex items-center z-20">
          <button
            onClick={goNext}
            className="size-12 bg-white active:scale-90 shadow-xl border flex items-center rounded-full justify-center"
          >
            <GrFormNext size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Blogs;
