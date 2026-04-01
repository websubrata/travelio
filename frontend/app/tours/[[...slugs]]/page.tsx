import React from "react";
import { API_BASE_URL, GLOBAL_X_PADDING } from "../../constant";
import Filter from "../../components/filters/Filter";
import { generateFirstLetterUpper } from "@/app/utils/generateFirstLetterUpper";
import { IResponse, ITours } from "@/app/types";
import Link from "next/link";
import SearchLayout from "@/app/components/SearchLayout";
import PackagesLI from "../PackagesLI";
import { Metadata } from "next";

interface IProps {
  params: { slugs: string[] };
  searchParams: { search: string; duration: string; "tour-type": string };
}

export const metadata: Metadata = {
  title: "Travlio Tour Packages | Best International & Domestic Tour Plan",
  description:
    "Ready for an adventure? Travlio, the best travel agency in Kolkata, offers the best tour packages for international and domestic tours. Plan Your trip today!",
  alternates: {
    canonical: "/about-us",
  },
};

const duration = [
  { text: "15 Days 14 Nights", isChecked: false },
  { text: "11 Days 10 Nights", isChecked: false },
  { text: "10 Days 9 Nights", isChecked: false },
  { text: "7 Days 6 Nights", isChecked: false },
];

// const tourType = [
//   { text: "International Tour", isChecked: false },
//   { text: "Domestic Tour", isChecked: false },
// ];

const filters = {
  duration: [
    { text: "15 Days 14 Nights", isChecked: false },
    { text: "11 Days 10 Nights", isChecked: false },
    { text: "10 Days 9 Nights", isChecked: false },
    { text: "7 Days 6 Nights", isChecked: false },
  ],
  "tour-type": [
    { text: "International Tour", isChecked: false },
    { text: "Domestic Tour", isChecked: false },
  ],
};

async function page({ params, searchParams }: IProps) {
  let catname = params.slugs?.[0]
    ? generateFirstLetterUpper(decodeURI(params.slugs[0]))
    : undefined;
  // const current_page = !params.slugs?.[1]
  //   ? undefined
  //   : decodeURI(params.slugs[1]);

  // let URL = `${API_BASE_URL}/tours?catname=${catname}&page=${current_page}`;
  // if (catname) {
  //   if (
  //     catname != "International Tour Packages From Kolkata" ||
  //     catname != "Domestic Tour Packages"
  //   ) {
  //     notFound();
  //   }
  // }

  const pageHeading = catname;
  let pageDescription: React.ReactNode | null = null;

  if (catname === "International Tour Packages From Kolkata") {
    catname = "International Tour";
    pageDescription = (
      <span className="text-sm text-gray-400">
        Welcome to your gateway to adventure with Travlio’s international tour
        packages from Kolkata! Here, we’ve handpicked some of the most
        captivating European destinations that you simply have to experience at
        least once in your lifetime. Worried about the cost? Don’t be! As one of
        the most affordable travel agencies in the city, we’re committed to
        making your dream vacation a reality without breaking the bank. From the
        historic charm of Rome to the romantic streets of Paris, we’ve got the
        perfect itinerary waiting just for you. Let’s turn your travel dreams
        into unforgettable memories!{" "}
        <Link className="linkStyle" href={"/contact-us"}>
          Contact us today!
        </Link>
      </span>
    );
  }

  if (catname === "Domestic Tour Packages") {
    catname = "Domestic Tour";
    pageDescription = (
      <span className="text-sm text-gray-400">
        Get ready to explore the incredible beauty of India with{" "}
        <Link className="linkStyle" href={"https://www.travlio.in/"}>
          Travlio
        </Link>
        ’s domestic tour packages! Picture yourself surrounded by the majestic
        peaks of Himachal, breathing in the fresh air of serene Kashmir, or
        soaking up the unique landscapes of Ladakh. Each journey is designed to
        give you unforgettable experiences and memories to treasure. And the
        best part? We keep it affordable, so you can focus on enjoying your
        adventure without stressing about costs. Let’s turn your travel dreams
        into reality together!
      </span>
    );
  }

  let URL = `${API_BASE_URL}/tours?catname=${catname}`;

  if (!catname) {
    URL = `${API_BASE_URL}/tours`;
  }

  // if (!current_page) {
  //   URL = `${API_BASE_URL}/tours?catname=${catname}&page=1`;
  // }

  // if (catname === "All") {
  //   URL = `${API_BASE_URL}/tours?page=${current_page}`;
  // }

  // if (!catname) {
  //   URL = `${API_BASE_URL}/tours?page=1`;
  // }

  if (searchParams.search) {
    URL = `${API_BASE_URL}/search?q=${searchParams.search}`;
  }

  // let queryText: string | null = null;

  // const setDurationCheckBoxDone = (textToCheck: string) => {
  //   if (queryText === null) {
  //     queryText = `?duration=${textToCheck}`;
  //   } else {
  //     queryText += `&duration=${textToCheck}`;
  //   }

  //   let indexOfDuration = -1;
  //   for (var i = 0; i < duration.length; i++) {
  //     if (duration[i].text === textToCheck) {
  //       indexOfDuration = i;
  //     }
  //   }
  //   duration[indexOfDuration].isChecked = true;
  // };

  // const resetDurationCheckBox = () => {
  //   duration.forEach((item, index) => {
  //     duration[index].isChecked = false;
  //   });
  // };

  // const checkDurationChecbox = () => {
  //   if (searchParams.duration !== undefined) {
  //     if (!Array.isArray(searchParams.duration)) {
  //       setDurationCheckBoxDone(searchParams.duration);
  //     } else {
  //       searchParams.duration.map((item) => {
  //         setDurationCheckBoxDone(item);
  //       });
  //     }
  //   } else {
  //     resetDurationCheckBox();
  //   }
  // };

  // checkDurationChecbox();

  // const setTourTypeCheckBoxDone = (textToCheck: string) => {
  //   if (queryText === null) {
  //     queryText = `?tour-type=${textToCheck}`;
  //   } else {
  //     queryText += `&tour-type=${textToCheck}`;
  //   }

  //   let indexOfDuration = -1;
  //   for (var i = 0; i < tourType.length; i++) {
  //     if (tourType[i].text === textToCheck) {
  //       indexOfDuration = i;
  //     }
  //   }
  //   tourType[indexOfDuration].isChecked = true;
  // };

  // const resetTourTypeCheckBox = () => {
  //   tourType.forEach((item, index) => {
  //     tourType[index].isChecked = false;
  //   });
  // };

  // const checkTourTypeChecbox = () => {
  //   if (searchParams["tour-type"] !== undefined) {
  //     if (!Array.isArray(searchParams["tour-type"])) {
  //       setTourTypeCheckBoxDone(searchParams["tour-type"]);
  //     } else {
  //       searchParams["tour-type"].map((item) => {
  //         setTourTypeCheckBoxDone(item);
  //       });
  //     }
  //   } else {
  //     resetTourTypeCheckBox();
  //   }
  // };

  // checkTourTypeChecbox();

  if (searchParams.duration) {
    URL = `${API_BASE_URL}/filter?duration=${searchParams.duration}`;

    if (catname) {
      URL += `&category=${catname}`;
    }
  }
  

  const response = await fetch(URL);
  if(!response.ok) {
    return <h2>{await response.statusText}</h2>
  }

  const tours = (await response.json()) as IResponse<{
    tours: ITours[];
    total_page: number;
  }>;
  const isNoTours = tours?.data?.tours?.length === 0;

  return (
    <div>
      <div className={`w-full min-h-screen pt-6 flex ${GLOBAL_X_PADDING}`}>
        <div className="w-[20%] sm:hidden">
          <div className="w-full flex items-center justify-between border-b pb-2 px-2">
            <span className="font-semibold">FILTERS</span>
            {/* <span className="text-[13px] text-gray-600 cursor-pointer">
              Reset
            </span> */}
          </div>
          <Filter name="Duration" filters={duration} />
          {/* <Filter name="Tour Type" filters={tourType} /> */}
          {/* <Filter
            name="Price Range"
            type="pricebar"
            minprice={0}
            maxprice={14000}
          /> */}
        </div>
        <div className="w-full">
          <div className="w-full flex items-center justify-between py-4 pl-10 sm:flex-col sm:pl-0">
            <h1 className="font-semibold tracking-widest text-2xl text-gray-700 sm:text-center sm:pb-3">
              {catname ? pageHeading : "TOUR PACKAGES FROM KOLKATA"}
            </h1>
            <SearchLayout />
          </div>
          <div
            className={`pl-10 pb-10 sm:pl-0 ${
              pageDescription ? "block" : "hidden"
            }`}
          >
            {pageDescription}
          </div>
          {isNoTours ? (
            <h2 className="w-full text-center text-2xl font-semibold mt-10 text-gray-700">
              Currently No Tours Are Available
            </h2>
          ) : (
            <ul className="grid w-full grid-cols-3 mx-10 gap-10 justify-center sm:grid-cols-1 sm:mx-0">
              {tours.data.tours.map((item) => (
                <PackagesLI key={item.ID} info={item} />
              ))}
            </ul>
          )}

          {/* <div
            className={`w-full flex items-center justify-center gap-10 py-10 ${
              isNoTours ? "hidden" : "flex"
            }`}
          >
            <Link
              href={`${BASE_URL}/tours/${
                catname ? catname?.toLowerCase().replaceAll(" ", "-") : "all"
              }/${parseInt(current_page || "1") - 1}`}
            >
              <button
                className={`px-3 py-3 bg-[#c9c9c9d3] ${
                  !current_page || current_page === "1" ? "hidden" : "block"
                }`}
              >
                <GrPrevious />
              </button>
            </Link>
            <Link
              href={`${BASE_URL}/tours${
                catname
                  ? "/" + catname?.toLowerCase().replaceAll(" ", "-")
                  : "?page=" + (parseInt(current_page || "1") + 1)
              }`}
              className={`px-3 py-3 bg-[#c9c9c9d3] ${
                parseInt(current_page || "") >= tours.data.total_page
                  ? "hidden"
                  : "block"
              }`}
            >
              <GrNext />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
