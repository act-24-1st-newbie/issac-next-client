"use client";
import { useRouter } from "next/navigation";
import InputField from "./InputField.client";

export const LoginInputField = () => {
  const router = useRouter();
  const handleLogin = (text: string) => {
    if (text.trim() !== "") {
      sessionStorage.setItem("username", text.trim());
      router.push("/home");
    }
  };
  return (
    <InputField
      placeholder="Input your name"
      border="false"
      onSubmit={handleLogin}
    />
  );
};
