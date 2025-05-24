import React from "react";

const InputBox = ({ id, placeholder, type, className, ...rest }) => {
  return (
    <div className="w-full">
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        id={id}
        {...rest} // this forwards register props
      />
    </div>
  );
};

export default InputBox;
