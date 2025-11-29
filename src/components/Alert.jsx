import React from "react";

function Alert({ message, type, show }) {
  const colors = {
    success: "bg-green-500 text-white border border-green-600",
    error: "bg-red-500 text-white text-center border border-red-600",
  };

  return (
    <div
      className={`
  fixed z-20
  top-5 right-5
  w-full max-w-xs sm:max-w-sm md:max-w-md

  px-4 py-3 rounded-lg shadow-lg border
  text-sm font-medium

  transition-all duration-300 ease-out transform
  ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}

  ${colors[type]}
`}
    >
      {message}
    </div>
  );
}

export default Alert;
