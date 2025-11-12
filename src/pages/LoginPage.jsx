import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Attempt login with email and password
    const result = login(formData.email, formData.password);

    if (!result.success) {
      setLoginError(result.error);
      return;
    }

    // Login successful, navigate to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-orange-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold font-['Bungee'] bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2"
            >
              Welcome Back
            </motion.h1>
            <p className="text-gray-600 font-['Poppins']">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Error Alert */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-['Poppins'] text-sm"
              >
                <p className="font-semibold">⚠️ {loginError}</p>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2 font-['Poppins']"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-orange-200"
                } focus:outline-none focus:ring-4 transition font-['Poppins']`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-['Poppins']">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2 font-['Poppins']"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-orange-200"
                } focus:outline-none focus:ring-4 transition font-['Poppins']`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 font-['Poppins']">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#FF9D23] hover:bg-[#C14600] text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-300/40 transition font-['Poppins']"
            >
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-['Poppins'] text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#FF9D23] hover:text-[#C14600] font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 text-sm font-['Poppins']"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
