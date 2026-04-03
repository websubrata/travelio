import PageIntroBanner from "@/app/components/PageIntroBanner";
import React from "react";
import { MdFlight } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { BiImage } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { API_BASE_URL } from "@/app/constant";
import { ITours } from "@/app/types";
import { TOURS_META_INFO } from "@/app/constant";
import BookTourForm from "@/app/components/BookTourForm";
import { notFound } from "next/navigation";

async function page({ params }: { params: { ID: string } }) {
  const URL = `${API_BASE_URL}/tour/${params.ID}`;

  // Fetch tourinfo (rich HTML description)
  const response = await fetch(URL, { cache: "no-store" });
  const tourInfo = await response.json();

  // Fetch basic tour data (TITLE, IMG, PRICE, etc.)
  const tourResponse = await fetch(
    `${API_BASE_URL}/tour/${params.ID}?tableName=tour`,
    { cache: "no-store" }
  );
  const tourResult = (await tourResponse.json()) as ITours;

  // If core tour data is missing, show 404
  if (!tourResult || Array.isArray(tourResult)) {
    notFound();
  }

  // tourinfo may be empty (returns []). Fall back to tour collection fields.
  const isTourInfoEmpty = Array.isArray(tourInfo) || !tourInfo?.title;
  const tour = {
    title: isTourInfoEmpty ? tourResult.TITLE : tourInfo.title,
    htmlDescription: isTourInfoEmpty
      ? (tourResult as any).DESCRIPTION || ""
      : tourInfo.htmlDescription || "",
  };

  const metaInfo = TOURS_META_INFO.find(
    (info) => info.tourtitle === tourResult.TITLE
  );

  return (
    <>
      <head>
        <title>
          {metaInfo?.metatitle ||
            "Travel Agency in Kolkata | Travlio (Thomas Cook)"}
        </title>
        <meta
          name="description"
          content={
            metaInfo?.metadescription ||
            "Travlio is your go-to travel agent for international and domestic trips from Kolkata. Book now for expert assistance, exclusive deals, and forex card!"
          }
        ></meta>
        <link rel="canonical" href={`/tour/${params.ID}`} />

        <meta property="og:title" content={tourResult.TITLE} />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://www.travlio.in/tour/${params.ID}`}
        />
        <meta property="og:image" content={tourResult.IMG} />
        <meta property="og:description" content={tour.title} />
        <meta property="og:site_name" content="Travlio (Thomas Cook)" />
        <meta property="og:locale" content="en_US" />

        <meta property="product:price:amount" content={tourResult.PRICE} />
        <meta property="product:price:currency" content="INR" />

        <meta name="twitter:card" content={tour.title} />
        <meta name="twitter:title" content={tour.title} />
        <meta name="twitter:description" content={tour.title} />
        <meta name="twitter:image" content={tourResult.IMG} />
      </head>

      <section className="w-full">
        <PageIntroBanner
          alt={tour.title || "Tour Banner"}
          src={tourResult?.IMG || "/gallery.jpg"}
          className="h-72 object-cover"
        />

        <div className="w-full flex items-start sm:flex-col">
          <div className="w-[60%] px-10 py-9 sm:w-full">
            <h1 className="text-2xl font-semibold text-gray-700">
              {tour.title}
            </h1>
            <ul className="w-full grid grid-cols-3 mt-5 gap-8 border-b pb-8 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <MdFlight className="rotate-45" color="#1D57BA" size={23} />
                <span className="font-semibold text-gray-600 text-sm">
                  Flights
                </span>
              </li>

              <li className="flex items-center gap-2">
                <MdLocalHotel color="#1D57BA" size={23} />
                <span className="font-semibold text-gray-600 text-sm">
                  Hotels
                </span>
              </li>

              <li className="flex items-center gap-2">
                <BiImage color="#1D57BA" size={23} />
                <span className="font-semibold text-gray-600 text-sm">
                  Sightseeing
                </span>
              </li>

              <li className="flex items-center gap-2">
                <FaRegAddressCard color="#1D57BA" size={22} />
                <span className="font-semibold text-gray-600 text-sm">
                  Visa
                </span>
              </li>

              <li className="flex items-center gap-2">
                <GiMeal color="#1D57BA" size={22} />
                <span className="font-semibold text-gray-600 text-sm">
                  Meals
                </span>
              </li>

              <li className="flex items-center gap-2">
                <FaUser color="#1D57BA" size={18} />
                <span className="font-semibold text-gray-600 text-sm">
                  Tour Manager
                </span>
              </li>
            </ul>

            <div
              className="tourInfo"
              dangerouslySetInnerHTML={{ __html: tour.htmlDescription || "" }}
            ></div>
          </div>
          <div className="w-[40%] h-full flex items-start justify-center px-20 sm:w-full sm:mt-3 sm:px-5">
            <div className="bg-[#E3E6F7] w-full h-auto rounded-md shadow-md -translate-y-20 px-10 py-10">
              <span className="font-semibold">Price</span>
              <div className="w-full pt-4 flex items-center gap-4">
                <IoPricetagOutline size={26} />
                <span className="text-2xl font-extrabold">
                  {tourResult.PRICE}
                </span>
              </div>
              <BookTourForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
