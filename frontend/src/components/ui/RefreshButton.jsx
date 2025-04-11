/* eslint-disable react/prop-types */

export default function RefreshButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-5 cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-75"
    >
      {children}
    </button>
  );
} 