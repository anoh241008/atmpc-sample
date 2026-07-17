    import InlineAlert from "../../../alert/inlineAlert";

// ✅ No hook import — pure presentational component
export default function ContentForm({
    formData     = { title: "", type: "", description: "", contentphoto: null },
    handleChange = () => {},
    handleSubmit = () => {},
    fileInputRef = null,
    error        = {},
    loading      = false,
    mode         = "create",
    alert
}) {
    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <InlineAlert
              type={alert?.type}
            message={alert?.message}

            />
            <div>
                <label className="text-sm text-gray-500">Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Content title"
                    className="w-full bg-white mt-0.5 border border-gray-500 rounded-md px-2 py-1 text-sm text-black"
                />
                {error.title && <p className="text-red-500 text-sm mt-1">{error.title}</p>}
            </div>

            <div>
                <label className="text-sm text-gray-500">Image File</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="contentphoto"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full bg-white mt-0.5 border border-gray-500 rounded-md px-2 py-1 text-sm text-black"
                />
                {error?.contentphoto && <p className="text-red-500 text-sm mt-1">{error.contentphoto}</p>}
            </div>

            <div>
                <label className="text-sm text-gray-500">Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-white mt-0.5 border border-gray-500 rounded-md px-2 py-1 text-sm text-black"
                >
                    <option value="">Select Type</option>
                    <option>News</option>
                    <option>Event</option>
                    <option>Announcement</option>
                    <option>Update</option>
                </select>
                {error.type && <p className="text-red-500 text-sm mt-1">{error.type}</p>}
            </div>

            <div>
                <label className="text-sm text-gray-500">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Content description..."
                    className="w-full bg-white mt-0.5 border rounded-md px-2 py-1 text-sm text-black"
                />
                {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
            </div>
            
            <div className="flex justify-end gap-2 pt-1">
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-3 py-1 text-xs text-white rounded-md transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loading
                        ? mode === "create" ? "Saving..."   : "Updating..."
                        : mode === "create" ? "Save"        : "Update"}
                </button>
            </div>

        </form>
    );
}