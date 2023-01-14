import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export const Input = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { className, ...rest } = props;

    return (
      <input
        className={clsx("p-2 block bg-slate-200 rounded", className)}
        ref={ref}
        {...rest}
      />
    );
  }
);
Input.displayName = "Input";
