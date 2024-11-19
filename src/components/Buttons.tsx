import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export function ExpandButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
}

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};
