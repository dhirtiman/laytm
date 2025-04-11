/* eslint-disable react/prop-types */
export default function InputBox({
  value,
  type,
  placeholder,
  onChange,
  onKeyUp,
}) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
