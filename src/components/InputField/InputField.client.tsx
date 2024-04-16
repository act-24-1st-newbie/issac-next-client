"use client";
import Image from "next/image";
import PropTypes from "prop-types";
import {
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

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
      <div className="h-16 w-full">
        <section
          className={`${inputState === "valid" ? "border-blue" : inputState === "error" ? "border-red-600" : ""} ${border === "true" ? "border border-black text-2xl" : ""} flex h-full items-center`}
        >
          <div className="h-full w-full items-center">
            <input
              type="search"
              style={{ border }}
              value={inputValue}
              className={` h-full w-full text-2xl outline-none ${border === "true" ? "border-0" : "border-b border-black"} ${inputState === "valid" ? "border-blue-600" : inputState === "error" ? "border-red-600" : ""}`}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              ref={usedRef}
              autoFocus
            />
          </div>
          <Image
            className={`align-self-center h-6 w-6 ${inputState === "valid" ? "cursor-pointer" : ""}`}
            src={
              inputState === "valid"
                ? "/img/ic_send_hov.png"
                : "/img/ic_send_nor.png"
            }
            alt="Send Button"
            width={24}
            height={24}
            onClick={inputState === "valid" ? handleSubmit : undefined}
          />
        </section>
        {inputState === "error" && (
          <p className="mt-1 font-roboto text-base leading-4 text-red-500">
            Error message
          </p>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";

InputField.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  border: PropTypes.string,
  initial_input: PropTypes.string,
};

export default InputField;
