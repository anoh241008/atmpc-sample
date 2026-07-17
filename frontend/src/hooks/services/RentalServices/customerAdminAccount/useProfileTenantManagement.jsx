import { getTenantDetailsLogged, updateTenantProfile } from "../../../../api/services/RentalServices/customerAdminAccount/TenantManagement";
import { validateToken } from "../../../../api/Authentication/authenticationManagement";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

const PHOTO_URL = import.meta.env.VITE_API_PHOTO_URL;

const useProfileTenantManagement = () => {

    const [formData, setFormData] = useState({});
    const [details, setDetails] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [profilepic, setProfilepic] = useState(null);

    const fetchDetailsTenant = useCallback(async () => {

        try {

            setLoading(true);

            const tokenRes = await validateToken();

            const customerID = tokenRes.data.userid;

            const res = await getTenantDetailsLogged(customerID);

            const data = res?.data?.data;

            setDetails(data || []);

            setFormData({

                profilephoto: data?.profilephoto || null,
                fullname: data?.fullname || "",
                gender: data?.gender || "",
                birthdate: data?.birthdate || "",
                phonenumber: data?.phonenumber || "",
                occupation: data?.occupation || "",
                email: data?.email || "",
                address: data?.address || "",
                contactname: data?.contactname || "",
                contactnumber: data?.contactnumber || "",
                relationshipcontact: data?.relationshipcontact || "",
                roomnumber: data?.roomnumber || "",

            });

            if (data?.profilephoto) {

                setProfilepic(`${PHOTO_URL}${data.profilephoto}`);

            }

        } catch (err) {

            console.error("Fetch tenant details error", err);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchDetailsTenant();

    }, [fetchDetailsTenant]);

    const handleProfileChange = (e) => {

    const { name, value, files } = e.target;

    if (files && files[0]) {

        setFormData((prev) => ({ ...prev, [name]: files[0] }));

        setProfilepic(URL.createObjectURL(files[0])); // instant preview

    } else {

        setFormData((prev) => ({ ...prev, [name]: value }));

    }

    setError((prev) => ({ ...prev, [name]: "" }));
    
};

    const handleUpdateProfile = useCallback(async (e) => {

        e.preventDefault();

        setLoading(true);

        setError({});

        try {
            const tokenRes = await validateToken();

            const customerID = tokenRes.data.userid;

            const profileFields = {

                fullname: (formData.fullname || "").trim(),
                gender: (formData.gender || "").trim(),
                birthdate: (formData.birthdate || "").trim(),
                phonenumber: (formData.phonenumber || "").trim(),
                occupation: (formData.occupation || "").trim(),
                email: (formData.email || "").trim(),
                address: (formData.address || "").trim(),
                contactname: (formData.contactname || "").trim(),
                contactnumber: (formData.contactnumber || "").trim(),
                relationshipcontact: (formData.relationshipcontact || "").trim(),

            };

            const data = new FormData();


            data.append(
                "data",
                new Blob([JSON.stringify(profileFields)], { type: "application/json" })
            );

            if (formData.profilephoto instanceof File) {

                data.append("file", formData.profilephoto);

            }

            const response = await updateTenantProfile(customerID, data);

            if (response) {

                await fetchDetailsTenant();

                Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: response.data.message,
                    confirmButtonColor: "#15803d", // green-700
                    timer: 2500,
                    timerProgressBar: true,
                });
            }

        } catch (err) {

            console.error("Update profile error", err);

            if (err.response?.data) {

                setError(err.response.data);

            } else {

                setError({ profilephoto: "Something went wrong. Please try again." });

            }

        } finally {

            setLoading(false);
        }

    }, [formData, fetchDetailsTenant]);

    return {
        formData,
        setFormData,
        details,
        error,
        setError,
        loading,
        fetchDetailsTenant,
        profilepic,
        handleProfileChange,
        handleUpdateProfile,
    };
};

export default useProfileTenantManagement;