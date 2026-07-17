import React, { JSX } from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Title({
  level = 1,
  children,
  className,
  id,
}: TitleProps) {
  const baseStyles = "text-left text-black font-semibold";

  const sizeStyles = {
    1: "text-2xl sm:text-3xl md:text-[40px]/tight",
    2: "text-xl sm:text-2xl md:text-3xl",
    3: "text-lg sm:text-xl md:text-2xl",
    4: "text-base sm:text-lg md:text-xl",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      id={id}
      className={cn(
        baseStyles,
        sizeStyles[level as keyof typeof sizeStyles],
        className
      )}
    >
      {children}
    </Tag>
  );
}
