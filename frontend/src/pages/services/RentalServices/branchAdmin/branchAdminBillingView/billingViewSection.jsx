import React, { useEffect, useState } from 'react';
import Pagination from '../../../../../components/common/paginations';
import useBillingPaymentManagement from '../../../../../hooks/services/RentalServices/BillingPayment/BillingPaymentManagement';
import { validateToken } from '../../../../../api/Authentication/authenticationManagement';
import BillingPaymentForm from '../../../../../components/rentalservice/admin/forms/billingpaymentform';
import BillingPaymentModal from '../../../../../features/rentalservice/admin/billingpaymentmodal';

const BillingView = () => {
   const [openModal, setOpenModal] = useState({

    open:false,

    mode:"Billing payment",

    data: null

  })
  const {

     handleChange,
        handleElectricBilling,
        error,
        formData,
        alert,
    billDetails,
    loading,
    pagination,
    fetchBillDetails
  } = useBillingPaymentManagement(openModal.mode, openModal.data);
 

  const [branch, setBranch] = useState(null);

  const [branchLoading, setBranchLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseModal = () => {

    setOpenModal({open: false, mode:"Billing payment", data: null})

  }

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

  const showFullname = !isSharedBranch;

  const showRoomAndElectric = isSharedBranch;

  const showSearchByName = !isSharedBranch;


  const filteredBillDetails = billDetails.filter(bill =>

    showSearchByName && searchTerm

      ? bill.fullname?.toLowerCase().includes(searchTerm.toLowerCase())

      : true

  );

  const totalColumns = 8 - (showFullname ? 0 : 1) - (showRoomAndElectric ? 0 : 2);

  return (
    <div className="min-h-screen font-oswald px-4 sm:px-6 md:px-20 bg-gray-50 py-6 md:py-10">
      <div className="mx-auto max-w-5xl">

        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
            Rent Payments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage all tenant rent payment records.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 p-3 rounded-xl text-lg">
                💳
              </div>
              <div>
                <h2 className="text-base font-bold text-black">
                  Payment Records
                </h2>
                <p className="text-xs text-gray-400">
                  All recorded transactions
                </p>
              </div>
            </div>

            {showSearchByName && (
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 pl-4 pr-4 py-2.5 border border-gray-200 bg-gray-50 text-black text-sm rounded-xl focus:outline-none focus:border-green-400 focus:bg-white transition"
                />
              </div>
            )}
          </div>

          {/* Desktop / tablet table view */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-black">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 text-left">Month</th>
                  {showRoomAndElectric && <th className="p-4 text-left">Room #</th>}
                  {showFullname && <th className="p-4 text-left">Name</th>}
                  {showRoomAndElectric && <th className="p-4 text-left">Electric Bill</th>}
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date Transaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(loading || branchLoading) ? (
                  <tr>
                    <td colSpan={totalColumns} className="p-10 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : filteredBillDetails.length === 0 ? (
                  <tr>
                    <td colSpan={totalColumns} className="p-10 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">🧾</span>
                        <span className="text-sm font-medium">
                          {searchTerm ? 'No payments match your search' : 'No payments found'}
                        </span>
                        <span className="text-xs text-gray-300">
                          {searchTerm ? 'Try a different name' : 'Try adjusting your search or filters'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBillDetails.map((bill) => (
                    <tr 
                    
                    onClick={() =>{ setOpenModal({open:true,mode:"Electric Billing", data:bill})}}
                    key={bill.paymentid} className="hover:bg-gray-50 transition">
                      <td className="p-4">{bill.month_topay}</td>
                      {showRoomAndElectric && <td className="p-4">{bill.roomnumber}</td>}
                      {showFullname && <td className="p-4 font-semibold">{bill.fullname}</td>}
                      {showRoomAndElectric && <td className="p-4">{bill.electricbill}</td>}
                      <td className="p-4">₱{bill.amount}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          bill.status === 'PAID'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{bill.date_created}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden space-y-3">
            {(loading || branchLoading) ? (
              <div className="rounded-xl border border-gray-100 p-8 text-center text-gray-400">
                Loading...
              </div>
            ) : filteredBillDetails.length === 0 ? (
              <div className="rounded-xl border border-gray-100 p-8 text-center text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">🧾</span>
                  <span className="text-sm font-medium">
                    {searchTerm ? 'No payments match your search' : 'No payments found'}
                  </span>
                  <span className="text-xs text-gray-300">
                    {searchTerm ? 'Try a different name' : 'Try adjusting your search or filters'}
                  </span>
                </div>
              </div>
            ) : (
              filteredBillDetails.map((bill) => (
                <div key={bill.paymentid} className="rounded-xl border border-gray-100 p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      {showFullname && <p className="font-semibold text-black">{bill.fullname}</p>}
                      {showRoomAndElectric && <p className="text-xs text-gray-400">Room {bill.roomnumber}</p>}
                      <p className="text-xs text-gray-400">{bill.month_topay}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      bill.status === 'PAID'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {bill.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-gray-100">
                    {showRoomAndElectric && (
                      <div>
                        <p className="text-xs text-gray-400">Electric Bill</p>
                        <p className="font-medium">{bill.electricbill}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="font-medium">₱{bill.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Date</p>
                      <p className="font-medium">{bill.date_created}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={pagination.currentPage + 1}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalElements}
              itemsPerPage={pagination.pageSize}
              onPageChange={(page) => {
                fetchBillDeatils(page - 1, pagination.pageSize);
              }}
            />
          </div>

        </div>
      </div>

              <BillingPaymentModal
              
                isOpen={openModal.open}
                onClose={handleCloseModal}

                title={"Billing payment"}
              >

                {openModal.open && formData && (

                 <BillingPaymentForm
                    key={openModal.open}
                    mode={openModal.mode}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleElectricBilling}
                    error={error}
                    loading={loading}
                    alert={alert}
                    isSharedBranch={isSharedBranch}
                />
                 

                )}


                
              </BillingPaymentModal>

    </div>
  );
};

export default BillingView;
