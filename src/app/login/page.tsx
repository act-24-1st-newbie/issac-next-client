import Header from "@/components/Header/Header";
import InputField from "@/components/InputField/InputField.client";

const Login = () => {
  const handleLogin = (text: String) => {
    if (text.trim() !== '') {
      sessionStorage.setItem('username', text.trim());

    }
  };
  return (

    <>
      <Header />
      <div className="flex flex-col items-center h-[calc(100vh-2rem)] px-24">
        <p className="font-roboto text-2xl font-normal leading-10 text-left">
          Welcome Newbie!! MyTodo makes it easy to stay organized and manage
          your life.
        </p>
        <h1 className="font-roboto text-8xl font-bold leading-none text-left text-[#2c3e50]">
          What is your name?
        </h1>
        <InputField placeholder="Input your name" onSubmit={handleLogin} border="false" />
      </div>
    </>
  );
};
export default Login;
