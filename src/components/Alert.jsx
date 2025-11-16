import React from "react";

function Alert({ message, type, show }) {
  const colors = {
    success: "bg-green-500 text-white border border-green-600",
    error: "bg-red-500 text-white text-center border border-red-600",
  };

  return (
    <div
      className={`
        absolute 
        left-1/2 -translate-x-1/2 
        top-4
        w-[90%] max-w-sm
        px-4 py-2 rounded-md 
        shadow-md text-sm font-medium
        transition-all duration-300
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
        ${colors[type]}
      `}
    >
      {message}
    </div>
  );
}

export default Alert;
