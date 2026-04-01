import Image from "next/image";
import React from "react";
import { IoMdAirplane } from "react-icons/io";
import AboutServiceItem from "./AboutServiceItem";
import ContactMenuBtn from "../components/ContactMenuBtn";
import { FaRegAddressCard } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Travelio - Top International Travel Agency in Kolkata",
  description:
    "What makes Travelio stand out? Passion, expertise, and a love for adventure! Know why we’re Kolkata’s top international travel agency for all your travel needs.",
  alternates: {
    canonical: "/about-us",
  },
};

function page() {
  const topDestinationsList = [
    {
      image: "/himachal.webp",
      alt: "TOP DESTINATIONS EUROPE",
    },
    {
      title: "Europe Tour Package from Kolkata",
      subtitle:
        "Discover the romance of Paris, the history of Rome, and the breathtaking landscapes of the Swiss Alps. Our Europe tour packages are ideal for travellers seeking a mix of culture, adventure, and luxury.",
    },

    {
      image: "/greece.webp",
      alt: "TOP DESTINATIONS HIMACHAL",
    },

    {
      title: "Asian Adventures",
      subtitle:
        "Whether it&apos;s the beaches of Thailand, the temples of Bali, or the bustling streets of Tokyo, we offer diverse foreign tour packages from Kolkata to all major Asian destinations.",
    },

    {
      image: "/europe.webp",
      alt: "TOP DESTINATIONS GREECE",
    },

    {
      title: "Custom International Tours",
      subtitle:
        "Have a specific destination in mind? Let us know, and we’ll create a custom package just for you, complete with personalized itineraries and recommendations.",
    },
  ];

  return (
    <section className="w-full relative pb-20">
      <div className="h-[90vh] relative">
        <Image
          className="size-full object-cover"
          src="/about-banner.webp"
          alt="TRAVLIO Best Travel Agency in Kolkata for your"
          height={1200}
          width={1200}
        />
        <div className="size-full absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="font-bebas text-[90px] tracking-[15px] text-gray-50 sm:text-[50px] sm:tracking-[5px]">
            TRAVLIO
          </h2>
          <p className="text-white w-[650px] text-center text-sm sm:text-sm sm:w-[90%]">
            {/* Best Travel Agency in Kolkata for your domestic & International tours. */}
            Travel broadens the mind – we all know that, right? But when was the
            last time you truly took a break from the hustle and bustle of daily
            life? Are you craving a getaway to refresh your mind and soul? If
            so, you&apos;ve landed at just the right place!
          </p>
          <ContactMenuBtn className="font-normal w-40 py-2 border-2 border-white font-bebas text-white mt-10 sm:mt-5 tracking-widest hover:bg-white text-sm hover:text-black transition-all duration-500 pt-2" />
        </div>
      </div>
      <div className="w-full flex items-center justify-start flex-col">
        <div className="w-full flex items-center justify-start flex-col sm:px-9">
          <h1 className="source-sans-3-600 text-gray-800 text-3xl uppercase">
            About Travlio
          </h1>
          <p className="w-[850px] text-center text-sm source-sans-3-400 mt-4 sm:w-full">
            Welcome to Travlio, the best travel agency in Kolkata that&apos;s here to
            turn your travel dreams into reality. We believe that every journey
            should be more than just a trip; it should be a collection of
            unforgettable moments. With our extensive range of{" "}
            <Link className="linkStyle" href={"https://www.travlio.in/tours"}>
              domestic and international tour packages
            </Link>
            , we’re committed to helping you escape the mundane and experience
            the extraordinary.
            <br />
            <br />
            Our team of passionate travel experts is dedicated to making your
            travel dreams a reality. As an official{" "}
            <Link className="linkStyle" href={"https://www.thomascook.in/"}>
              Thomas Cook partner in Kolkata
            </Link>
            , we bring you world-class travel solutions, ensuring you get the
            best deals and unparalleled service. Whether you’re looking for an
            international adventure or a peaceful domestic retreat, Travlio has
            the perfect package tailored just for you. So, whether it’s a
            domestic retreat or an international voyage, you can trust us, your
            reliable international travel agent in Kolkata, to make your travel
            dreams come true. Let’s turn your travel aspirations into reality!
          </p>

          <h1 className="source-sans-3-600 text-gray-800 text-3xl uppercase mt-10">
            Why Travlio is The Best Choice for Next Tour Plan
          </h1>
          <p className="w-[850px] text-center text-sm source-sans-3-400 mt-4 sm:w-full">
            We get it – planning a trip can be overwhelming, and you want to
            make sure you’re in good hands. That’s why Travlio is here to be
            your trusted travel buddy, ensuring every journey feels like an
            adventure tailored just for you. Here’s why you’ll love travelling
            with us:
          </p>
          <ul className="flex flex-wrap justify-center w-[80%] gap-8 py-10 sm:w-full sm:grid-cols-1">
            <AboutServiceItem
              subtext="Ever dreamt of strolling through the romantic streets of Paris, marvelling at Rome&apos;s ancient wonders, or soaking up the beauty of Switzerland&apos;s snowy peaks? With our best Europe tour packages, we bring those dreams to life. Our itineraries are thoughtfully designed to give you the best of Europe, whether you’re a first-time traveller or a seasoned explorer. We make sure your European adventure is packed with moments you&apos;ll cherish forever."
              text="Unforgettable Europe Tours"
              itemsDirection="left"
              icon={
                <div className="size-14 flex items-center justify-center bg-cyan-600 rounded-lg shadow-xl">
                  {/* <GiEarthAfricaEurope size={28} color="#fff" /> */}
                  <Image
                    className="size-10"
                    alt="Europe Tour"
                    src={"/icons/europe.svg"}
                    height={60}
                    width={60}
                  />
                </div>
              }
            />

            <AboutServiceItem
              text="Amazing Domestic Escapes"
              subtext="Want to explore the hidden gems right here in India? We’ve got the best domestic tour packages to take you from the tranquil backwaters of Kerala to the vibrant sands of Rajasthan. Whatever your travel style, we’ll help you experience India in a way that feels just right for you."
              itemsDirection="left"
              icon={
                <div className="size-14 flex items-center justify-center bg-green-600 rounded-lg shadow-xl">
                  <Image
                    className="size-10"
                    alt="Europe Tour"
                    src={"/icons/domestic.png"}
                    height={60}
                    width={60}
                  />
                </div>
              }
            />

            <AboutServiceItem
              text="We’re Officially Partnered with Thomas Cook"
              subtext="Being the official Thomas Cook partner in Kolkata means we bring you the most trusted travel expertise and unbeatable deals. It’s like having a seasoned travel pro on your team, ensuring everything goes off without a hitch."
              itemsDirection="left"
              icon={
                <div className="size-14 flex items-center justify-center bg-[#0C4CA3] rounded-lg shadow-xl">
                  <Image
                    className="size-10"
                    alt="Europe Tour"
                    src={"/icons/thomas_cook_new.png"}
                    height={60}
                    width={60}
                  />
                </div>
              }
            />
            <AboutServiceItem
              text="Trips That Are All About You"
              subtext="At Travlio, we don’t believe in one-size-fits-all. We take the time to understand what you want from your trip, so every detail is personalized to fit your preferences, budget, and travel style. It’s your journey, and we’re just here to help make it perfect."
              itemsDirection="left"
              icon={
                <div className="size-14 flex items-center justify-center bg-red-600 rounded-lg shadow-xl">
                  <Image
                    className="size-10"
                    alt="Europe Tour"
                    src={"/icons/trips.svg"}
                    height={60}
                    width={60}
                  />
                </div>
              }
            />
            <AboutServiceItem
              text="We’ve Got Your Back"
              subtext="From the moment you start dreaming about your trip to the day you return, we’re here to support you. Got a question or need a little help? Our friendly team is just a call away, ensuring your travel experience is smooth and stress-free."
              itemsDirection="left"
              icon={
                <div className="size-14 flex items-center justify-center bg-orange-500 rounded-lg shadow-xl">
                  <Image
                    className="size-10"
                    alt="Europe Tour"
                    src={"/icons/back.svg"}
                    height={60}
                    width={60}
                  />
                </div>
              }
            />
          </ul>
        </div>
      </div>

      <div></div>

      <div className="w-full flex items-center justify-start flex-col">
        <h2 className="source-sans-3-600 text-gray-800 text-2xl tracking-wider">
          TOP DESTINATIONS
        </h2>
        <ul className="w-[70%] grid grid-cols-3 mt-9 sm:grid-cols-1 sm:gap-6 sm:w-[80%]">
          {topDestinationsList.map((item, index) => (
            <li key={index} className="w-full h-64 sm:h-auto">
              {item.image ? (
                <Image
                  className="w-full h-full"
                  src={item.image}
                  alt={item.alt}
                  height={1024}
                  width={1024}
                />
              ) : null}

              {!item.image ? (
                <div className="w-full flex items-center justify-start flex-col p-10 sm:p-0 sm:items-start">
                  <h2 className="text-center source-sans-3-700 text-gray-800 text-[15px]">
                    {item.title}
                  </h2>
                  <p className="text-center text-xs pt-1 sm:text-justify">
                    {item.subtitle}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default page;
