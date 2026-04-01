"use client";

import React, { useState } from "react";

type PTagType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

interface IProps extends PTagType {
  children: React.ReactNode;
}

export default function ReadMorePTag(props: IProps) {
  const [isVisiable, setIsVisiable] = useState(false);

  return (
    <p {...props}>
      <span
        className={`${isVisiable ? "line-clamp-none" : "line-clamp-2"} ${
          props.className
        }`}
      >
        {props.children}
      </span>
      <span
        onClick={() => setIsVisiable(!isVisiable)}
        className="float-left text-blue-400 text-xs w-full cursor-pointer block text-right"
      >
        {isVisiable ? "Read less" : "Read more"}
      </span>
    </p>
  );
}
