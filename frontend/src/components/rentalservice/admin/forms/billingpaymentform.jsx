import InlineAlert from "../../../alert/inlineAlert";

export default function BillingPaymentForm({

    formData = {paymentid:"", electricbill:""},
    handleChange = () => {},
    handleSubmit = () => {},
    error = {},
    loading = false,
    mode = "Electric Billing",
    alert,
    isSharedBranch = true


}){

    return(

            <form onSubmit={handleSubmit} className="space-y-5">
            <InlineAlert
                type={alert?.type}
                message={alert?.message}
            />

            {isSharedBranch && (
                <div>
                    <label className="block text-black font-semibold text-sm mb-1.5">
                        Electric Bill
                    </label>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none select-none">
                            ₱
                        </span>
                        <input
                            type="text"
                            name="electricbill"
                            onChange={handleChange}
                            value={formData.electricbill}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                            placeholder="0.00"
                        />
                    </div>
                    {error.electricbill && (
                        <p className="text-red-500 text-xs mt-1.5">{error.electricbill}</p>
                    )}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition cursor-pointer shadow-sm ${
                        loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                    }`}
                >
                    {loading
                        ? "Updating..."
                        : isSharedBranch
                            ? "Update Bill/Payment"
                            : "Mark as Paid"}
                </button>
            </div>
        </form>


    )



}