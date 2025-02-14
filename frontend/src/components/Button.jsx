/* eslint-disable react/prop-types */

export default function Button({children,onClick}) {

    return (
        <button type='button' onClick={onClick} className="w-full bg-blue-500 text-white mt-4 p-2 rounded-lg hover:bg-blue-600 transition">
            {children}
        </button>
    )
}
