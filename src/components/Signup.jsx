import React, { useState } from "react";
import Alert from "./Alert";

function Signup({ goToLogin, onLogin }) {
  const [fullName, setFullName] = useState("");
  const [course, setCourse] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [ showAlert, setShowAlert ] = useState(false);
  const [alertType, setAlertType] = useState("success");


  const showAlertBox = (msg, type = "success", duration = 3000) => {
    setAlertMessage(msg);
    setAlertType(type);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), duration);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName) {
      showAlertBox("Please enter your full name.", "error");
      return;
    } else if (!course) {
      showAlertBox("Please enter your course of study.", "error");
      return;
    } else if (!matricNumber) {
      showAlertBox("Please enter your matric number.", "error");
      return;
    } else if (password.length < 6) {
      showAlertBox(
        "Create a stronger password (minimum 6 characters).",
        "error"
      );
      return;
    }

    const user = { fullName, course, matricNumber, password };
    localStorage.setItem("demoUser", JSON.stringify(user));

    showAlertBox("Your account has been created successfully.", "success");
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-xl overflow-hidden bg-white">
        <Alert message={alertMessage} type={alertType} show={showAlert} />
        {/* Left Side */}
        <div className="md:w-1/2 bg-purple-700 flex flex-col items-center justify-center p-8 text-center text-white rounded-b-[100px] md:rounded-l-none md:rounded-r-[100px]">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-3 mb-4">Already have an account?</p>

          <button
            onClick={goToLogin}
            className="border-2 border-white rounded-md px-6 py-2 cursor-pointer font-bold hover:bg-white hover:text-purple-700 transition"
          >
            Login
          </button>
        </div>

        {/* Signup Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl text-purple-700 font-semibold mb-6 text-center">
            Signup
          </h2>

          <form
            onSubmit={handleSignup}
            className="space-y-5 w-full max-w-md mx-auto"
          >
            {/* Full Name */}
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-purple-600">
              <i className="fa-solid fa-user text-gray-500 mr-3"></i>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full outline-none italic bg-transparent"
              />
            </div>

            {/* Course of study */}
            <div className="flex items-center bg-gray-200 rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-purple-600">
              <i className="fa-solid fa-book text-gray-500 mr-3"></i>
              <input
                type="text"
                placeholder="Course of Study"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full outline-none italic bg-transparent"
              />
            </div>

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

            {/* Create Account Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
