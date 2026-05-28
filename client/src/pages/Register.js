import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        form
      );

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to right, #43cea2, #185a9d)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
          Personal Finance Tracker
        </h1>

        <h2 className="text-xl text-center mb-6 text-gray-700">
          Register
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="border p-3 w-full mb-4 rounded-lg outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-3 w-full mb-4 rounded-lg outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
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

        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg w-full transition">
          Register
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}