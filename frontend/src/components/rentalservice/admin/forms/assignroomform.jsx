import InlineAlert from "../../../alert/inlineAlert";

export default function AssigningRoom({

    formData = {roomid: "", roomnumber: ""},
    handleChange = () => {},
    handleSubmit = () => {},
    roomlist = [],
    error = {},
    loading = false,
    mode = "Assigning Room",
    alert

}){
    return (

        <form onSubmit={handleSubmit} className="space-y-5">

            <InlineAlert
                type={alert?.type}
                message={alert?.message}
            />
            <div>
                <label className="block text-black font-semibold text-sm mb-1.5">Room List</label>
                <select
                    name="roomid"
                    value={formData.roomid}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white transition"
                >
                     <option value="">Select Room #</option>
                  {roomlist
                        .map(room => (
                           
                            <option key={room.roomid} value={room.roomid}>
                                {room.roomnumber}
                            </option>
                        ))
                    }
                </select>
                {error.roomid && <p className="text-red-500 text-xs mt-1.5">{error.roomid}</p>}
            </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 text-sm font-semibold text-white rounded-xl transition cursor-pointer shadow-sm ${
                        loading ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                    }`}
                >
                    {loading ? "Assigning..." : "Assign"}
                </button>
            </div>
        </form>

    )
}