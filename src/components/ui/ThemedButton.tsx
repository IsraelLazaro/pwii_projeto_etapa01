import React from "react";
import clsx from "clsx";

export type ThemedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  typeStyle?: "success" | "danger" | "transparent" | "primary";
  shape?: "circle";
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  className,
  typeStyle = "primary",
  shape,
  ...props
}) => {
  const baseStyle =
    "flex items-center justify-center h-10 px-4 rounded-lg border transition-colors";

  const typeClasses: Record<string, string> = {
    primary: "bg-blue-600 text-white border-transparent hover:bg-blue-700",
    success: "bg-green-600 text-white border-transparent hover:bg-green-700",
    danger: "bg-red-600 text-white border-transparent hover:bg-red-700",
    transparent: "bg-transparent text-black border-gray-300 hover:bg-gray-100",
  };

  const shapeClasses = shape === "circle" ? "w-10 h-10 rounded-full p-0" : "";

  return (
    <button
      className={clsx(baseStyle, typeClasses[typeStyle], shapeClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};
