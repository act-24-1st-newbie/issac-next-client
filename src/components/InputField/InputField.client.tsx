"use client"
import Image from "next/image";
import PropTypes from "prop-types";
import { ChangeEvent, KeyboardEvent, forwardRef, useEffect, useRef, useState } from "react";
import "./InputField.css";

interface InputFieldProps {
  placeholder?: string;
  onSubmit: (input: string) => void;
  border?: string;
  initial_input?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder, onSubmit, border, initial_input = "" }, ref) => {
    const [inputValue, setInputValue] = useState<string>(initial_input);
    const [inputState, setInputState] = useState<string>("");
    const internalRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && inputState === "valid") {
        handleSubmit();
      }
    };

    const handleSubmit = () => {
      onSubmit(inputValue.trim());
      setInputValue("");
    };

    useEffect(() => {
      if (inputValue === "") {
        setInputState("");
      } else {
        const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharactersRegex.test(inputValue)) {
          setInputState("error");
        } else {
          setInputState("valid");
        }
      }
    }, [inputValue]);

    const usedRef = ref || internalRef;

    return (
      <div className="InputField">
        <section className={inputState} style={{ border }}>
          <div className="InputBox">
            <input
              type="search"
              style={{ border }}
              value={inputValue}
              className={`w-full h-8 text-2xl outline-none ${border === "true" ? "border-0" : "border-b border-black"} focus:border-blue ${inputState === "error" ? "border-red-500" : ""}`}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              ref={usedRef}
              autoFocus
            />
          </div>
          <Image
            className={`align-self-center w-6 h-6 ${inputState === "valid" ? "cursor-pointer" : ""}`}
            src={inputState === "valid" ? "img/ic_send_hov.png" : "img/ic_send_nor.png"}
            alt="Send Button"
            width={24}
            height={24}
            onClick={inputState === "valid" ? handleSubmit : undefined}
          />
        </section>
        {inputState === "error" && (
          <p className="ErrorMessage">Error message</p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

InputField.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  border: PropTypes.string,
  initial_input: PropTypes.string,
};

export default InputField;
