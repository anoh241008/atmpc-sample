import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import useBillingPaymentManagement from "../../../../../hooks/services/RentalServices/BillingPayment/BillingPaymentManagement";
import useRoomManagement from "../../../../../hooks/services/RentalServices/branchAdmin/RoomManagement";
import { validateToken } from "../../../../../api/Authentication/authenticationManagement";

const Dashboard = () => {
  const { billDetails, loading: billLoading } = useBillingPaymentManagement();

  const {
    roomList,
    loading: roomLoading,
    fetchRoomList,
  } = useRoomManagement("Create Room", null);

  const [branch, setBranch] = useState(null);
  const [branchLoading, setBranchLoading] = useState(true);

  useEffect(() => {
    fetchRoomList(0, 100);
  }, [fetchRoomList]);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await validateToken();
        setBranch(res.data.branch);
      } catch (err) {
        console.log("Failed to validate token for branch:", err);
      } finally {
        setBranchLoading(false);
      }
    };
    fetchBranch();
  }, []);

  const isSharedBranch = branch === "CDO_Branch";

  // --- Billing Chart Data ---
  const monthlyMap = {};
  billDetails
    .filter(b => b.status === "PAID")
    .forEach(b => {
      const key = b.month_topay || "Unknown";
      const amt = Number(String(b.amount || 0).replace(/,/g, ""));
      monthlyMap[key] = (monthlyMap[key] || 0) + amt;
    });

  const chartData = Object.entries(monthlyMap).map(([month, income]) => ({
    month,
    income,
  }));

  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);

  // --- Paid / Unpaid Summary ---
  const paidCount = billDetails.filter(b => b.status === "PAID").length;
  const unpaidCount = billDetails.filter(b => b.status === "UNPAID").length;
  const unpaidAmount = billDetails
    .filter(b => b.status === "UNPAID")
    .reduce((sum, b) => sum + Number(String(b.amount || 0).replace(/,/g, "")), 0);

  // --- Unpaid Bills List ---
  const unpaidBills = billDetails.filter(b => b.status === "UNPAID");

  // --- Occupancy Data ---
  const totalRooms = roomList.length;
  const occupiedRooms = roomList.filter(r => r.status === "Occupied").length;
  const vacantRooms = totalRooms - occupiedRooms;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  const totalOccupants = roomList.reduce((sum, r) => sum + (r.occupants?.length || 0), 0);

  const pieData = [
    { name: "Occupied", value: occupiedRooms },
    { name: "Vacant", value: vacantRooms },
  ];
  const PIE_COLORS = ["#ef4444", "#00C49F"];

  // --- Recent Paid Bills (latest 5) ---
  const recentPaid = [...billDetails]
    .filter(b => b.status === "PAID")
    .slice(0, 5);

  const isLoading = billLoading || branchLoading;

  return (
    <div className="min-h-screen mx-auto font-oswald px-6 py-10 md:px-20 bg-white">
      <h1 className="text-3xl font-black text-black mb-2">📊 Rental Dashboard</h1>
      <p className="text-sm text-gray-400 mb-8">Overview of your rental property</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto mb-6">
        <div className="bg-green-700 rounded-2xl p-5 text-white shadow">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Total Income</p>
          <p className="text-2xl font-extrabold mt-1">
            {billLoading ? "..." : `₱${totalIncome.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`}
          </p>
          <p className="text-xs opacity-60 mt-1">From {paidCount} paid bill{paidCount !== 1 ? "s" : ""}</p>
        </div>

        <div className="bg-red-500 rounded-2xl p-5 text-white shadow">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Unpaid Bills</p>
          <p className="text-2xl font-extrabold mt-1">{unpaidCount}</p>
          <p className="text-xs opacity-60 mt-1">
            {billLoading ? "..." : `₱${unpaidAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })} outstanding`}
          </p>
        </div>

        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Occupancy Rate</p>
          <p className="text-2xl font-extrabold mt-1">{roomLoading ? "..." : `${occupancyRate}%`}</p>
          <p className="text-xs opacity-60 mt-1">{occupiedRooms} of {totalRooms} rooms occupied</p>
        </div>

        <div className="bg-yellow-500 rounded-2xl p-5 text-white shadow">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Total Occupants</p>
          <p className="text-2xl font-extrabold mt-1">{roomLoading ? "..." : totalOccupants}</p>
          <p className="text-xs opacity-60 mt-1">Across {totalRooms} room{totalRooms !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* Monthly Income Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border col-span-1 md:col-span-2 hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold mb-1 text-gray-700">💵 Monthly Income</h2>
          <p className="text-xs text-gray-400 mb-5">Based on paid bills grouped by month</p>
          {billLoading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No paid bills yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `₱${v.toLocaleString()}`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`₱${v.toLocaleString("en-PH")}`, "Income"]} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#00C49F" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Occupancy Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold mb-1 text-gray-700">🏘️ Room Occupancy</h2>
          <p className="text-xs text-gray-400 mb-4">Current status of all rooms</p>
          {roomLoading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : (
            <>
              <div className="flex justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="text-center -mt-2 mb-4">
                <p className="text-3xl font-extrabold text-gray-800">{occupancyRate}%</p>
                <p className="text-xs text-gray-400">Occupancy Rate</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-2">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-extrabold text-gray-800">{totalRooms}</p>
                  <p className="text-xs text-gray-400">Total</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-lg font-extrabold text-red-500">{occupiedRooms}</p>
                  <p className="text-xs text-gray-400">Occupied</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-lg font-extrabold text-green-600">{vacantRooms}</p>
                  <p className="text-xs text-gray-400">Vacant</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Occupants per Room */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold mb-1 text-gray-700">👥 Occupants per Room</h2>
          <p className="text-xs text-gray-400 mb-4">Total occupants: <span className="font-bold text-gray-600">{totalOccupants}</span></p>
          {roomLoading ? (
            <div className="text-center text-gray-400 py-10">Loading...</div>
          ) : roomList.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No rooms found</div>
          ) : (
            <div className="overflow-y-auto max-h-56 space-y-2 pr-1">
              {roomList.map((room) => (
                <div
                  key={room.roomid}
                  className="flex justify-between items-center px-3 py-2 rounded-xl bg-gray-50"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-700">Room {room.roomnumber}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {room.occupants?.length > 0 ? room.occupants.join(", ") : "No occupants"}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      room.status === "Occupied"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {room.occupants?.length || 0}/{room.capacity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unpaid Bills / Overdue Tracker */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border col-span-1 md:col-span-2 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-700">🚨 Unpaid Bills Tracker</h2>
            {unpaidCount > 0 && (
              <span className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full">
                {unpaidCount} overdue
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Total outstanding:{" "}
            <span className="font-bold text-red-500">
              ₱{unpaidAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </p>

          {isLoading ? (
            <div className="text-center text-gray-400 py-6">Loading...</div>
          ) : unpaidBills.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
              <span className="text-3xl">✅</span>
              <span className="text-sm font-medium">All bills are paid!</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-700">
                <thead>
                  <tr className="bg-red-50">
                    <th className="text-left px-4 py-2 rounded-l-xl">Invoice</th>
                    <th className="text-left px-4 py-2">Month Due</th>
                    <th className="text-left px-4 py-2">
                      {isSharedBranch ? "Room" : "Tenant"}
                    </th>
                    <th className="text-right px-4 py-2 rounded-r-xl">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidBills.map((bill) => (
                    <tr key={bill.paymentid} className="border-b border-gray-50 hover:bg-red-50 transition-colors">
                      <td className="px-4 py-2.5 font-semibold">MC-00{bill.paymentid}</td>
                      <td className="px-4 py-2.5">
                        <span className="bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                          {bill.month_topay || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-gray-500">
                        {isSharedBranch
                          ? (bill.roomnumber || "—")
                          : (bill.fullname || "—")}
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-red-500">
                        ₱{bill.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-red-50">
                    <td colSpan={3} className="px-4 py-2.5 font-bold text-gray-700 rounded-l-xl">Total Outstanding</td>
                    <td className="px-4 py-2.5 text-right font-extrabold text-red-600 rounded-r-xl">
                      ₱{unpaidAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Recent Paid Bills */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border col-span-1 md:col-span-2 hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold mb-1 text-gray-700">🧾 Recent Payments</h2>
          <p className="text-xs text-gray-400 mb-4">Latest 5 paid bills</p>
          {billLoading ? (
            <div className="text-center text-gray-400 py-6">Loading...</div>
          ) : recentPaid.length === 0 ? (
            <div className="text-center text-gray-400 py-6">No paid bills yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-700">
                <thead>
                  <tr className="bg-gray-100 rounded-xl">
                    <th className="text-left px-4 py-2 rounded-l-xl">Invoice</th>
                    <th className="text-left px-4 py-2">Month</th>
                    <th className="text-left px-4 py-2">Date Paid</th>
                    <th className="text-right px-4 py-2 rounded-r-xl">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPaid.map((bill) => (
                    <tr key={bill.paymentid} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-semibold">MC-00{bill.paymentid}</td>
                      <td className="px-4 py-2.5">{bill.month_topay}</td>
                      <td className="px-4 py-2.5 text-gray-400">{bill.date_created || "—"}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-green-700">₱{bill.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;