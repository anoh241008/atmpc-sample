import { PresenceProvider } from '@ark-ui/react';
import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {loginAdmin, logoutAdmin, validateToken } from '../../api/Authentication/authenticationManagement';
import Swal from 'sweetalert2';
import { LeafyGreen } from 'lucide-react';

const LOGGING_INITIAL_FORM = {
    email:"",
    password:"",
}

const AuthenticationManagement = () => {

    const navigate = useNavigate();

    const [alert, setAlert] = useState({

        type:"",

        message:"",

    })

    const [logginForm, setLogginForm] = useState(LOGGING_INITIAL_FORM)

    const [message, setMessage] = useState([]);

    const [error, setError] = useState({});

    const [loading, setLoading] = useState(false);

    const [captchatoken, setCaptchatoken]  = useState("");

    const [captchakey, setCaptchakey] = useState(0);

    const [logoutLoading, setLogoutLoading] = useState(false); // ← add

    const turnstileRef = useRef();

    const showAlert = (type, message) => {

        setAlert({ type, message});

        setTimeout(() => {

            setAlert({ type: "", message: ""});

        } , 3000);

    }


  
    //ALL ADMIN PORTAL
    const handleLogginChange = (e) => {

        const {name, value} = e.target;

           setLogginForm((prevData) => ({

            ...prevData,

            [name] : value

        }));

        setError((prev) => ({

            ...prev,

            [name]: ""

        }));

    }
    
    //ALL ADMIN PORTAL
    const handleLoggingIn = async (e) =>{

        e.preventDefault();

        setLoading(true);

        setError({});

        try{
   
            if(!captchatoken){

                 setError({ general: "Complete captcha first" });

                setLoading(false);
                
                return;

            }

            
            const payload = {

                ...logginForm,

                captchatoken: captchatoken

            };
             const response = await loginAdmin(payload);

            if(response){
                    const res = await validateToken();

                    const role = res.data.role;

                    showAlert("success", response.data.message);

                    setLogginForm(LOGGING_INITIAL_FORM);

                    setCaptchatoken("");
                    
                    setCaptchakey((prev) => prev + 1);

                    
 

                    if (role === "MAIN_ADMIN") { // Adjust role name based on your backend response

                        navigate("/admin/dashboard-overview", { replace: true });

                    } 
                    else if (role === "RENTAL_ADMIN") {

                        navigate("/services/RentalServices/branchAdmin/branchAdminDashboardView/branchAdminDashboardPage", { replace: true });
                    } 

                    else if (role ==="TENANT_ADMIN"){

                        navigate("/services/RentalServices/customerAdminAccount/customerAdminDashboardView/customerAdminMainDashboardPage",{replace: true});

                    }

                    else {

                        navigate(-1);

                    }

            }


        } catch (err) {

            const res = err.response?.data;

            setError({

                email: res?.email,

                password: res?.password,

                general:res?.message

            })

            if (res?.message !== "Invalid password" && res?.message !== "Username Not found") {
                    showAlert("error", res?.message);
            }


        } finally {

            setLoading(false);

        };

    }

    //ALL ADMIN PORTAL

const handleLogout = async (e) => {

    const confirm = await Swal.fire({

        icon: 'warning',

        title: 'Are you sure?',

        text: 'You are about to log out.',

        showCancelButton: true,

        confirmButtonText: 'Yes, log out',

        confirmButtonColor: "rgba(2, 199, 2, 0.87)",

        cancelButtonText: 'Cancel'

    });


    if (!confirm.isConfirmed) {

        return; // user clicked Cancel or dismissed the dialog

    }

    setLogoutLoading(true);

    try {

        const res = await validateToken();

        const role = res.data.role;

        await logoutAdmin();

        await Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            timer: 1500,
            showConfirmButton: false
        });

        if (role === "MAIN_ADMIN" || role === "RENTAL_ADMIN") {

            navigate("/signin", { replace: true });

        } else if (role === "TENANT_ADMIN") {

            navigate("/services/RentalServices/loginpage", { replace: true });

        } else {

            navigate(-1);
            
        }

    } catch (err) {

        console.log("logout error", err);

        await Swal.fire({

            icon: 'error',

            title: 'Logout Failed',

            text: 'Something went wrong while logging out. Redirecting you to sign in.'

        });

        navigate("/signin", { replace: true });

    } finally {

        setLogoutLoading(false);

    }

};
    return {

      
        handleLogginChange,
        handleLoggingIn,
        captchatoken,
        setCaptchatoken,
        captchakey,
        setCaptchakey,
        error,
        logoutLoading,
        loading,
        alert,
        logginForm,
        turnstileRef,
        handleLogout,
    }


}

export default AuthenticationManagement;