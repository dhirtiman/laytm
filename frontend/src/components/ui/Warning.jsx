import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function Warning({ message, removeWarning }) {
  useEffect(() => {
    setTimeout(() => {
      removeWarning();
    }, 1700);
  }, [removeWarning]);

  return (
    <div className=" text-center animate-pulse text-red-600" >
      <p>{message}</p>
    </div>
  );
} 