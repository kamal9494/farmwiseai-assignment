import React, { useState } from "react";
import { useSelector } from "react-redux";

const DisplayFields = () => {
  const [category, setCategory] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const inputs = useSelector((state) => state.fields);

  const handleInputChange = (name, value) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const validateInputs = () => {
    setMsg("");
    const newErrors = {};
    inputs[category].forEach((input) => {
      const value = inputValues[input.fieldDisplayName] || "";
      const isRequired = input.isMandatory;
      const isTextType = input.fieldType === "text";
      const isNumberType = input.fieldDataType === "number";
      const isDateType = input.fieldType === "date";
      const hasMinDate = input.minDate !== "";
      const hasMaxDate = input.maxDate !== "";
      if (isRequired && !value) {
        newErrors[input.fieldDisplayName] = "Field is required.";
      }

      if (
        isTextType &&
        isNumberType &&
        value.length > parseInt(input.fieldMaxLength)
      ) {
        newErrors[input.fieldDisplayName] =
          "Text length exceeds maximum length.";
      }

      if (isDateType) {
        const currentDate = new Date(value);
        const minDate = hasMinDate ? new Date(input.minDate) : null;
        const maxDate = hasMaxDate ? new Date(input.maxDate) : null;

        if (
          (minDate && currentDate < minDate) ||
          (maxDate && currentDate > maxDate)
        ) {
          newErrors[input.fieldDisplayName] = "Date is out of range.";
        }
      }
    });
    console.log(inputValues);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0) setMsg("Validation Success");
  };

  const renderInputField = (input, index) => {
    switch (input.fieldType) {
      case "text":
        return (
          <input
            key={index}
            className="p-2 w-[150px] rounded-md outline-none border-solid border-[2px]"
            type={input.fieldType}
            placeholder={input.fieldDisplayName}
            value={inputValues[input.fieldDisplayName] || ""}
            onChange={(e) =>
              handleInputChange(input.fieldDisplayName, e.target.value)
            }
          />
        );
      case "dropdown":
        return (
          <select
            key={index}
            className="bg-[#016ac9] p-2 w-[150px] rounded-md outline-none text-white"
            value={inputValues[input.fieldDisplayName] || ""}
            onChange={(e) =>
              handleInputChange(input.fieldDisplayName, e.target.value)
            }
          >
            <option className="hidden ">Select</option>
            {input.fieldData.split(/[\s,]+/).map((option, optionIndex) => (
              <option className="bg-white text-black" key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "date":
        return (
          <input
            key={index}
            className="p-2 w-[150px] rounded-md outline-none border-solid border-[2px]"
            type={input.fieldType}
            value={inputValues[input.fieldDisplayName] || ""}
            onChange={(e) =>
              handleInputChange(input.fieldDisplayName, e.target.value)
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-20">
      <div className="flex flex-col items-center p-5 gap-2">
        <label htmlFor="category">Select category to display</label>
        <select
          name="category"
          id="category"
          className="w-[200px] bg-[#253858] text-white p-2 rounded-md border-none outline-none"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option className="bg-white text-black hidden" value="select">
            Select
          </option>
          <option className="bg-white text-black" value="student">
            Student
          </option>
          <option className="bg-white text-black" value="selfEmployee">
            Self-Employee
          </option>
          <option className="bg-white text-black" value="business">
            Business
          </option>
        </select>
      </div>
      <div className="flex flex-col list-none items-center gap-4 p-5">
        {Object.keys(errors).map((errorField, index) => (
          <li key={index} className="text-red-500">
            {errorField} : {errors[errorField]}
          </li>
        ))}
        {msg && <p className="text-green-500">{msg}</p>}

        {category && (
          <div className="flex flex-col items-center gap-5">
            {inputs[category].length === 0 && (
              <span className="font-bold">No Fields</span>
            )}
            <table>
              <tbody>
                {inputs[category].map((input, index) => (
                  <tr key={index}>
                    <td>
                      <span className="p-3">{input.fieldDisplayName}<span className="text-red-500">{input.isMandatory ? "*" : ""}</span></span>
                    </td>
                    <td>{renderInputField(input, index)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {inputs[category].length !== 0 && (
              <button
                className="p-2 w-[150px] border border-black rounded-md outline-none"
                onClick={validateInputs}
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFields;
