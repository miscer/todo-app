import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={clsx("-m-1 p-1 block bg-slate-200 rounded", className)}
      {...rest}
    />
  );
}
