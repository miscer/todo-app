import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  variant: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: () => void;
}

export function Button(props: Props) {
  const { variant, type, children, onClick } = props;

  return (
    <button
      type={type}
      className={clsx(
        "rounded py-2 px-4 text-white transition hover:scale-105 hover:opacity-90",
        backgrounds[variant]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const backgrounds = {
  primary: "bg-teal-600",
  secondary: "bg-slate-600",
  danger: "bg-red-600",
};
