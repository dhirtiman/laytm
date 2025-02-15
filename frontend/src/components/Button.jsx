/* eslint-disable react/prop-types */

export default function Button({ children, onClick, secondary }) {
  const classes = secondary
    ? "bg-blue-100 hover:bg-blue-200 transition text-black"
    : "bg-blue-500 text-white hover:bg-blue-600 transition";

  return (
    <button
      type="button"
      onClick={onClick}
      className={"w-full mt-4 mx-4 p-2 rounded-lg "+classes}
    >
      {children}
    </button>
  );
}
