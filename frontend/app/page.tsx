import { GLOBAL_X_PADDING } from "./constant";
import HomeInfo from "./components/HomeInfo";
import { FaLongArrowAltDown } from "react-icons/fa";
import Service from "./components/Service";
import NewTestimonial from "./components/NewTestimonial/NewTestimonial";
import Blogs from "./components/blogs/Blogs";
import { Metadata } from "next";
import { LocalBusiness, WithContext } from "schema-dts";
import Script from "next/script";
import Banner from "./components/Banner";
import Image from "next/image";
import Link from "next/link";
import FAQ from "./components/FAQ/FAQ";
import ReadMorePTag from "./components/ReadMorePTag";

export const metadata: Metadata = {
  title: "Best Travel Agency Kolkata | Travlio - Trusted Travel Partner",
  description:
    "Travel the world with Travlio, the best travel agency Kolkata. offers a variety of customized packages for international and domestic tours. Let the trip begin!",
  alternates: {
    canonical: "/",
  },
  keywords:
    "best travel agency in kolkata, foreign tour packages from Kolkata, europe tour package from kolkata, international tour packages from kolkata, international travel agents in kolkata",
  openGraph: {
    title: "Best Travel Agency Kolkata Travlio - Follow us",
    siteName: "Travlio",
    type: "profile",
    url: "https://www.facebook.com/travlio.in",
    description:
      "Stay updated with the best travel agency in Kolkata! Follow Travlio on Facebook for exclusive deals, travel tips, and exciting destinations. Join our community!",
    images: "/OG_FACEBOOK_IMAGE.jpg",
  },
};

const jsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Travlio",
  image:
    "https://www.travlio.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTravlio-new-logo.c4f0494d.webp&w=256&q=75",
  "@id": "https://www.travlio.in/",
  url: "https://www.travlio.in/",
  telephone: "8336908118",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Shop No 9/38, Jhautala, near Aminia Restaurant, Chinar Park",
    addressLocality: "Kolkata, West Bengal, India",
    postalCode: "700157",
    addressCountry: "India",
    addressRegion: "West Bengal",
  },
  sameAs: [
    "https://www.facebook.com/travlio.in",
    "https://www.instagram.com/travlio_in/",
    "https://www.linkedin.com/company/travlio-in/",
  ],
};

const internationTourInfo = [
  {
    img: "/wp-content/uploads/2024/02/Manmohak-Europe-Summer-2024-600x370.jpg",
    heading: "Manmohak Europe (Summer 2024)",
    description:
      "To explore the enchanting allure of Europe, embark on the Manmohak Europe tour package with Travlio. Experience the iconic sights of London, the romance of Paris, the charm of Bruges, and the vibrant culture of Germany. This unforgettable journey promises breathtaking views and rich experiences that will leave you rejuvenated and inspired. Don’t miss out on the adventure of a lifetime!",
    link: "https://www.travlio.in/tour/manmohak-europe-summer-2024",
  },
  {
    img: "/wp-content/uploads/2024/02/Ananya-Europe-Summer-2024-600x370.jpg",
    heading: "Ananya Europe (Summer 2024)",
    description:
      "This summer, book the Ananya Europe tour package with Travlio for a wonderful European trip. Discover the tempting streets of Paris, appreciate the charms of Belgium, explore the beauty of the Netherlands, and wonder at the breathtaking scenery of Switzerland. This journey provides breathtaking sights and unforgettable encounters that will uplift your emotions. Don't miss out—book your journey now!",
    link: "https://www.travlio.in/tour/ananya-europe-summer-2024",
  },
  {
    img: "/wp-content/uploads/2024/02/Magical-Europe-Summer-2024-600x370.jpg",
    heading: "Magical Europe (Summer 2024)",
    description:
      "This summer, treat yourself to a really lovely holiday with Travlio's Magical Europe travel package. Explore the historic wonders of the United Kingdom, the charm of France, and the stunning scenery of Switzerland. This unique journey promises breathtaking sights and heartwarming moments. Don't pass up the opportunity to make magical memories—book your adventure today!",
    link: "https://www.travlio.in/tour/magical-europe-summer-2024",
  },

  {
    img: "/wp-content/uploads/2024/02/Fusion-Europe-Summer-2024-600x370.jpg",
    heading: "Fantastic France",
    description:
      "Discover the beauty of France with our Fantastic France tour package from Travlio! Experience the romance of Paris, wander through charming villages, and savour exquisite cuisine. Explore iconic landmarks like the Eiffel Tower and the Louvre, and immerse yourself in the rich culture and history that France has to offer. This unforgettable journey promises breathtaking sights and delightful moments. Don’t miss out on the chance to create lasting memories—book your adventure today!",
    link: "https://www.travlio.in/tour/fantastic-france",
  },
  {
    img: "/wp-content/uploads/2024/02/European-Fusion-Dreams-Senior-Citizens-Special-Summer-2024-600x370.jpg",
    heading: "European Fusion Dreams – Senior Citizens Special (Summer 2024)",
    description:
      "Join our European Fusion Dreams tour, specially designed for senior citizens, and enjoy a perfect blend of adventure and comfort! This summer, explore the romantic streets of Paris, the stunning architecture of Italy, and the vibrant culture of Spain with Travlio. Tailored for your enjoyment, this tour offers leisurely sightseeing and cultural experiences, all while making new friends. Don’t miss out on creating unforgettable memories—book your dream vacation today!",
    link: "https://www.travlio.in/tour/european-fusion-dreams-senior-citizens-special-summer-2024",
  },
  {
    img: "/wp-content/uploads/2024/02/Highlights-of-Europe-DISNEYLAND®-Summer-2024-600x370.jpg",
    heading: "Highlights of Europe (DISNEYLAND) (Summer 2024)",
    description:
      "Get ready for an enchanting adventure with our Highlights of Europe: Disneyland tour this summer! With Travlio, you’ll explore the charming streets of Paris, visit iconic landmarks, and experience the excitement of Disneyland. Then, journey through the breathtaking landscapes of Italy, where history and beauty come together, before immersing yourself in the vibrant culture of Spain. This tour promises a perfect mix of fun, excitement, and unforgettable moments. Don’t miss out on creating magical memories—book your adventure today!",
    link: "https://www.travlio.in/tour/highlights-of-europe-disneyland-summer-2024",
  },
];

const domesticTourInfo = [
  {
    img: "/wp-content/uploads/2024/02/Customizable-Himachal-Shimla-Manali-Chandigarh-600x370.jpg",
    heading: "Customizable Himachal (Shimla – Manali – Chandigarh)",
    description:
      "Discover the beauty of Himachal Pradesh with our Customizable Himachal Tour featuring Shimla, Manali, and Chandigarh! With Travlio, you can design your perfect getaway in these stunning destinations. Explore the charming hill stations of Shimla and Manali, and enjoy the modern architecture and lush gardens of Chandigarh. Whether you're after adventure or relaxation, this tour is tailored for you. Create unforgettable memories in the heart of the Himalayas—book your personalized adventure today!",
    link: "https://www.travlio.in/tour/customizable-himachal-shimla-manali-chandigarh",
  },
  {
    img: "/wp-content/uploads/2024/02/Nubra-Valley-Trails-with-Leh-and-Pangong-600x370.jpg",
    heading: "Nubra Valley Trails with Leh and Pangong",
    description:
      "Join us on an amazing adventure via the Nubra Valley Trails, including stops in Leh and Pangong. Explore Ladakh's spectacular scenery, including the picturesque Nubra Valley, which is known for its unusual dunes and exquisite monasteries. Discover the lovely Pangong Lake, which is noted for its stunning blue waters. This excursion provides an ideal balance of natural beauty and cultural diversity. Don't miss out on this unforgettable experience; book your Ladakh adventure today!",
    link: "https://www.travlio.in/tour/nubra-valley-trails-with-leh-and-pangong",
  },

  {
    img: "/wp-content/uploads/2024/02/Marvellous-Ladakh-with-Turtuk-600x370.jpg",
    heading: "Marvellous Ladakh with Turtuk",
    description:
      "Get ready for an adventure like no other with our Marvellous Ladakh with Turtuk tour! Dive into the stunning landscapes of Ladakh and discover the hidden gem of Turtuk, where breathtaking views and vibrant culture await. Feel the thrill as you explore the mesmerizing Nubra Valley and the sparkling Pangong Lake. From unique traditions to unforgettable moments, this journey is all about fun and exploration. Don’t let this adventure pass you by—book your Ladakh escapade today and make memories that will last a lifetime!",
    link: "https://www.travlio.in/tour/marvellous-ladakh-with-turtuk",
  },

  {
    img: "/wp-content/uploads/2024/02/Exotic-Kashmir-with-Gulmarg-Durga-Puja-Special-600x370.jpg",
    heading: "Exotic Kashmir with Gulmarg – Durga Puja Specia",
    description:
      "Experience the charm of Kashmir with our Exotic Kashmir with Gulmarg tour, made specifically for Durga Puja! Immerse yourself in the breathtaking scenery of Gulmarg, where lush green meadows and snow-capped mountains await. Discover Srinagar's lovely sites, including as its famous gardens and the tranquil Dal Lake. This tour combines magnificent scenery with rich cultural events, making it an ideal escape over the holiday season. Don't miss out on this fascinating adventure—book your Kashmir getaway today and make amazing memories!",
    link: "https://www.travlio.in/tour/exotic-kashmir-with-gulmarg-durga-puja-special",
  },

  {
    img: "/wp-content/uploads/2024/02/Exotic-Kashmir-with-Sonmarg-Durga-Puja-Special-600x370.jpg",
    heading: "Exotic Kashmir with Sonmarg – Durga Puja Special",
    description: `Experience the magic of Kashmir with Travlio's "Exotic Kashmir with Sonmarg" package this Durga Puja! Delve into stunning landscapes, rich culture, and thrilling adventures. This special offer includes comfortable accommodations, guided tours to mesmerizing destinations, and unique experiences that highlight the beauty of the region. Perfect for travelers seeking both tranquility and excitement, let Travlio help you create unforgettable memories in paradise!`,
    link: "https://www.travlio.in/tour/exotic-kashmir-with-sonmarg-durga-puja-special",
  },

  {
    img: "/wp-content/uploads/2024/02/Honeymoon-Amazing-Moments-Kashmir-with-Sonmarg-Excursion-Summer-Special-600x370.jpg",
    heading:
      "Honeymoon – Amazing Moments Kashmir with Sonmarg Excursion – Summer Special",
    description: `Discover the stunning splendor of Kashmir with Travlio's "Honeymoon Amazing Moments" package. Explore quiet landscapes, vibrant cultures, and unforgettable moments in Sonmarg and beyond. This summer special is ideal for couples looking for romance and adventure, as it includes cozy lodgings, guided excursions, and stunning sites that will create lasting memories. Let Travlio design your perfect vacation in paradise!`,
    link: "https://www.travlio.in/tour/honeymoon-amazing-moments-kashmir-with-sonmarg-excursion",
  },
];

export default async function Home() {
  return (
    <main className={`w-full`}>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {/* <BannerImage /> */}
      <Banner />
      <HomeInfo />
      {/* <div className="w-full px-24 sm:px-3 mt-8 flex justify-center flex-col items-center gap-y-5">
        <h3 className="text-4xl font-semibold text-gray-500 sm:text-xl">
          Travlio - The Best Travel Agency in Kolkata
        </h3>
        <p className="text-sm sm:text-center">
          We are one of the most eligible travel agency in Kolkata that provides
          tour packages to customers with a proper understanding of their
          choices and preferences in the tour. With our services of tour
          packages, we provide extensive management which makes the tourists
          more comfortable with us. Details of the tour with proper managerial
          assistance are provided to our users which makes the experiences more
          successful making our customers further inclined to our packages. Our
          tour packages are primarily reliant on the resources of good places
          that provide comfortable facilities to our travelers while providing
          them with better conveniences. <br />
          <br />
          As we have different packages of tour destinations, it helps us to
          focus on our attributes while making the services more
          customer-centric. We provide various tour packages to our consumers as
          we tend to identify international packages alongside domestic
          destinations. We provide Europe tour packages that are quite exclusive
          in our agency as we have various packages for different destinations
          in Europe. Since we are quite a renowned travel agency in Kolkata, it
          has made our attributes for packaging tour resources more intriguing
          for the customers. As our packages are developed with proper customer
          preferences, it helps us to design package costs and other facilities
          for the tourists.
        </p>
      </div> */}

      <h2 className="font-bold text-3xl text-center pt-14">
        Travlio - The Best Travel Agency in Kolkata
      </h2>

      <div className="flex items-center px-36 py-16 sm:px-5 sm:flex-col-reverse">
        <div className="sm:pt-10">
          <p className="text-[14px] font-semibold text-gray-500">
            Do you often find yourself daydreaming while scrolling through
            beautiful pictures of sunny beaches, snowy mountains, or lively
            cities? If you feel a spark of wanderlust when friends and family
            head off on trips, you’re not alone! At Travlio, we believe it’s
            time for you to pack your bags and go on your amazing adventure.
            <br />
            <br />
            As proud partners of{" "}
            <Link className="linkStyle" href="https://www.thomascook.in/">
              Thomas Cook
            </Link>{" "}
            Kolkata, we are recognized as one of the best travel agencies in
            Kolkata. We offer exciting international tour packages that fit your
            dreams and budget. Whether you’ve always wanted to wander the
            charming streets of Paris or relax on a beautiful beach, Travlio is
            your friendly international travel agent in Kolkata, here to make
            your travel dreams come true.
            <br />
            <br />
            Imagine standing in the picturesque Italian countryside or enjoying
            the sunset on a serene beach. With Travlio, these dreams can become
            a reality! Our specially designed packages make sure you get the
            most out of each destination, allowing you to focus on what truly
            matters: creating wonderful memories.
          </p>
        </div>
        <div className="flex items-center justify-end px-10 min-w-[35rem] sm:min-w-full sm:px-0">
          <div className="relative size-96 sm:size-0 sm:h-64 sm:w-full">
            <Image
              className="size-full rounded-2xl shadow-2xl absolute top-0 z-10"
              src={"/wp-content/uploads/2019/04/page-title-600x500.jpg"}
              alt="Home Page Image1"
              height={1200}
              width={1200}
            />
            <Image
              className="size-full rounded-2xl shadow-2xl absolute blur-2xl top-0 z-0"
              src={"/wp-content/uploads/2019/04/page-title-600x500.jpg"}
              alt="Home Page Image1"
              height={1200}
              width={1200}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center px-36 py-5 sm:px-5 sm:flex-col">
        <div className="flex items-center justify-start min-w-[35rem] sm:min-w-full">
          <div className="relative size-96 sm:h-64 sm:w-full">
            <Image
              className="size-full rounded-2xl shadow-2xl absolute top-0 z-0 blur-2xl"
              src={
                "/wp-content/uploads/2019/03/joseph-barrientos-49318-unsplash-700x660.jpg"
              }
              alt="Home Page Image1"
              height={1200}
              width={1200}
            />
            <Image
              className="size-full rounded-2xl shadow-2xl absolute top-0 z-10"
              src={
                "/wp-content/uploads/2019/03/joseph-barrientos-49318-unsplash-700x660.jpg"
              }
              alt="Home Page Image1"
              height={1200}
              width={1200}
            />
          </div>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-gray-500 sm:mt-10">
            From fun adventure trips to peaceful beach getaways, we have
            something for everyone. As a top Europe travel agency in Kolkata, we
            cater to all kinds of travelers—whether you’re planning a family
            holiday or a solo retreat.
            <br />
            <br />
            We know how important it is to take a break from the daily grind and
            enjoy new experiences. That’s why, as the best international travel
            agency, we take care of everything for you—from planning your
            itinerary to booking your stay—so you can relax and enjoy your
            journey.
            <br />
            <br />
            Are you ready to make your travel dreams come true? Explore our
            website to find exciting packages tailored just for you. Don’t let
            your wanderlust remain just a dream, the world is waiting for you to
            discover! Get in touch with the best travel agent in Kolkata,{" "}
            <Link
              className="linkStyle"
              href={
                "https://www.google.com/maps/place/Thomas+Cook+%7C+Travel+Agent+in+Chinar+Park/@22.6228937,88.4372042,17z/data=!4m6!3m5!1s0x39f89fd2eb4bf057:0x99b71d8061d26fc6!8m2!3d22.6227465!4d88.4415973!16s%2Fg%2F11c1qq3r7p?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
              }
            >
              Travlio
            </Link>{" "}
            today, and let’s start planning your next adventure together—your
            journey of a lifetime is just around the corner!
          </p>
        </div>
      </div>

      <div className="w-full">
        {/* <TourPackages
          tourType="Trending Tour"
          title="Trending Tour Packages"
          subtitle="Discover the best offers on trending international tour packages from Kolkata with us."
          linktxt="View All Tour Packages"
          link="/tour-packages/all"
        />
        <Deal />
        <TourPackages
          tourType="International Tour"
          title="International Tour Packages"
          subtitle="Embark on global adventures with our international tour packages from Kolkata."
          linktxt="View All International Tour Packages"
          link="/tour-packages/international-tour"
        />
        <TourPackages
          tourType="Domestic Tour"
          title="Domestic Tour Packages"
          subtitle="Embark on seamless adventures with our diverse array of domestic tour packages from Kolkata."
          linktxt="View All Domestic Tour Packages"
          link="tour-packages/domestic-tour"
        /> */}

        <div className="w-full px-20 py-16 sm:px-5">
          <h2 className="text-4xl font-bold text-center">
            Our Top International and Domestic Tour Packages
          </h2>

          <h3 className="text-center text-2xl font-bold text-gray-700 mt-4">
            Best International Tour Packages From Kolkata
          </h3>
          <p className="text-sm text-center mt-1 text-gray-500">
            Ready to explore the world? With Travlio’s best international tour
            packages from Kolkata, you can dive into adventures that inspire and
            excite you. From the charm of Paris to the vibrant streets of the
            UK, we’ve crafted unforgettable journeys just for you. Let’s make
            your dream vacation a reality!
          </p>

          <ul className="grid grid-cols-3 pt-12 gap-6 sm:grid-cols-1">
            {internationTourInfo.map((item, index) => (
              <li
                key={index}
                className="shadow-xl rounded-2xl border border-gray-200 overflow-hidden"
              >
                <Image src={item.img} alt="" height={1200} width={1200} />
                <div className="p-5">
                  <h3>{item.heading}</h3>
                  <ReadMorePTag className="text-sm">{item.description}</ReadMorePTag>
                  {/* <p className="text-sm line-clamp-2">{item.description}</p> */}

                  <Link
                    href={item.link}
                    className="text-sm flex items-center gap-x-2 rounded-2xl mt-5 font-semibold text-blue-600"
                  >
                    Explore More
                    <FaLongArrowAltDown className="-rotate-90" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-center text-2xl font-bold text-gray-700 mt-4">
            Top Domestic Tour Packages From Kolkata
          </h3>
          <p className="text-sm text-center mt-1 text-gray-500">
            Discover the beauty of India with Travlio’s top domestic tour
            packages from Kolkata! Whether you’re seeking the breathtaking
            landscapes of Kashmir or the serene hills of Himachal, we’re here to
            create a journey that’s all about you. Let’s explore the hidden gems
            of our incredible country together!
          </p>

          <ul className="grid grid-cols-3 pt-12 gap-6 sm:grid-cols-1">
            {domesticTourInfo.map((item, index) => (
              <li
                key={index}
                className="shadow-xl rounded-2xl border border-gray-200 overflow-hidden"
              >
                <Image src={item.img} alt="" height={1200} width={1200} />
                <div className="p-5">
                  <h3>{item.heading}</h3>
                  <ReadMorePTag className="text-sm">{item.description}</ReadMorePTag>

                  <Link
                    href={item.link}
                    className="text-sm flex items-center gap-x-2 rounded-2xl mt-5 font-semibold text-blue-600"
                  >
                    Explore More
                    <FaLongArrowAltDown className="-rotate-90" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${GLOBAL_X_PADDING} pt-10`}>
          {/* <h2 className="font-semibold uppercase text-2xl text-gray-700 w-full text-center leading-none">
            Why Choose Us
          </h2>
          <p className="text-center w-[80%] mx-auto text-sm text-gray-500 mt-3 sm:w-full">
            At Travlio, we pride ourselves on being the best travel agency in
            Kolkata, dedicated to creating unforgettable travel experiences.
            Here’s why we’re the ideal choice for your next adventure:
          </p> */}

          <div className="w-full flex items-center justify-center flex-col gap-y-2">
            <h2 className="font-bold text-3xl text-center pt-14">
              Why Travlio is Your Go-To International Travel Agency in Kolkata
            </h2>

            <p className="text-sm text-center">
              Your trips should be about relaxation and joy, not stress. With
              Travlio, you can leave the headaches behind and enjoy a seamless
              travel experience. No more worries about booking flights or
              arranging transport—we take care of everything, so you can focus
              on making memories. Instead of typing “travel agencies near me,”
              trust Travlio to handle your journey. As the leading{" "}
              <Link className="linkStyle" href={"/about-us"}>
                international travel agency in Kolkata
              </Link>
              , we offer affordable options for hotels and unique destinations.
              Whether you’re seeking adventure, family fun, or cultural
              experiences, let Travlio help you explore the world effortlessly!
            </p>
          </div>
          <div
            className={`w-full grid grid-cols-3  py-16 mt-0 gap-x-7 gap-y-10 pb-10 sm:mt-0 sm:grid-cols-1 sm:gap-3`}
          >
            <Service
              bgColor="#4E76B1"
              imgsrc="/Your-reliable-advisor.png"
              text="Customized Travel Solutions"
              subtext="We know that every traveler has different preferences, which is why we provide tailored travel solutions for every client. Whether you’re looking for a luxurious Europe tour, a thrilling adventure trip, or a budget-friendly vacation, we customize your travel plans to fit your desires. From handpicked accommodations to unique local experiences, Travlio ensures that your trip is personalized to perfection. Trust the best travel agency in Kolkata to make your dream holiday a reality, just the way you envisioned it."
            />
            <Service
              bgColor="#F1A75E"
              imgsrc="/icons/24-hours-support-svgrepo-com.svg"
              text="24/7 Customer Support"
              subtext="Travel with peace of mind knowing that Travlio provides 24/7 customer support. Whether you’re in a different time zone or need last-minute assistance, we are always available to help. From emergency changes to general inquiries, our dedicated team ensures you have full support throughout your journey. With the top international travel agency in Kolkata, you can focus on enjoying your trip while we take care of any bumps along the way."
            />
            <Service
              bgColor="#35BEC4"
              imgsrc="/icons/flight-booking.png"
              text="Forex Card Services"
              subtext="Managing foreign currency can be stressful, but not when you travel with Travlio. We offer convenient forex card services to ensure you have access to the local currency wherever you are. Load multiple currencies onto a single card and enjoy hassle-free payments throughout your trip. Among the top international travel agency in Kolkata, we make sure that currency exchange is one less thing to worry about, letting you enjoy your vacation with ease."
            />
            <Service
              size={60}
              bgColor="#898AC3"
              imgsrc="/icons/schedule.png"
              text="Affordable EMI Options"
              subtext="At Travlio, we believe that everyone deserves a dream vacation, which is why we provide affordable EMI options to make your travel more accessible. Book your international tour now and pay for it in easy monthly instalments. Whether it’s a European vacation or an exotic tropical getaway, our flexible payment plans ensure your trip doesn’t strain your budget. With the best travel agency in Kolkata, you can travel today and pay later with zero stress!"
            />
            <Service
              size={60}
              bgColor="#ffa781"
              imgsrc="/icons/icons8-guidance-99.png"
              text="Expert Travel Guidance"
              subtext="Our team of experienced travel experts at Travlio offers expert travel guidance to help you navigate every detail of your trip. From choosing the right destinations and securing the best deals to offering tips on must-see attractions, we make your journey seamless and enjoyable. As the top travel agency in Kolkata, we’re dedicated to ensuring you have an unforgettable experience, whether you're traveling for leisure or business."
            />
            <Service
              size={60}
              bgColor="#00e1d9"
              imgsrc="/icons/icons8-visa-64.png"
              text="Hassle-Free Visa Assistance"
              subtext="Securing a visa for your international trip can be a daunting process, but not with Travlio. We provide hassle-free visa assistance to help you get the necessary paperwork sorted quickly and efficiently. From guiding you through the application process to ensuring you meet all the requirements, we handle everything, so you don’t have to. Let the best international travel agent in Kolkata take the stress out of your travel preparations!"
            />
            <Service
              size={60}
              bgColor="#efc8b1"
              imgsrc="/icons/icons8-insurance-64.png"
              text="Travel Insurance Support"
              subtext="Travel insurance is essential for any international journey, and Travlio makes sure you're fully covered. Our travel insurance support service helps you choose the right plan that covers medical emergencies, trip cancellations, lost luggage, and more. Whether you're going on a short vacation or a long-term tour, we ensure that you’re protected every step of the way. With the best travel agency in Kolkata, you can travel worry-free, knowing that we have your back in case of any unexpected issues."
            />
            <Service
              size={60}
              bgColor="#210070"
              imgsrc="/icons/icons8-minimum-value-96.png"
              text="Best Value for Money"
              subtext="At Travlio, we believe in providing the best value for money for all our travel packages. We carefully curate itineraries that offer top-notch experiences without stretching your budget. From affordable luxury to budget-friendly adventures, we ensure that every penny you spend is worth it. With the best travel agency in Kolkata, you can rest assured that you’re getting the most out of your travel investment, no matter where your wanderlust takes you!"
            />
          </div>
          <p className="text-center w-[80%] mx-auto text-sm text-gray-500 mt-0 sm:w-full">
            With Travlio, you can trust that your journey will be extraordinary.
            Join us to explore the world with the expertise of the best travel
            agency in Kolkata!
          </p>
        </div>
        {/* <Testimonial /> */}
        <NewTestimonial />
        {/* <RecentBlogs /> */}
        <Blogs />

        <div className="w-full px-20 pb-20 sm:px-5">
          <h2 className="text-center text-2xl font-semibold uppercase">
            FAQs on Travlio International Travel Agency, Kolkata
          </h2>

          <FAQ
            heading=""
            faqus={[
              {
                question: "What services does Travlio offer?",
                answer:
                  "Travlio, your trusted international travel agency in Kolkata, provides a variety of services, including flight bookings, hotel reservations, customized travel packages, visa assistance, and guided tours for both domestic and international destinations.",
              },
              {
                question: "How can I book a trip with Travlio?",
                answer:
                  "Booking your next adventure with Travlio is easy! Simply visit our website <a class = 'linkStyle' href = '/'>www.travlio.in</a>, choose your desired travel package, and fill out the inquiry form. You can also contact our customer service team for personalized assistance in planning your journey.",
              },
              {
                question: "Are the travel packages customizable?",
                answer:
                  "Yes! At Travlio, we understand that every traveler has unique preferences. Our international travel packages can be tailored to fit your specific needs, including duration, activities, and accommodations.",
              },
              {
                question: "Do I need travel insurance for my trip?",
                answer:
                  "While travel insurance is not mandatory, we highly recommend it for international travel. It offers protection against unexpected events like trip cancellations or medical emergencies, ensuring peace of mind during your journey.",
              },
              {
                question: "Can Travlio assist with visa applications?",
                answer:
                  "Absolutely! Travlio provides comprehensive assistance with visa applications, helping you navigate the requirements and prepare the necessary documentation for your international travel.",
              },
              {
                question: "How can I contact Travlio for more information?",
                answer:
                  "You can easily reach us via our website’s contact form, email, phone or <a href = 'https://www.google.com/maps/place/55,+Gariahat+Rd,+Dover+Terrace,+Ballygunge,+Kolkata,+West+Bengal+700019/@22.5267787,88.363334,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0276d712bef265:0x70bf0735daa298da!8m2!3d22.5267738!4d88.3659089!16s%2Fg%2F11jv73xg94?entry=tts&g_ep=EgoyMDI0MDUwNy4xKgBIAVAD' class = 'linkStyle'>visit our office.</a> Our dedicated customer service team is here to assist you with any questions about our travel services and packages.",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
