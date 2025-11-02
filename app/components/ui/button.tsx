import { cn } from "@/utils/cn";
import { ButtonProps } from "@/utils/types";

export const Button = ({
  children,
  onClick,
  className,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "rounded-full group cursor-pointer p-4 md:w-auto transition-all duration-300 flex flex-row justify-center";

  return (
    <button onClick={onClick} className={cn(baseStyle, className)} {...props}>
      {icon && iconPosition === "left" && (
        <span className="mr-2 size-5 transition-transform duration-200 group-hover:-translate-x-1 group-active:-translate-x-1">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="ml-2 size-5 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};
