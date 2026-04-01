"use client";

import { setDialog } from "@/app/redux/slice/dialogSlice";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useDispatch } from "react-redux";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  dialogKey: string;
  children: React.ReactNode;
}

export default function OpenDialogBtn(props: IProps) {
  const dispatch = useDispatch();
  return (
    <button
      {...props}
      className={props.className}
      onClick={() => dispatch(setDialog({ dialog: props.dialogKey }))}
    >
      {props.children}
    </button>
  );
}
