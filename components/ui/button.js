import React from "react";

// A simple button component with Tailwind CSS classes
const Button = ({ children, onClick, className }) => {
  // Default styles for the button
  const baseStyles =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  // Combine default styles with any custom classes passed via props
  const buttonStyles = `${baseStyles} ${className}`;

  return (
    <button onClick={onClick} className={buttonStyles}>
      {children}
    </button>
  );
};

export default Button;
