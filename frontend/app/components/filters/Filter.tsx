"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { searchString } from "@/app/searchParama";
// import RangeSlider from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';

interface IProps {
  name: string;
  filters?: { text: string; isChecked: boolean; }[];
  type?: "default" | "pricebar";
  maxprice?: number;
  minprice?: number;
}

function Filter(props: IProps) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const searchParams = useSearchParams();

  const [currentFilterIndex, setCurrentFilterIndex] = useState(-1);

  const router = useRouter();

  const filterKeys: any = {
    Duration: "duration",
    "Tour Type": "tour-type",
  };

  const handelRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPrice(Number(event.target.value));
  };

  const handleChecboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName: string,
    index : number
  ) => {
    const filterName = filterKeys[props.name];

    // if (event.target.checked) {
    //   const urlSearchParams = new URLSearchParams(searchParams);
    //   urlSearchParams.append(filterName, itemName);
    //   router.push(`?${urlSearchParams}`);
    // } else {
    //   const urlSearchParams = new URLSearchParams(searchParams);

    //   const paramsList = urlSearchParams.getAll(filterName);

    //   const undeletedParams = paramsList.filter((value) => value !== itemName);

    //   urlSearchParams.delete(filterName);

    //   undeletedParams.forEach((element) => {
    //     urlSearchParams.append(filterName, element);
    //   });
    //   router.push(`?${urlSearchParams}`);
    // }

    router.push(`?${filterName}=${itemName}`);
    setCurrentFilterIndex(index);

  };

  return (
    <div className="py-2 px-2 border-b">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold pb-2 text-sm">{props.name}</h2>
        <span
          className={`${
            !props.type || props.type === "default" ? "hidden" : "block"
          }`}
        >
          ₹{currentPrice}
        </span>
      </div>
      <ul
        className={`w-full text-xs text-gray-500 space-y-4 ${
          !props.type || props.type === "default" ? "block" : "hidden"
        }`}
      >
        {props.filters?.map((item, index) => (
          <li key={index} className="w-full gap-3 flex items-center">
            <input
              // defaultChecked = {currentFilterIndex === index ? true : false}
              checked = {searchParams.get("duration") === item.text ? true : false}
              onChange={(e) => handleChecboxChange(e, item.text, index)}
              type="checkbox"
              className="cursor-pointer rounded-full overflow-hidden border-2 border-white"
            />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <div
        className={`relative mb-6 ${
          !props.type || props.type === "default" ? "hidden" : "block"
        }`}
      >
        <input
          onChange={handelRange}
          type="range"
          min="0"
          max="1500"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        {/* <RangeSlider /> */}
      </div>
    </div>
  );
}

export default Filter;
