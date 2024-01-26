import React, { useState } from "react";

const Selector = ({
  displayName,
  dropdown,
  isIconVisible,
  handleChange,
  dropStyle,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClicked = (value) => {
    setSelectedOption(value);
    handleChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`${width}`}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`${dropStyle} ${width} font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center justify-between`}
        type="button"
        onClick={toggleDropdown}
      >
        <div className="flex gap-2 items-center">
          {isIconVisible && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="9" r="3" stroke="white" strokeWidth="1.5" />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
          {displayName}
        </div>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 bg-gray-100 divide-y ${
          isOpen ? "block" : "hidden"
        } rounded shadow ${width}`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropdown.map((item, index) => (
            <li key={index}>
              <button
                href="#"
                className="w-full text-left flex items-center gap-4 px-4 py-2 hover:bg-gray-300"
                onClick={() => handleOptionClicked(item)}
              >
                {isIconVisible && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="9"
                      r="3"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Selector;
