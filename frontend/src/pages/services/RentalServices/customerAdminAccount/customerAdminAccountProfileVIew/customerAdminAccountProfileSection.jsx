import useProfileTenantManagement from "../../../../../hooks/services/RentalServices/customerAdminAccount/useProfileTenantManagement";

const CustomerAdminAccountProfileSection = () => {

  const {
    formData,
    setFormData,
    details,
    error,
    setError,
    loading,
    handleProfileChange,
    handleUpdateProfile,
    fetchDetailsTenant,
    profilepic,
  } = useProfileTenantManagement();


  return (
    <div className="relative mt-28 flex flex-col gap-6 max-w-3xl mx-auto px-2 sm:px-4 font-oswald mb-10">
      <div className="grid grid-cols-1 gap-6">
        <form onSubmit={handleUpdateProfile} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-base font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
            🧍 Personal Information
          </h2>

          {/* Profile pic */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-28 h-28">
              <img
                src={profilepic || "https://placehold.co/150x150"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-1 right-1 bg-green-700 text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-green-800 transition duration-200"
                title="Change profile photo"
              >
                &#9998;
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                name="profilephoto"
                className="hidden"
                onChange={handleProfileChange}
              />
            </div>
          </div>

          {/* Full name */}
          <div className="mb-4">
            <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Full Name</label>
            <input
              name="fullname"
              className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 
              w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
               transition duration-200 text-sm"
              value={formData.fullname || ""}
              onChange={handleProfileChange}
            />
               {error.fullname && (
              <p className="text-red-500 text-xs mt-1.5">{error.fullname}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Gender</label>
              <select
                name="gender"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                value={formData.gender || ""}
                onChange={handleProfileChange}
              >
                <option value="" hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
                 {error.gender && (
              <p className="text-red-500 text-xs mt-1.5">{error.gender}</p>
            )}
            </div>

            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Birthdate</label>
              <input
                name="birthdate"
                type="date"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                value={formData.birthdate || ""}
                onChange={handleProfileChange}
              />
                 {error.birthdate && (
              <p className="text-red-500 text-xs mt-1.5">{error.birthdate}</p>
            )}
            </div>

            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Phone Number</label>
              <input
                name="phonenumber"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                value={formData.phonenumber || ""}
                onChange={handleProfileChange}
              />
                 {error.phonenumber && (
              <p className="text-red-500 text-xs mt-1.5">{error.phonenumber}</p>
            )}
            </div>

            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Occupation</label>
              <input
                name="occupation"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                value={formData.occupation || ""}
                onChange={handleProfileChange}
                
              />
                 {error.occupation && (
              <p className="text-red-500 text-xs mt-1.5">{error.occupation}</p>
            )}
            </div>

            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Email</label>
              <input
                name="email"
                type="email"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                value={formData.email || ""}
                onChange={handleProfileChange}
              />
                 {error.email && (
              <p className="text-red-500 text-xs mt-1.5">{error.email}</p>
            )}
            </div>

            <div>
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Room #</label>
              <p className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">{formData.roomnumber}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Address</label>
              <textarea
                name="address"
                className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm h-24 resize-none"
                value={formData.address || ""}
                onChange={handleProfileChange}
              />
                 {error.address && (
              <p className="text-red-500 text-xs mt-1.5">{error.address}</p>
            )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
              🚨 Emergency Contact
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Contact Name</label>
                <input
                  name="contactname"
                  className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                  value={formData.contactname || ""}
                  onChange={handleProfileChange}
                />
                   {error.contactname && (
              <p className="text-red-500 text-xs mt-1.5">{error.contactname}</p>
            )}
              </div>

              <div>
                <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Contact Number</label>
                <input
                  name="contactnumber"
                  className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                  value={formData.contactnumber || ""}
                  onChange={handleProfileChange}
                />
                   {error.contactnumber && (
              <p className="text-red-500 text-xs mt-1.5">{error.contactnumber}</p>
            )}
              </div>

              <div>
                <label className="text-gray-500 font-semibold text-xs tracking-widest uppercase mb-1.5 block">Relationship</label>
                <select
                  name="relationshipcontact"
                  className="bg-gray-50 text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5
                 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent 
                 transition duration-200 text-sm"
                  value={formData.relationshipcontact || ""}
                  onChange={handleProfileChange}
                >
                  <option value="" hidden>Select Relationship</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                </select>
                   {error.relationshipcontact && (
              <p className="text-red-500 text-xs mt-1.5">{error.relationshipcontact}</p>
            )}
              </div>
            </div>
          </div>

                  {error?.profileFile && (
            <p className="text-red-500 text-sm mt-4 text-right">{error.profileFile}</p>
          )}

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-green-800 transition duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "💾 Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerAdminAccountProfileSection;