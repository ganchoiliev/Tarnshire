import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "header" | "footer";
};

const widthClass: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
};

export function Container({
  children,
  className = "",
  width = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto px-6 md:px-14 ${widthClass[width]} ${className}`}>
      {children}
    </Tag>
  );
}
