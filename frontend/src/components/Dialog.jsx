import ReactDOM from "react-dom";

import Button from "./Button.jsx";

export default function Dialog({ title, description, dialogClose, yes, no }) {
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <div className="flex justify-between items-center border-b pb-3">
           {title ?  <h2 className="text-xl font-semibold text-gray-800">{title}</h2> : ''}
            <button
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              onClick={dialogClose}
            >
              ✕
            </button>
          </div>

            <p className="text-lg font-semibold text-gray-600">{description}</p>
          <div className="mt-4 flex">
            <Button
              onClick={yes}
              
            >
              Yes
            </Button>
            <Button
              onClick={no}
              secondary={true}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
