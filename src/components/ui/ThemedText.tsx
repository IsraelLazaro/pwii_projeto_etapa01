import React from "react";
import clsx from "clsx";

export type ThemedTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "div"; // permite trocar o elemento HTML
};

export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  className,
  type = "default",
  as: Component = "p",
  ...props
}) => {
  const typeClasses: Record<string, string> = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-4xl font-bold leading-tight",
    subtitle: "text-xl font-bold",
    link: "text-base leading-6 text-sky-700 hover:underline cursor-pointer",
  };

  return (
    <Component className={clsx(typeClasses[type], className)} {...props}>
      {children}
    </Component>
  );
};
