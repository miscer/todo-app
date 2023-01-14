import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={clsx("p-2 block bg-slate-200 rounded", className)}
      {...rest}
    />
  );
}
