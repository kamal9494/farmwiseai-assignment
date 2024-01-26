import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../redux/slices/fieldSlice";
import Selector from "./Selector";
import { toast } from "react-toastify";

const FormFields = () => {
  const [category, setCategory] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldDisplayName, setFieldDisplayName] = useState("");
  const [fieldDataType, setFieldDataType] = useState("");
  const [fieldMaxLength, setFieldMaxLength] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [fieldData, setFieldData] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.fields);

  const handleConfirm = () => {
    const newErrors = {};
    if (fieldType === "text" && !fieldDisplayName) {
      newErrors[fieldType] = "Please fill details completely";
      toast.error("Display name cannot be empty!");
      return;
    }
    if (fieldType === "dropdown" && (!fieldDisplayName || !fieldData)) {
      newErrors[fieldType] = "Please fill details completely";
      toast.error("Display name and Field Data cannot be empty!");
      return;
    }

    if (fieldType === "date" && (!fieldDisplayName || !minDate || !maxDate)) {
      newErrors[fieldType] = "Please fill details completely";
      toast.error("Display name, min Date and max Date cannot be empty!");
      return;
    }
    if (inputs[category].length >= 4) {
      newErrors[fieldType] = "Please fill details completely";
      toast.error("You can add only maximum of 4 input fields.");
      return;
    }
    const currentFields = {
      fieldType,
      fieldDisplayName,
      fieldDataType,
      fieldMaxLength,
      isMandatory,
      fieldData,
      minDate,
      maxDate,
    };
    dispatch(addField({ category, currentFields }));
    setFieldType("");
    setFieldDisplayName("");
    setFieldDataType("");
    setFieldMaxLength("");
    setIsMandatory(false);
    setFieldData("");
    setMinDate("");
    setMaxDate("");
    if (Object.keys(newErrors).length === 0) toast.success("Field Added!");
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleFieldChange = (value) => {
    setFieldType(value);
  };

  return (
    <div>
      <div className="flex flex-col items-center p-5 gap-2">
        <label htmlFor="category">Dynamic Data Collection</label>
        <Selector
          name="category"
          id="category"
          displayName={category ? category : "Select"}
          width="w-[200px]"
          dropdown={["student", "selfEmployee", "business"]}
          isIconVisible={true}
          handleChange={handleCategoryChange}
          dropStyle="bg-[#253858] text-white hover:bg-[#3b4b6d]"
        />
      </div>

      <div className="px-20">
        {category && (
          <div className="flex justify-left">
            <Selector
              displayName={fieldType ? fieldType : "Add Field"}
              width="w-[140px]"
              dropdown={["text", "dropdown", "date"]}
              isIconVisible={false}
              handleChange={handleFieldChange}
              dropStyle="bg-[#fff] border-[1px] border-black text-black hover:bg-gray-50"
            />
          </div>
        )}
        {msg && <p className="text-green-500 text-center p-2">{msg}</p>}
        {error && <p className="text-red-500 text-center p-2">{error}</p>}
        {fieldType && (
          <div className="flex items-end flex-wrap gap-7 mt-10">
            <div className="flex flex-col gap-1">
              <label htmlFor="fieldType" className="font-semibold">
                Field Type
              </label>
              <select
                name="fieldType"
                id="fieldType"
                className="bg-[#6d777e] p-3 w-[150px] rounded-md outline-none text-white"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
              >
                <option className="bg-white text-black" value="text">
                  Text Box
                </option>
                <option className="bg-white text-black" value="dropdown">
                  Dropdown
                </option>
                <option className="bg-white text-black" value="date">
                  Date
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fieldDisplayName" className="font-semibold">
                Field Display Name
                <span className="text-red-500">*</span>
              </label>
              <input
                id="fieldDisplayName"
                name="fieldDisplayName"
                className="p-3 min-w-[150px] rounded-md outline-none border-solid border-[2px]"
                type="text"
                value={fieldDisplayName}
                onChange={(e) => setFieldDisplayName(e.target.value)}
                placeholder="Display Name"
              />
            </div>

            {fieldType === "text" ? (
              <div className="flex flex-col gap-1">
                <label htmlFor="fieldDataType" className="font-semibold">
                  Field Data Type
                </label>
                <select
                  name="fieldDataType"
                  id="fieldDataType"
                  className="bg-[#016ac9] p-3 w-[150px] rounded-md outline-none text-white"
                  value={fieldDataType}
                  onChange={(e) => setFieldDataType(e.target.value)}
                >
                  <option className="bg-white text-black" value="text">
                    Text
                  </option>
                  <option className="bg-white text-black" value="number">
                    Number
                  </option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label htmlFor="fieldDataType" className="font-semibold">
                  Field Data Type
                </label>
                {fieldType === "dropdown" ? (
                  <button
                    id="fieldDataType"
                    name="fieldDataType"
                    className="bg-[#016ac9] p-3 w-[150px] rounded-md outline-none text-white"
                  >
                    String
                  </button>
                ) : (
                  <button
                    id="fieldDataType"
                    name="fieldDataType"
                    className="bg-[#016ac9] p-3 w-[150px] rounded-md outline-none text-white"
                  >
                    {fieldType}
                  </button>
                )}
              </div>
            )}

            {fieldType === "text" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="fieldMaxLength" className="font-semibold">
                  Field Max Length Allowed
                </label>
                <input
                  id="fieldMaxLength"
                  name="fieldMaxLength"
                  className="p-3 w-[100px] rounded-md outline-none border-solid border-[2px]"
                  type="text"
                  onChange={(e) => setFieldMaxLength(e.target.value)}
                  value={fieldMaxLength}
                  placeholder="Length"
                ></input>
              </div>
            )}

            {fieldType === "date" && (
              <div className="flex flex-col items-center">
                <label className="font-semibold">
                  Date range validation <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="minDate">Min Date</label>
                    <input
                      id="minDate"
                      name="minDate"
                      className="border-solid border-[2px] p-2"
                      type="date"
                      value={minDate}
                      onChange={(e) => setMinDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="maxDate">Max Date</label>
                    <input
                      id="maxDate"
                      name="maxDate"
                      className="border-solid border-[2px] p-2"
                      type="date"
                      value={maxDate}
                      onChange={(e) => setMaxDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="isMandatory" className="font-semibold">
                Mandatory
              </label>
              <select
                name="isMandatory"
                id="isMandatory"
                className="bg-[#016ac9] p-3 w-[100px] rounded-md outline-none text-white"
                value={isMandatory}
                onChange={(e) =>
                  e.target.value === "true"
                    ? setIsMandatory(true)
                    : setIsMandatory(false)
                }
              >
                <option value="false" className="text-black bg-white">
                  No
                </option>
                <option value="true" className="text-black bg-white">
                  Yes
                </option>
              </select>
            </div>

            {fieldType === "dropdown" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="fieldData" className="font-semibold">
                  Field Data
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="fieldData"
                  name="fieldData"
                  className="p-3 min-w-[150px] rounded-md outline-none border-solid border-[2px]"
                  type="text"
                  value={fieldData}
                  onChange={(e) => setFieldData(e.target.value)}
                  placeholder="Field Data"
                />
              </div>
            )}

            <button
              className="p-3 w-[150px] border border-black rounded-md outline-none"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFields;
