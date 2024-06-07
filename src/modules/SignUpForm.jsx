import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function SignUpForm() {
  const navigate = useNavigate();

  const BASEURL = "https://kdm-money-server.onrender.com/api/v1";
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.userName === "" || formData.email === "") {
      toast.error("All Fields Are Required");
    } else {
      if (formData.password.length < 8) {
        toast.error("Your password must be at least 8 characters long.");
      } else if (formData.password !== formData.confirmPassword) {
        toast.error("Password do not match");
      } else {
        const userData = {
          userName: formData.userName,
          email: formData.email,
          phoneNo: formData.phoneNo,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        };
        // Show loading toast
        const loadingToastId = toast.loading("Signing up...");
        try {
          const response = await axios.post(
            `${BASEURL}/auth/sign-up`,
            userData
          );

          if (!response.data.success) {
            // Update loading toast to error toast
            toast.error(response.data.message);
          } else {
            localStorage.setItem("User", JSON.stringify(response.data.user));
            // Update loading toast to success toast
            toast.success("Sign Up Successful");
            navigate("/");
          }
        } catch (error) {
          // Update loading toast to error toast in case of exception
          toast.error("An error occurred during signup. Please try again.");
          console.error("Signup error:", error);
        }
        toast.dismiss(loadingToastId);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 bg-white rounded-lg shadow-md text-center"
      >
        <h2 className="mb-4 text-xl text-black font-bold">Sign Up</h2>
        <input
          type="text"
          name="userName"
          placeholder="Full Name"
          value={formData.userName}
          onChange={handleChange}
          className="w-full h-10 mb-4 px-4 border border-gray-300 rounded-lg outline-none text-black focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full h-10 mb-4 px-4 border border-gray-300 text-black rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="number"
          name="phoneNo"
          placeholder="Phone number"
          value={formData.phoneNo}
          onChange={handleChange}
          className="w-full h-10 mb-4 px-4 border border-gray-300 text-black rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full h-10 mb-4 px-4 border border-gray-300 text-black rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full h-10 mb-4 px-4 border border-gray-300 text-black rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />

        <button
          type="submit"
          className="w-full h-10 bg-blue-500 text-white rounded-lg cursor-pointer transition-colors hover:bg-blue-700"
        >
          Sign Up
        </button>
        <Link to="/" className="text-black mt-5 h-10">
          Already Have An Account? Log In
        </Link>
      </form>
    </div>
  );
}

export default SignUpForm;
