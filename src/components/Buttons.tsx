import { ButtonProps } from "../types";
import { XMarkIcon } from "./icons";

export function ToggleButton({
  children,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function DeleteButton({ onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      <XMarkIcon />
    </button>
  );
}
