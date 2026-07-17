import React, { useEffect, useState } from "react";
import useBillingPaymentManagement from "../../../../../hooks/services/RentalServices/BillingPayment/BillingPaymentManagement";
import { validateToken } from "../../../../../api/Authentication/authenticationManagement";
import Pagination from "../../../../../components/common/paginations";

const CustomerAdminAccountBillingSection = () => {

  const {
    billDetails,
    loading,
    pagination,
    fetchBillDetails
  } = useBillingPaymentManagement();

  const [expanded, setExpanded] = useState(null);

  const [branch, setBranch] = useState(null);

  const [branchLoading, setBranchLoading] = useState(true);

  const [notice, setNotice] = useState(false);

  const toggleDetails = (id) => setExpanded(expanded === id ? null : id);

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

  const paidCount = billDetails.filter(b => b.status === "PAID").length;

  const unpaidCount = billDetails.filter(b => b.status === "UNPAID").length;

  return (
    <div className="max-w-3xl mt-28 mx-auto px-3 mb-10">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Billing & Payments</h1>
        <p className="text-sm text-gray-400 mt-1">View and manage your monthly statements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-green-700 rounded-2xl p-4 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Paid</p>
          <p className="text-2xl font-extrabold mt-1">{paidCount}</p>
        </div>
        <div className="bg-red-500 rounded-2xl p-4 text-white">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Unpaid</p>
          <p className="text-2xl font-extrabold mt-1">{unpaidCount}</p>
        </div>
      </div>

      {/* Loading state */}
      {(loading || branchLoading) ? (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center text-gray-400">
          Loading...
        </div>
      ) : billDetails.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center text-gray-400">
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">🧾</span>
            <span className="text-sm font-medium">No payments found</span>
          </div>
        </div>
      ) : (
        <>
          {billDetails.map((bill) => {

            const amountNum = Number(String(bill.amount || 0).replace(/,/g, ""));

            const electricNum = isSharedBranch ? Number(String(bill.electricbill || 0).replace(/,/g, "")) : 0;

            const roomAmount = isSharedBranch ? amountNum - electricNum : 0;

            return (
            <div key={bill.paymentid} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 mb-4 hover:shadow-md transition duration-300">

              {/* Top row */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 tracking-widest uppercase font-semibold">Invoice</p>
                  <p className="text-base font-bold text-gray-800">MC-00{bill.paymentid}</p>
                  <p className="text-xs text-gray-400">
                    Month to pay: <span className="text-gray-600 font-medium">{bill.month_topay}</span>
                  </p>
                  {isSharedBranch && (
                    <p className="text-xs text-gray-400">
                      Room: <span className="text-gray-600 font-medium">{bill.roomnumber}</span>
                    </p>
                  )}
                  {bill.status === "PAID" && bill.date_created && (
                    <p className="text-xs text-gray-400">
                      Date Paid: <span className="text-gray-600 font-medium">{bill.date_created}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xl font-extrabold text-gray-800">
                    ₱{bill.amount}
                  </p>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      bill.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                {isSharedBranch ? (
                  <button
                    onClick={() => toggleDetails(bill.paymentid)}
                    className="flex items-center gap-1.5 text-green-700 hover:text-green-900 text-xs font-semibold transition duration-200"
                  >
                    <span>{expanded === bill.paymentid ? "▲" : "▼"}</span>
                    {expanded === bill.paymentid ? "Hide Details" : "View Details"}
                  </button>
                ) : (
                  <span />
                )}
                {bill.status !== "PAID" && (
                  <button
                    onClick={() => setNotice(true)}
                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-xs font-bold transition duration-300 shadow-sm"
                  >
                    Pay Now
                  </button>
                )}
              </div>

              {/* Breakdown - CDO_Branch only */}
              {isSharedBranch && expanded === bill.paymentid && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">Breakdown</p>
                  <div className="rounded-xl overflow-hidden border border-gray-100">
                    <div className="flex justify-between px-4 py-2.5 bg-gray-50">
                      <span className="text-gray-500 text-xs">Electric Bill</span>
                      <span className="font-semibold text-gray-700 text-xs">
                        ₱{electricNum.toLocaleString("en-PH")}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 py-2.5 bg-white">
                      <span className="text-gray-500 text-xs">Room Amount</span>
                      <span className="font-semibold text-gray-700 text-xs">
                        ₱{roomAmount.toLocaleString("en-PH")}
                      </span>
                    </div>
                    <div className="flex justify-between px-4 py-3 bg-green-700">
                      <span className="text-white font-bold text-xs">Total</span>
                      <span className="text-white font-extrabold text-sm">
                        ₱{bill.amount}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
          })}

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={pagination.currentPage + 1}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalElements}
              itemsPerPage={pagination.pageSize}
              onPageChange={(page) => {
                fetchBillDetails(page - 1, pagination.pageSize);
              }}
            />
          </div>
        </>
      )}

      {/* Online Payment Notice Modal */}
      {notice && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setNotice(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl mx-auto mb-4">
              🛠️
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Online Payment Coming Soon</h3>
            <p className="text-sm text-gray-500 mb-5">
              Our online payment feature is currently being finalized to ensure full compliance with the requirements of the Bureau of Internal Revenue (BIR). We appreciate your patience as we complete this process to provide you with a secure and compliant payment experience.
            </p>
            <button
              onClick={() => setNotice(false)}
              className="w-full bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition duration-300"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAdminAccountBillingSection;