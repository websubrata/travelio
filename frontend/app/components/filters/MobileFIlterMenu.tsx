import React from "react";
import Filter from "./Filter";
import { useSearchParams } from "next/navigation";

const duration = [
  { text: "15 Days 14 Nights", isChecked: false },
  { text: "11 Days 10 Nights", isChecked: false },
  { text: "10 Days 9 Nights", isChecked: false },
  { text: "7 Days 6 Nights", isChecked: false },
];

const tourType = [
  { text: "International Tour", isChecked: false },
  { text: "Domestic Tour", isChecked: false },
];

function MobileFIlterMenu() {
  const searchParams = useSearchParams();

  let queryText: string | null = null;

  const setDurationCheckBoxDone = (textToCheck: string) => {
    if (queryText === null) {
      queryText = `?duration=${textToCheck}`;
    } else {
      queryText += `&duration=${textToCheck}`;
    }

    let indexOfDuration = -1;
    for (var i = 0; i < duration.length; i++) {
      if (duration[i].text === textToCheck) {
        indexOfDuration = i;
      }
    }
    duration[indexOfDuration].isChecked = true;
  };

  const resetDurationCheckBox = () => {
    duration.forEach((item, index) => {
      duration[index].isChecked = false;
    });
  };

  const checkDurationChecbox = () => {
    const durationsParams = searchParams.getAll("duration");

    if (durationsParams.length !== 0) {
      durationsParams.map((item) => {
        setDurationCheckBoxDone(item);
      });
    } else {
      resetDurationCheckBox();
    }
  };

  checkDurationChecbox();

  const setTourTypeCheckBoxDone = (textToCheck: string) => {
    if (queryText === null) {
      queryText = `?tour-type=${textToCheck}`;
    } else {
      queryText += `&tour-type=${textToCheck}`;
    }

    let indexOfDuration = -1;
    for (var i = 0; i < tourType.length; i++) {
      if (tourType[i].text === textToCheck) {
        indexOfDuration = i;
      }
    }
    tourType[indexOfDuration].isChecked = true;
  };

  const resetTourTypeCheckBox = () => {
    tourType.forEach((item, index) => {
      tourType[index].isChecked = false;
    });
  };

  const checkTourTypeChecbox = () => {
    const durationsParams = searchParams.getAll("tour-type");

    if (durationsParams.length !== 0) {
      durationsParams.map((item) => {
        setTourTypeCheckBoxDone(item);
      });
    } else {
      resetTourTypeCheckBox();
    }
  };

  checkTourTypeChecbox();

  return (
    // <div className="w-full h-screen absolute bg-white">
    //   <div className="w-[60%] h-full bg-white absolute bottom-0 top-0 right-0 px-3 py-4 z-40">
    //     <div className="w-full h-full flex items-center justify-between border-b pb-2 px-2">
    //       <span className="font-semibold">FILTERS</span>
    //     </div>
    //     <Filter name="Duration" filters={duration} />
    //   </div>
    // </div>

    <div className="absolute bg-[#0000006b] w-full top-0 bottom-0 z-50 flex justify-end">
      <div className="w-[60%] h-full bg-white p-5">
        {/* <span className="font-semibold">FILTERS</span> */}

        <Filter name="Duration" filters={duration} />
      </div>
    </div>
  );
}

export default MobileFIlterMenu;
