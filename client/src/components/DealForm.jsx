// === src/components/DealForm.js ===
import { useEffect, useState } from "react";
import { useCreateDealMutation } from "../features/apiSlice.js";
import axios from "axios";

export default function DealForm() {
  const [form, setForm] = useState({ title: "", description: "", price: "", seller: "" });
  const [createDeal] = useCreateDealMutation();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchSellers = async () => {
      const res = await axios.get("http://localhost:5000/api/users/sellers");
      setSellers(res.data);
    };
    fetchSellers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDeal(form);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input name="title" placeholder="Title" onChange={handleChange} />
    //   <textarea name="description" placeholder="Description" onChange={handleChange} />
    //   <input name="price" placeholder="Price" type="number" onChange={handleChange} />
    //   <input name="seller" placeholder="Seller ID" onChange={handleChange} />
    //   <button type="submit">Create Deal</button>
    // </form>
    <form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Create New Deal</h2>

  <input
    name="title"
    placeholder="Title"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <textarea
    name="description"
    placeholder="Description"
    rows={4}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  />

  <input
    name="price"
    type="number"
    placeholder="Price"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* <input
    name="seller"
    placeholder="Seller ID"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  /> */}

  <select
    name="seller"
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select a Seller</option>
    {sellers.map((s) => (
      <option key={s._id} value={s._id}>{s.name}</option>
    ))}
  </select>

  <button
    type="submit"
    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
  >
    Create Deal
  </button>
</form>

  );
}