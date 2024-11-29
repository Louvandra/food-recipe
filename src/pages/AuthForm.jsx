import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(""); // Reset error saat berpindah mode
    setFormData({ name: "", email: "", password: "" }); // Reset form data
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error sebelum memulai
    try {
      if (isLogin) {
        // Login dengan email dan password
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Login successful!");
      } else {
        // Registrasi akun baru
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Account created successfully!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login with Google successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-[1000px] h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sliding Panels */}
        <motion.div
          className={`absolute top-0 w-1/2 h-full ${
            isLogin
              ? "left-0 bg-gradient-to-tr from-green-400 to-teal-500"
              : "left-1/2 bg-gradient-to-tr from-blue-400 to-indigo-500"
          } text-white flex flex-col items-center justify-center`}
          animate={{
            left: isLogin ? "0%" : "50%",
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            duration: 0.8,
          }}
        >
          <h1 className="text-4xl font-bold">
            {isLogin ? "Welcome Back!" : "Hello, Friend!"}
          </h1>
          <p className="mt-4 text-center">
            {isLogin
              ? "To keep connected with us, please login with your personal info."
              : "Sign up and start your journey with us!"}
          </p>
          <motion.button
            onClick={toggleMode}
            className="mt-8 px-6 py-2 rounded-full bg-white text-teal-500 font-semibold hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </motion.button>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          className={`absolute top-0 w-1/2 h-full flex flex-col justify-center items-center px-12 ${
            isLogin ? "right-0" : "right-full"
          }`}
          animate={{
            right: isLogin ? "0%" : "100%",
          }}
          initial={{ x: "100%" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            duration: 0.8,
          }}
        >
          <h2 className="text-2xl font-bold text-teal-500">Sign In</h2>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6 w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <button className="w-full py-2 mt-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600">
              Sign In
            </button>
          </form>
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="mt-4 flex items-center justify-center w-full py-2 border rounded-lg bg-white hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          className={`absolute top-0 w-1/2 h-full flex flex-col justify-center items-center px-12 ${
            isLogin ? "left-full" : "left-0"
          }`}
          animate={{
            left: isLogin ? "100%" : "0%",
          }}
          initial={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            duration: 0.8,
          }}
        >
          <h2 className="text-2xl font-bold text-indigo-500">Sign Up</h2>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6 w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button className="w-full py-2 mt-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
              Sign up
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
