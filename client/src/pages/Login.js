import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"

 style={{
  background: "linear-gradient(135deg, #a18cd1, #fbc2eb)"
}}


    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Personal Finance Tracker
        </h1>

        <h2 className="text-xl text-center mb-6 text-gray-700">
          Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-3 w-full mb-4 rounded-lg outline-none"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="border p-3 w-full mb-4 rounded-lg outline-none"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-4 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg w-full transition">
          Login
        </button>

        <p className="mt-5 text-center text-gray-600">
          No account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}