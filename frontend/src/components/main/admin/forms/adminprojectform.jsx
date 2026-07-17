import { progress } from "framer-motion";
import InlineAlert from "../../../alert/inlineAlert";

export default function ProjectForm({
  formData = { projectname: "", type: "", budget : "", status: "", description: "", progress: "", projectphoto: "" },
  handleChange  = () => {},
  handleSubmit  = () => {},
  fileInputRef  = null,
  error         = {},
  loading       = false,
  mode =        "create",
  alert
 }) {

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <InlineAlert

         type={alert?.type}
    message={alert?.message}

      />
      <div>
        <label className="text-sm text-gray-500">Project Name</label>
        <input
          name="projectname"
          value={formData.projectname}
          onChange={handleChange}
          className="w-full bg-white mt-0.5 border border-gray-500 text-black rounded-md px-2 py-1 text-sm"
        />
        {error.projectname && <p className="text-red-500 text-sm mt-1">{error.projectname}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-500">Image File</label>
        <input
          ref={fileInputRef}
          type="file"
          name="projectphoto"
          accept="image/*"
          onChange={handleChange}
          className="w-full bg-white mt-0.5 border border-gray-500 text-black rounded-md px-2 py-1 text-sm"
        />
        {error.projectphoto && <p className="text-red-500 text-sm mt-1">{error.projectphoto}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2">

        <div>
          <label className="text-sm text-gray-500">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mt-0.5 bg-white text-black border border-gray-500 rounded-md px-2 py-1 text-sm"
          > 
            <option value="">Select Type</option>
            <option>Energy</option>
            <option>Agriculture</option>
            <option>Tech</option>
            <option>Construction</option>
          </select>
          {error.type && <p className="text-red-500 text-sm mt-1">{error.type}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-500">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-0.5 bg-white text-black border border-gray-500 rounded-md px-2 py-1 text-sm"
          >
             <option value="">Select Status</option>
            <option>Active</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          {error.status && <p className="text-red-500 text-sm mt-1">{error.status}</p>}
        </div>

      </div>

      <div>
        <label className="text-sm text-gray-500">Budget</label>
        <input
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full bg-white mt-0.5 border border-gray-500 text-black rounded-md px-2 py-1 text-sm"
        />
        {error.budget && <p className="text-red-500 text-sm mt-1">{error.budget}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-500">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className="w-full bg-white mt-0.5 border border-gray-500 text-black rounded-md px-2 py-1 text-sm"
        />
        {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Progress ({formData.progress}%)
        </label>

        <input
          type="range"
          name="progress"
          min="0"
          max="100"
          value={formData.progress}
          onChange={handleChange}
          className="w-full mt-1 border border-gray-500 accent-green-600"
        />

        <div className="w-full bg-gray-200 h-1 rounded-full mt-1">
          <div
            className="bg-green-600 h-1"
            style={{ width: `${formData.progress}%` }}
          />
        </div>
        {error.progress && <p className="text-red-500 text-sm mt-1">{error.progress}</p>}
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