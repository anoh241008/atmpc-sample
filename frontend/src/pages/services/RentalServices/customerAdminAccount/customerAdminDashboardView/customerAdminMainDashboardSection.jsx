import React from "react";
import useProfileTenantManagement from "../../../../../hooks/services/RentalServices/customerAdminAccount/useProfileTenantManagement";
import useBillingPaymentManagement from "../../../../../hooks/services/RentalServices/BillingPayment/BillingPaymentManagement";


const CustomerAdminMainDashboardSection = () => {
  const {formData} = useProfileTenantManagement();

  const { billDetails } = useBillingPaymentManagement();

  const unpaidTransactions = billDetails.filter((bill) => bill.status === "UNPAID");

  const hasUnpaid = unpaidTransactions.length > 0;

  return (
    <div className="relative mt-28 flex flex-col gap-6 max-w-3xl mx-auto px-2 sm:px-4 font-oswald mb-10">

      {/* Welcome Card */}
      <div className="bg-white shadow-md rounded-md p-5">
        <h1 className="sm:text-2xl md:text-3xl text-2xl text-gray-600 font-black p-5 w-auto">
          Hello, <span className="text-black">{formData.fullname}</span>
          <br />
          <span className="text-xl">Welcome to your Account Profile</span>
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
          <p className="text-xs text-gray-400 tracking-widest uppercase font-semibold">Unpaid</p>
          <p className={`text-2xl font-extrabold ${hasUnpaid ? "text-red-500" : "text-green-600"}`}>
            {unpaidTransactions.length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
          <p className="text-xs text-gray-400 tracking-widest uppercase font-semibold">Total Due</p>
          <p className="text-2xl font-extrabold text-gray-800">
            {hasUnpaid
              ? `₱${unpaidTransactions.reduce((sum, tx) => sum + Number(String(tx.amount || 0).replace(/,/g, "")), 0).toLocaleString("en-PH")}`
              : "—"}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
          <p className="text-xs text-gray-400 tracking-widest uppercase font-semibold">Status</p>
          <p className={`text-sm font-extrabold mt-1 ${hasUnpaid ? "text-red-500" : "text-green-600"}`}>
            {hasUnpaid ? "Action Needed" : "No Action Needed"}
          </p>
        </div>
      </div>

      {/* Payment Notifications */}
      {hasUnpaid && unpaidTransactions.map((tx) => (
        <div
          key={tx.paymentid}
          className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-red-500"
        >
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Payment Notification
          </h2>
          <p className="text-gray-800">
            Our records indicate that your rent for the month of <strong>{tx.month_topay}</strong> has not yet been paid with an amount of <strong>₱{Number(String(tx.amount || 0).replace(/,/g, "")).toLocaleString('en-PH')}</strong>. Please settle the outstanding rent at your earliest convenience to avoid any inconvenience.
          </p>
        </div>
      ))}

    </div>
  );
};

export default CustomerAdminMainDashboardSection;