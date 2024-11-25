// src/components/ui/badge.tsx
import React from "react";
import classNames from "classnames";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "outline";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className }) => {
  const classes = classNames(
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
    {
      "bg-blue-100 text-blue-800": variant === "secondary",
      "bg-red-100 text-red-800": variant === "destructive",
      "bg-green-100 text-green-800": variant === "success",
      "bg-yellow-100 text-yellow-800": variant === "warning",
      "bg-sky-100 text-sky-800": variant === "info",
      "bg-gray-100 text-gray-800": variant === "default",
      "border border-gray-200 bg-white text-gray-800": variant === "outline",
    },
    className
  );

  return <span className={classes}>{children}</span>;
};
