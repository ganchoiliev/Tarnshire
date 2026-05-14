import type { ReactNode } from "react";

type ContainerWidth = "default" | "narrow";

type ContainerProps = {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
};

const widthClass: Record<ContainerWidth, string> = {
  default: "",
  narrow: "max-w-[800px]",
};

export function Container({ children, width = "default", className = "" }: ContainerProps) {
  const cls = [
    "mx-auto w-full px-6 md:px-14",
    widthClass[width],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cls}>{children}</div>;
}
