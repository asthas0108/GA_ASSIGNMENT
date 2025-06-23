// // === src/pages/Home.js ===
// import DealForm from "../components/DealForm";
// import Chat from "../components/Chat";
// import FileUpload from "../components/FileUpload";
// import Dashboard from "../components/Dashboard";
// import { useSelector } from "react-redux";
// import { useGetDealsQuery } from "../features/apiSlice.js";
// import { useState } from "react";

// export default function Home() {
//   const { user, token } = useSelector((state) => state.auth);
//   const { data: deals, isLoading } = useGetDealsQuery();
//   const [selectedDealId, setSelectedDealId] = useState(null);

//   if (isLoading) return <p>Loading deals...</p>;

//   return (
//     // <div>
//     //   <h1>Welcome {user?.name}</h1>
//     //   <h2>Create New Deal</h2>
//     //   <DealForm />

//     //   <h2>Existing Deals</h2>
//     //   <ul>
//     //     {deals?.map((deal) => (
//     //       <li key={deal._id}>
//     //         <button onClick={() => setSelectedDealId(deal._id)}>
//     //           {deal.title} - {deal.status}
//     //         </button>
//     //       </li>
//     //     ))}
//     //   </ul>

//     //   {selectedDealId && (
//     //     <>
//     //       <h2>Chat</h2>
//     //       <Chat dealId={selectedDealId} userId={user?._id} />

//     //       <h2>Upload Files</h2>
//     //       <FileUpload dealId={selectedDealId} token={token} />
//     //     </>
//     //   )}

//     //   {user?.role === "admin" && (
//     //     <>
//     //       <h2>Admin Dashboard</h2>
//     //       <Dashboard />
//     //     </>
//     //   )}
//     // </div>

//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-2xl shadow-lg space-y-8">
//   <h1 className="text-3xl font-bold text-gray-800">Welcome {user?.name}</h1>

//   <section>
//     <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create New Deal</h2>
//     <div className="bg-white p-5 rounded-xl shadow">
//       <DealForm />
//     </div>
//   </section>

//   <section>
//     <h2 className="text-2xl font-semibold text-blue-600 mb-4">Existing Deals</h2>
//     <ul className="space-y-3">
//       {deals?.map((deal) => (
//         <li key={deal._id}>
//           <button
//             onClick={() => setSelectedDealId(deal._id)}
//             className="w-full text-left px-4 py-3 bg-white hover:bg-blue-100 rounded-xl border border-gray-300 shadow-sm transition duration-200"
//           >
//             <span className="font-medium text-gray-800">{deal.title}</span> —{" "}
//             <span className="text-sm text-gray-600">{deal.status}</span>
//           </button>
//         </li>
//       ))}
//     </ul>
//   </section>

//   {selectedDealId && (
//     <section className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-semibold text-blue-600 mb-2">Chat</h2>
//         <div className="bg-white p-5 rounded-xl shadow">
//           <Chat dealId={selectedDealId} userId={user?._id} />
//         </div>
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold text-blue-600 mb-2">Upload Files</h2>
//         <div className="bg-white p-5 rounded-xl shadow">
//           <FileUpload dealId={selectedDealId} token={token} />
//         </div>
//       </div>
//     </section>
//   )}

//   {user?.role === "admin" && (
//     <section>
//       <h2 className="text-2xl font-semibold text-red-600 mb-2">Admin Dashboard</h2>
//       <div className="bg-white p-5 rounded-xl shadow">
//         <Dashboard />
//       </div>
//     </section>
//   )}
// </div>

//   );
// }


// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useGetDealsQuery, useCreateDealMutation } from "../features/apiSlice";
// import DealForm from "../components/DealForm";
// import axios from "axios";

// export default function Home() {
//   const { user } = useSelector((state) => state.auth);
//   const token = useSelector((state) => state.auth.token);
//   // const { data: deals = [], refetch } = useGetDealsQuery();
//   const { data: deals = [], refetch } = useGetDealsQuery(undefined, {
//     skip: !token, // ✅ don't fetch until token exists
//   });
//   const [updateStatus] = useCreateDealMutation();

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/deals/${id}/status`, { status }, {
//         headers: { Authorization: `Bearer ${token}` }, // ✅ use token directly
//       });
//       refetch();
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       refetch();
//     }
//   }, [token, refetch]);

//   if (!user) {
//     return <div className="text-center text-gray-500 mt-10">Please login to view your dashboard.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Welcome, {user.name}</h1>

//       {user.role === "buyer" && <DealForm />}

//       <h2 className="text-2xl font-semibold mt-10 mb-4">Your Deals</h2>
//       {deals.length === 0 ? (
//         <p className="text-gray-600">No deals yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {deals.map((deal) => (
//             <div
//               key={deal._id}
//               className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white"
//             >
//               <h3 className="text-xl font-bold">{deal.title}</h3>
//               <p className="text-gray-700">{deal.description}</p>
//               <p className="mt-2">💰 <strong>${deal.price}</strong></p>
//               <p>Status: <span className="font-medium">{deal.status}</span></p>
//               {user.role === "seller" && deal.status === "Pending" && (
//                 <div className="mt-4 space-x-2">
//                   <button
//                     onClick={() => handleStatusChange(deal._id, "In Progress")}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(deal._id, "Cancelled")}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useGetDealsQuery } from "../features/apiSlice";
// import DealForm from "../components/DealForm";
// import ChatBox from "../components/Chat";
// import axios from "axios";

// export default function Home() {
//   const { user, token } = useSelector((state) => state.auth);

//   const { data: deals = [], refetch } = useGetDealsQuery(undefined, {
//     skip: !token,
//   });

//   useEffect(() => {
//     if (token) refetch();
//   }, [token, refetch]);

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/deals/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       refetch();
//     } catch (error) {
//       console.error("Status update failed:", error);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="text-center text-gray-500 mt-10">
//         Please login to view your dashboard.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Welcome, {user.name}
//       </h1>

//       {user.role === "buyer" && <DealForm />}

//       <h2 className="text-2xl font-semibold mt-10 mb-4">Your Deals</h2>

//       {deals.length === 0 ? (
//         <p className="text-gray-600">No deals yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {deals.map((deal) => (
//             <div
//               key={deal._id}
//               className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white"
//             >
//               <h3 className="text-xl font-bold">{deal.title}</h3>
//               <p className="text-gray-700">{deal.description}</p>
//               <p className="mt-2">
//                 💰 <strong>${deal.price}</strong>
//               </p>
//               <p>
//                 Status:{" "}
//                 <span
//                   className={`font-semibold ${
//                     deal.status === "Completed"
//                       ? "text-green-600"
//                       : deal.status === "Cancelled"
//                       ? "text-red-600"
//                       : "text-yellow-700"
//                   }`}
//                 >
//                   {deal.status}
//                 </span>
//               </p>

//               {/* === Seller Controls === */}
//               {user.role === "seller" && deal.status === "Pending" && (
//                 <div className="mt-4 space-x-2">
//                   <button
//                     onClick={() => handleStatusChange(deal._id, "In Progress")}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(deal._id, "Cancelled")}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}

//               {/* === Buyer Controls for In Progress === */}
//               {user.role === "buyer" && deal.status === "In Progress" && (
//                 <div className="mt-4 space-x-2">
//                   <button
//                     onClick={() =>
//                       handleStatusChange(deal._id, "Completed")
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Mark as Completed
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(deal._id, "Cancelled")}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Cancel Deal
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {deals.status === "In Progress" && (
//         <ChatBox dealId={deals._id} user={user} />
//       )}
//     </div>
//   );
// }



import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetDealsQuery } from "../features/apiSlice";
import DealForm from "../components/DealForm";
import Chat from "../components/Chat";
import axios from "axios";

export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const { data: deals = [], refetch } = useGetDealsQuery();

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/deals/${id}/status`,
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
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Please login to view your dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome, {user.name}
      </h1>

      {user.role === "buyer" && <DealForm />}

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

              {user.role === "seller" && deal.status === "Pending" && (
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(deal._id, "In Progress")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(deal._id, "Cancelled")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}

              {deal.status === "In Progress" && (
                <Chat dealId={deal._id} user={user} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
