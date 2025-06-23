// === src/pages/Register.js ===
import { useState } from "react";
import { useRegisterMutation } from "../features/apiSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [register] = useRegisterMutation();

  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input name="name" placeholder="Name" onChange={handleChange} />
    //   <input name="email" type="email" placeholder="Email" onChange={handleChange} />
    //   <input name="password" type="password" placeholder="Password" onChange={handleChange} />
    //   <select name="role" onChange={handleChange}>
    //     <option value="buyer">Buyer</option>
    //     <option value="seller">Seller</option>
    //   </select>
    //   <button type="submit">Register</button>
    // </form>

    <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

  <input
    name="name"
    placeholder="Name"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    name="email"
    type="email"
    placeholder="Email"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    name="password"
    type="password"
    placeholder="Password"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    name="role"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="buyer">Buyer</option>
    <option value="seller">Seller</option>
  </select>

  <button
    type="submit"
    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
  >
    Register
  </button>
</form>

  );
}