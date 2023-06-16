import React from "react";

const ErrorMsg = ({ msg }) => {
  return (
    <div className="bg-red-500 text-white px-4 py-3 mb-2 rounded-md text-sm text-center">
      <p>{msg}</p>
    </div>
  );
};

export default ErrorMsg;
