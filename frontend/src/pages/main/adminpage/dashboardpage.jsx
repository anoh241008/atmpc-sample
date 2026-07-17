import React from "react";
import {
  Users,
  TrendingUp,
  Leaf,
  Wallet,
  FileText,
  PlusCircle,
  Megaphone,
  CheckCircle,
  Activity,
} from "lucide-react";

export default function Dashboardpage() {
  return (
    <div className="p-6 bg-[#f5f6f8] min-h-screen md:ml-64">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Real-time performance and cooperative impact metrics.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center bg-black gap-2 px-4 py-2 border rounded-lg  text-sm shadow-sm hover:bg-green-600">
            <FileText size={16} />
            Export Ledger
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm shadow hover:bg-green-200">
            <PlusCircle size={16} />
            New Initiative
          </button>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        {/* Members */}
        <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase">
              <Users size={14} />
              Total Members
            </div>
            <h2 className="text-2xl font-semibold mt-2 text-black">2,842</h2>
          </div>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp size={14} className="mr-1" />
            +12%
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase">
              <Leaf size={14} />
              Active Projects
            </div>
            <h2 className="text-2xl font-semibold mt-2 text-black">14</h2>
          </div>
          <span className="text-green-600 text-sm font-medium">Active</span>
        </div>

        {/* Capital */}
        <div className="rounded-xl p-6 text-white shadow-sm bg-gradient-to-r from-green-600 to-green-200 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-xs bg-white/20 px-2 py-1 rounded">
            IMPACT FUND
          </div>

          <div className="flex items-center gap-2 text-xs uppercase opacity-80">
            <Wallet size={14} />
            Total Capital Deployed
          </div>

          <h2 className="text-3xl font-semibold mt-3">
            PHP 0
          </h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* ACTIVITY */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between mb-5">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <Activity size={18} />
                Recent Activity Feed
              </h2>
              <button className="text-sm text-gray-400 hover:text-gray-600">
                View History
              </button>
            </div>

            <div className="space-y-6">
              {/* ITEM 1 */}
              <div className="flex gap-4">
                <div className="w-1 bg-green-500 rounded" />
                <div>
                  <p className="font-medium text-sm text-black">
                    Solar Farm Initiative added
                  </p>
                  <p className="text-gray-500 text-sm">
                    Infrastructure department launched Phase 2 expansion
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      ENERGY
                    </span>
                    <span className="text-gray-400">
                      By Michael Chen
                    </span>
                  </div>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="flex gap-4">
                <div className="w-1 bg-yellow-400 rounded" />
                <div>
                  <p className="font-medium text-sm text-black">
                    New member application: Jane Doe
                  </p>
                  <p className="text-gray-500 text-sm">
                    Pending review. Documentation verified.
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 text-xs rounded">
                      <CheckCircle size={14} />
                      Approve
                    </button>
                    <button className="bg-gray-300 px-3 py-1 text-xs rounded ">
                      Details
                    </button>
                  </div>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="flex gap-4">
                <div className="w-1 bg-gray-300 rounded" />
                <div>
                  <p className="font-medium text-sm text-black">
                    Quarterly Audit Report Published
                  </p>
                  <p className="text-gray-500 text-sm">
                    Transparency report now available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FUND */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-5 text-gray-800">
              Fund Allocation by Sector
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Agriculture", value: 45, color: "bg-yellow-500" },
                { label: "Renewables", value: 30, color: "bg-green-600" },
                { label: "Housing", value: 15, color: "bg-gray-500" },
                { label: "Tech", value: 10, color: "bg-blue-500" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="h-1 bg-gray-200 rounded mb-3">
                    <div
                      className={`${item.color} h-1 rounded`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 uppercase">
                    {item.label}
                  </p>
                  <p className="font-semibold text-black">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* QUICK ACTIONS */}
          <div className="bg-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold mb-4 text-gray-800">
              Quick Governance
            </h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer">
                <FileText size={40} color="brown" className="bg-gray-200 p-2 rounded-3xl" />
                <span className="text-sm text-black">Write News Post</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer">
                <PlusCircle size={40} color="green" className="bg-gray-200 p-2 rounded-3xl" />
                <span className="text-sm text-black">Add New Project</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-100 cursor-pointer">
                <Megaphone size={40} color="gray" className="bg-gray-200 p-2 rounded-3xl"/>
                <span className="text-sm text-black">Member Broadcast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}