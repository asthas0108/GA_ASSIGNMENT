// === src/pages/Login.js ===
import { useState } from "react";
import { useLoginMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password }).unwrap();
    dispatch(setCredentials(res));
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);
    navigate("/")
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="max-w-sm mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl space-y-6"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

  <input
    type="email"
    placeholder="Email"
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="password"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer"
  >
    Login
  </button>
</form>

  );
}
