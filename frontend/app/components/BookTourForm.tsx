"use client";

import React, { useState } from "react";
import SpinnerSvg from "./SpinnerSvg";
import { useRouter } from "next/navigation";
import { SEND_EMAIL_API } from "../constant";

export default function BookTourForm() {
  const [isProgress, setIsProgress] = useState(false);
  const [message, setMessage] = useState("");

  const route = useRouter();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setMessage("");
    setIsProgress(true);

    try {
      const response = await fetch(SEND_EMAIL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "book-tour",
          name: formData.get("full-name"),
          email: formData.get("email"),
          enquiry: formData.get("enquiry"),
        }),
      });

      await response.json();
      setMessage("Enquiry has successfully submitted");
      route.push("/thank-you");
    } catch (error) {
      setMessage("Enquiry submission failed");
    } finally {
      setIsProgress(false);
    }
  };

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-6 mt-8">
      <div>
        <span className="font-semibold outline-blue-500">Full Name *</span>
        <input name="full-name" required type="text" className="w-full py-3" />
      </div>

      <div>
        <span className="font-semibold outline-blue-500">Email Address *</span>
        <input name="email" required type="email" className="w-full py-3" />
      </div>

      <div>
        <span className="font-semibold outline-blue-500">Your Enquiry</span>
        <textarea name="enquiry" className="w-full py-3" rows={5}></textarea>
      </div>

      <button
        disabled={isProgress}
        title="Submit Enquiry Button"
        className="bg-[#275B8B] font-semibold flex items-center justify-center text-sm text-white py-4 hover:bg-[#3d71a1] transition-all duration-500"
      >
        {isProgress ? <SpinnerSvg size="20px" /> : "SUBMIT ENQUIRY"}
      </button>

      <p
        className={`text-center font-semibold text-sm ${
          message == "Enquiry submission failed"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
