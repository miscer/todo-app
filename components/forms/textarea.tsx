import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;

  return (
    <textarea
      className={clsx("-m-1 p-1 block bg-slate-200 rounded", className)}
      {...rest}
    />
  );
}
