"use client";

import React, { useState } from "react";
import SpinnerSvg from "../components/SpinnerSvg";
import { SEND_EMAIL_API } from "../constant";
import { useRouter } from "next/navigation";

function ContactPageForm() {
  const [isMailSending, setIsMailSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const route = useRouter();

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsMailSending(true);
    setMessage(null);

    try {
      const response = await fetch(SEND_EMAIL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.get("name"),
          number: formData.get("number"),
          message: formData.get("message"),
          email: formData.get("email"),
        }),
      });

      await response.json();
      route.push("/thank-you");
      setMessage("Enquiry has successfully submitted");
    } catch (error) {
      setMessage("Enquiry submission failed");
    } finally {
      setIsMailSending(false);
    }
  };
  return (
    <form onSubmit={onFormSubmit} className="space-y-3 w-96 sm:w-full sm:mt-10">
      <input
        name="name"
        required
        className="outline-none w-full px-3 py-[0.7rem] text-sm bg-gray-100 rounded-md border-2"
        type="text"
        placeholder="Full Name *"
      />
      <input
        name="email"
        required
        className="outline-none  w-full px-3 py-[0.7rem] text-sm bg-gray-100 rounded-md border-2"
        type="email"
        placeholder="Email ID *"
      />
      <input
        required
        title="Please enter a valid 10 Digit Mobile Number"
        name="number"
        className="outline-none w-full px-3 py-[0.7rem] text-sm bg-gray-100 rounded-md border-2"
        type="text"
        inputMode="numeric"
        pattern="[0-9\s]{10}"
        placeholder="Mobile Number *"
      />
      <textarea
        name="message"
        rows={8}
        placeholder="Your Message"
        className="outline-none  w-full px-3 py-[0.7rem] text-sm bg-gray-100 rounded-md border-2"
      ></textarea>

      <button
        disabled={isMailSending}
        className="outline-none flex items-center justify-center w-full px-3 py-[0.7rem] text-sm bg-blue-400 rounded-md border-2 font-bold"
      >
        {isMailSending ? (
          <SpinnerSvg className="text-white" size="20px" />
        ) : (
          <span>SUBMIT</span>
        )}
      </button>
      <div>
        <p
          className={`text-center ${
            message == "Enquiry submission failed"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

export default ContactPageForm;
