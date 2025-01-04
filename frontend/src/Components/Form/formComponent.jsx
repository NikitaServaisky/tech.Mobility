import React from "react";
// import Button from "../Button/buttonComponent";

const Form = ({ fields, onSubmit, submitText = "Submit", className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <label>
              {field.label && <span>{field.label}</span>}
              <input
                type={field.type || "text"}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={field.onChange}
                required={field.required || false}
                disabled={field.disabled || false}
              />
            </label>
          </li>
        ))}
      </ul>
      {/* <Button type="submit">{submitText}</Button> */}
    </form>
  );
};

export default Form;
