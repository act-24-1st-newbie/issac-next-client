import Header from "@/components/Header/Header";
import { LoginInputField } from "@/components/InputField/LoginInputField.client";

const Login = () => {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-2rem)] flex-col items-center bg-white px-24">
        <p className="text-left font-roboto text-2xl font-normal leading-10">
          Welcome Newbie!! MyTodo makes it easy to stay organized and manage
          your life.
        </p>
        <h1 className="text-left font-roboto text-6xl font-bold leading-none text-[#2c3e50]">
          What is your name?
        </h1>
        <LoginInputField />
      </div>
    </>
  );
};
export default Login;
