import React, { useState } from "react";
import Alert from "./Alert";

function Login({ goToSignup, onLogin }) {
  const [matricNumber, setMatricNumber] = useState("");
  const [ password, setPassword ] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
  const [ showAlert, setShowAlert ] = useState(false);
  const [alertType, setAlertType] = useState("success");


    const showAlertBox = (msg, type = "success", duration = 3000) => {
      setAlertMessage(msg);
      setAlertType(type);
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), duration);
  };
  
const handleLogin = (e) => {
  e.preventDefault();
  const savedUser = JSON.parse(localStorage.getItem("demoUser"));

  if (
    savedUser &&
    savedUser.matricNumber === matricNumber &&
    savedUser.password === password
  ) {
    showAlertBox(`Welcome back, ${savedUser.fullName}!`, "success");

    setTimeout(() => {
      onLogin();
    }, 1500); 
  } else {
    showAlertBox("Incorrect Matric Number or Password!", "error");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-xl overflow-hidden bg-white">
        <Alert message={alertMessage} type={alertType} show={showAlert} />
        {/* Left Panel */}
        <div className="md:w-1/2 bg-purple-700 flex flex-col items-center justify-center p-8 text-center text-white rounded-b-[100px] md:rounded-l-none md:rounded-r-[100px]">
          <h2 className="text-3xl font-bold">Hello, Welcome!</h2>
          <p className="mt-3 mb-4">Don't have an account?</p>

          <button
            onClick={goToSignup}
            className="border-2 border-white rounded-md px-6 py-2 font-bold hover:bg-white hover:text-purple-700 transition cursor-pointer"
          >
            Register
          </button>
        </div>

        {/* Right Panel - Login Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl text-purple-700 font-semibold mb-6 text-center">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-5 w-full max-w-md mx-auto"
          >
            {/* Matric Number */}
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-purple-600">
              <i className="fa-solid fa-id-card text-gray-500 mr-3"></i>
              <input
                type="text"
                placeholder="Matric Number"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                className="w-full outline-none italic bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-purple-600">
              <i className="fa-solid fa-lock text-gray-500 mr-3"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none italic bg-transparent"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
