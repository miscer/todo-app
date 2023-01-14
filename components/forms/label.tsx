import { LabelHTMLAttributes } from "react";
import clsx from "clsx";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...rest } = props;

  return <label className={clsx("text-sm font-bold", className)} {...rest} />;
}
