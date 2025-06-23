// === src/components/Dashboard.js ===
import { useGetStatsQuery } from "../features/apiSlice.js";

export default function Dashboard() {
  const { data, isLoading } = useGetStatsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    // <div>
    //   <h2>Analytics</h2>
    //   <p>Total Deals: {data.totalDeals}</p>
    //   <p>Total Users: {data.totalUsers}</p>
    //   <h3>Status Breakdown</h3>
    //   <ul>
    //     {Object.entries(data.statusBreakdown).map(([status, count]) => (
    //       <li key={status}>{status}: {count}</li>
    //     ))}
    //   </ul>
    // </div>

    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6">
  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">📊 Analytics</h2>

  <div className="space-y-2 text-gray-700">
    <p>
      <span className="font-medium">Total Deals:</span> {data.totalDeals}
    </p>
    <p>
      <span className="font-medium">Total Users:</span> {data.totalUsers}
    </p>
  </div>

  <div>
    <h3 className="text-xl font-semibold text-blue-600 mb-2">Status Breakdown</h3>
    <ul className="space-y-1 text-gray-700 list-disc list-inside">
      {Object.entries(data.statusBreakdown).map(([status, count]) => (
        <li key={status}>
          <span className="capitalize">{status}</span>: {count}
        </li>
      ))}
    </ul>
  </div>
</div>

  );
}