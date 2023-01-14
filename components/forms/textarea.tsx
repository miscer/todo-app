import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export const TextArea = forwardRef(
  (
    props: TextareaHTMLAttributes<HTMLTextAreaElement>,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { className, ...rest } = props;

    return (
      <textarea
        className={clsx("p-2 block bg-slate-200 rounded", className)}
        ref={ref}
        {...rest}
      />
    );
  }
);
TextArea.displayName = "TextArea";
