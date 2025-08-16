import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { authAPI } from "../services/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#+^_=<>])[A-Za-z\\d@$!%*?&#+^_=<>]{8,}$"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\\d))|((?=.*[A-Z])(?=.*\\d)))(?=.{6,})"
    );

    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const isNameValid = form.name.trim().length >= 4;
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email);
  const isPasswordStrong = passwordStrength === "strong";

  const isFormValid = isNameValid && isEmailValid && isPasswordStrong;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    try {
      const res = await authAPI.register(form);
      if (res.data?.token) {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
      toast.error("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === "strong") return "text-green-600";
    if (passwordStrength === "medium") return "text-yellow-500";
    return "text-red-500";
  };

  const getStrengthLabel = () => {
    if (!form.password) return "";
    if (passwordStrength === "strong") return "Strong password";
    if (passwordStrength === "medium") return "Medium password... Please enter strong password";
    return "Weak password... Please enter strong password";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {!isNameValid && form.name && (
              <p className="mt-1 text-sm text-red-500">Name must be at least 4 characters</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {!isEmailValid && form.email && (
              <p className="mt-1 text-sm text-red-500">Please enter a valid Gmail address</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            {form.password && (
              <p className={`mt-1 text-sm font-medium ${getStrengthColor()}`}>{getStrengthLabel()}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`w-full ${
              isFormValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
            } text-white font-medium py-2 rounded-lg transition`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
