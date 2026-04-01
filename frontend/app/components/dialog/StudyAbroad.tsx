import { setDialog } from "@/app/redux/slice/dialogSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import SpinnerSvg from "../SpinnerSvg";

interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

function Input(props: IInput) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600 font-semibold">
        {props.label}
      </label>
      <div className="px-5 pb-3 pt-[9px] border border-[#AFD8F5] rounded-full">
        <input
          {...props}
          className="outline-none size-full text-sm placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

interface IDropDown
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
  options: { text: any; value: any }[];
  selectedValue?: string;
  disableValue?: string;
}

function DropDown(props: IDropDown) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600 font-semibold">
        {props.label}
      </label>
      <div className="px-5 pb-3 pt-[9px] border border-[#AFD8F5] rounded-full">
        <select
          {...props}
          className="outline-none size-full text-sm placeholder:text-gray-400 cursor-pointer"
        >
          {props.options.map((item) => (
            <option
              selected={item.value === props.selectedValue}
              disabled={item.value === props.disableValue}
              key={item.value}
              value={item.value}
            >
              {item.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const countries = [
  { text: "-Select Country-", value: "-Select Country-" },
  { text: "Australia", value: "Australia" },
  { text: "Austria", value: "Austria" },
  { text: "Canada", value: "Canada" },
  { text: "China", value: "China" },
  { text: "Cyprus", value: "Cyprus" },
  { text: "Czech Republic", value: "Czech Republic" },
  { text: "Denmark", value: "Denmark" },
  { text: "Dubai", value: "Dubai" },
  { text: "Finland", value: "Finland" },
  { text: "France", value: "France" },
  { text: "Germany", value: "Germany" },
  { text: "Hong Kong", value: "Hong Kong" },
  { text: "Hungary", value: "Hungary" },
  { text: "Ireland", value: "Ireland" },
  { text: "Italy", value: "Italy" },
  { text: "Latvia", value: "Latvia" },
  { text: "Lithuania", value: "Lithuania" },
  { text: "Malaysia", value: "Malaysia" },
  { text: "Mauritius", value: "Mauritius" },
  { text: "Moldova", value: "Moldova" },
  { text: "Netherlands", value: "Netherlands" },
  { text: "New Zealand", value: "New Zealand" },
  { text: "Philippines", value: "Philippines" },
  { text: "Poland", value: "Poland" },
  { text: "Portugal", value: "Portugal" },
  { text: "Russia", value: "Russia" },
  { text: "Singapore", value: "Singapore" },
  { text: "South Africa", value: "South Africa" },
  { text: "Spain", value: "Spain" },
  { text: "Sweden", value: "Sweden" },
  { text: "Switzerland", value: "Switzerland" },
  { text: "Thailand", value: "Thailand" },
  { text: "UK", value: "UK" },
  { text: "Ukraine", value: "Ukraine" },
  { text: "USA", value: "USA" },
];

const courses = [
  { text: "-Course Type-", value: "-Course Type-" },
  { text: "UG Diploma - Certificate", value: "UG Diploma - Certificate" },
  { text: "UG", value: "UG" },
  { text: "PG Diploma - Certificate", value: "PG Diploma - Certificate" },
  { text: "PG", value: "PG" },
  { text: "PHD", value: "PHD" },
  { text: "Foundation", value: "Foundation" },
  { text: "Short Term Program", value: "Short Term Program" },
  { text: "15 Years of Education", value: "15 Years of Education" },
  { text: "Pathway Programs", value: "Pathway Programs" },
  { text: "Advanced Diploma", value: "Advanced Diploma" },
  { text: "Applied Degrees", value: "Applied Degrees" },
  { text: "Doctorate", value: "Doctorate" },
  { text: "Summer School", value: "Summer School" },
];

export default function StudyAbroad() {
  const dispatch = useDispatch();
  const route = useRouter();

  const [isPending, startTransition] = useTransition();

  function closeDialog() {
    dispatch(setDialog({ dialog: "" }));
  }

  async function handleFormSubmit(formData: FormData) {
    if (formData.get("preferred_country") === null)
      return alert("Please Select 'Preferred Country'");
    if (formData.get("course_type") === null)
      return alert("Please Select 'Course Type'");

    startTransition(async () => {
      const response = await fetch("/api/send-email-smtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          contact_number: formData.get("contact_number"),
          preferred_country: formData.get("preferred_country"),
          course_type: formData.get("course_type"),
        }),
      });

      if (!response.ok)
        return alert("Some Error Happning While Sending Email...");

      closeDialog();
      route.push("/thank-you");
    });
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-[53rem] overflow-hidden bg-white card-shdow-dialog h-[80%] flex relative md:w-full md:flex-col md:h-full sm:w-full sm:flex-col sm:h-full"
    >
      <div className="h-full basis-[40rem] sm:hidden md:hidden">
        <Image
          className="h-full object-cover"
          src={"/study-abroad.webp"}
          alt="Travlio Study Abroad"
          height={1200}
          width={1200}
        />
      </div>
      <div className="flex-grow p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-sm text-gray-400">
            Send Your Details And Get A Perfect Study Consultation From Us
          </p>
        </div>
        <form action={handleFormSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-4 *:basis-56 *:flex-grow">
            <Input
              name="name"
              required
              label="Full Name *"
              placeholder="Your Name"
            />
            <Input
              name="email"
              required
              type="email"
              label="Email *"
              placeholder="youremail@gmail.com"
            />
            <Input
              name="contact_number"
              pattern="^\d{10}$"
              title="Please enter a valid 10-digit mobile number"
              required
              type="text"
              label="Contact Number *"
              placeholder="Your Contact Number"
            />
            <DropDown
              name="preferred_country"
              required
              label="Preferred Country *"
              options={countries}
              selectedValue="-Select Country-"
              disableValue="-Select Country-"
            />
            <DropDown
              name="course_type"
              required
              label="Type of Course *"
              options={courses}
              selectedValue="-Course Type-"
              disableValue="-Course Type-"
            />
          </div>

          <button
            disabled={isPending}
            type="submit"
            className={`${
              isPending ? "opacity-55" : "opacity-100"
            } font-semibold text-sm bg-[#2263a0] text-white rounded-full min-w-44 flex items-center justify-center active:scale-90 py-3 card-shdow-dialog`}
          >
            {isPending ? <SpinnerSvg size="20px" /> : "Submit Your Details"}
          </button>
        </form>
      </div>

      <IoCloseOutline
        onClick={closeDialog}
        className="absolute right-5 top-5 active:scale-95 cursor-pointer"
        size={25}
      />
    </div>
  );
}
