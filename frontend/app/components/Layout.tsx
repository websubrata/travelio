import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return <div className="px-20 sm:px-5">{children}</div>;
}
