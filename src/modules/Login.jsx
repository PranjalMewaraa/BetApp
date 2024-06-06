import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const BASEURL = "https://kdm-money-server.onrender.com/api/v1";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault(e);
    if (formData.email !== "") {
      const toastId = toast.loading("Logging in...")
      try {
        const response = await axios.post(`${BASEURL}/auth/log-in`, formData)
        
        if(response.data.success){
          toast.success("Logged In");
          setToken(response.data.token)
          localStorage.setItem("User", JSON.stringify(response.data.user));
          console.log(localStorage.getItem("User"));
          if(response.data.accountType === "Admin"){
            navigate("/admin")
          }else{
            navigate("/");
          }
        }
      } catch (error) {
        toast.error("Error logging in");
        console.log("Login Error: ", error);
      }

      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 bg-white rounded-lg shadow-md text-center"
      >
        <h2 className="mb-4 text-xl text-black font-bold">Login</h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full h-10 mb-4 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full h-10 mb-4 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-colors"
          required
        />

        <button
          type="submit"
          className="w-full h-10 bg-blue-500 text-white rounded-lg cursor-pointer transition-colors hover:bg-blue-700"
        >
          Login
        </button>
        <Link to="/signup" className="text-black m-2 h-10">
          New User ? Click here to Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
