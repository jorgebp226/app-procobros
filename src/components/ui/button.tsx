// src/components/ui/button.tsx
import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "default", size = "md", ...props }) => {
  const classes = classNames(
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500": variant === "default",
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500": variant === "destructive",
      "text-gray-700 bg-gray-200 hover:bg-gray-300": variant === "outline",
      "px-2 py-1 text-sm": size === "sm",
      "px-4 py-2 text-md": size === "md",
      "px-6 py-3 text-lg": size === "lg",
    }
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
