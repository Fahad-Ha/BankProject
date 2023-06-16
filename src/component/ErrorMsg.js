import React from "react";

const ErrorMsg = ({ msg, color }) => {
  return (
    <div
      className={
        color
          ? `${color} text-white px-4 py-3 mb-2 rounded-md text-sm text-center`
          : "bg-red-500  text-white px-4 py-3 mb-2 rounded-md text-sm text-center "
      }
    >
      <p>{msg}</p>
    </div>
  );
};

export default ErrorMsg;
