"use client";

import { setDialog } from "@/app/redux/slice/dialogSlice";
import { RootState } from "@/app/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RewardDialog from "./RewardDialog";
import ContactUsDialog from "./ContactUsDialog";
import MobileFIlterMenu from "../filters/MobileFIlterMenu";
import StudyAbroad from "./StudyAbroad";

const dialogs = new Map();
dialogs.set("reward-dialog", <RewardDialog />);
dialogs.set("contact-us-dialog", <ContactUsDialog />);
dialogs.set("mobile-filter-menu", <MobileFIlterMenu />);
dialogs.set("study-abroad", <StudyAbroad />);

function DialogLayout() {
  const { dialog } = useSelector((state: RootState) => state.dialog);
  const dispatch = useDispatch();
  const handleDialogDismiss = (e: any) => {
    e.stopPropagation();
    dispatch(setDialog({ dialog: null }));
  };
  return (
    <div
      onClick={handleDialogDismiss}
      className={`w-full h-full bg-[#0000006b] z-50 items-center justify-center fixed ${
        dialog ? "flex" : "hidden"
      }`}
    >
      {dialogs.get(dialog)}
    </div>
  );
}

export default DialogLayout;
