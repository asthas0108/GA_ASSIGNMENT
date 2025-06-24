import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetDealsQuery } from "../features/apiSlice";
import DealForm from "../components/DealForm";
import Chat from "../components/Chat";
import axios from "axios";
import { BASE_URL } from "../config";
import io from "socket.io-client";
// const socket = io("http://localhost:5000");  
const socket = io(`${BASE_URL}`);  


export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const { data: deals = [], refetch } = useGetDealsQuery();

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/deals/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
    } catch (err) {
      console.error("Error updating deal status:", err);
    }
  };
useEffect(() => {
  if (token) refetch();

  socket.on("dealUpdated", (updatedDeal) => {
    const isInvolved = updatedDeal.buyer._id === user.id || updatedDeal.seller._id === user.id;
    if (isInvolved) {
      refetch();
    }
  });

  socket.on("dealCreated", (newDeal) => {
    const isInvolved =
      newDeal.buyer._id === user.id || newDeal.seller._id === user.id;
    if (isInvolved) refetch();
  });

  return () => {
    socket.off("dealUpdated");
    socket.off("dealCreated");
  };
}, [token, refetch, user]);


  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Please login to view your dashboard.
      </div>
    );
  }

  const handlePayment = async (deal) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/payment/create-order`,
        { amount: deal.price, dealId: deal._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { orderId } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: deal.price * 100,
        currency: "INR",
        name: "Virtual Deal Room",
        description: `Payment for deal: ${deal.title}`,
        order_id: orderId,
        handler: async function (response) {
          alert("Payment successful ");
          await handleStatusChange(deal._id, "Paid");
          await refetch()
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome, {user.name}
      </h1>

      {user.role === "buyer" && <DealForm refetch={refetch}/>}

      <h2 className="text-2xl font-semibold mt-10 mb-4">Your Deals</h2>
      {deals.length === 0 ? (
        <p className="text-gray-600">No deals yet.</p>
      ) : (
        <div className="space-y-4">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white"
            >
              <h3 className="text-xl font-bold">{deal.title}</h3>
              <p className="text-gray-700">{deal.description}</p>
              <p className="mt-2">
                💰 <strong>${deal.price}</strong>
              </p>
              <p>
                Status: <span className="font-medium">{deal.status}</span>
              </p>

              {/* Seller Accept/Reject Buttons */}
              {user.role === "seller" && deal.status === "Pending" && (
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleStatusChange(deal._id, "In Progress")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(deal._id, "Cancelled")}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* Chat Section */}
              {deal.status === "In Progress" && (
                <Chat dealId={deal._id} user={user} />
              )}

              {/* Allow Payment by Seller */}
              {user.role === "seller" && deal.status === "In Progress" && (
                <button
                  onClick={() => handleStatusChange(deal._id, "Completed")}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
                >
                  Allow Payment
                </button>
              )}

              {/* Payment Section */}
              {user.role === "buyer" && deal.status === "Completed" && (
                <button
                  onClick={() => handlePayment(deal)}
                  className="bg-purple-600 text-white px-4 py-2 rounded mt-3 hover:bg-purple-700 cursor-pointer"
                >
                  Pay Now
                </button>
              )}

              {user.role === "buyer" && deal.status === "Paid" && (
                <p className="mt-3 text-green-600 font-semibold">Paid ✅</p>
              )}

              {user.role === "seller" && deal.status === "Paid" && (
                <p className="mt-3 text-green-700 font-semibold">Payment Received 🎉</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
