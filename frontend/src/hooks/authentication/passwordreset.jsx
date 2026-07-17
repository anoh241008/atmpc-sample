import React,{ useState, useEffect} from 'react';
import { sendResetLink, validateResetPasswordToken, resetPassword } from '../../api/Authentication/passwordreset';

    const SENDLINK_INITIAL_FORM ={

        email: "",

    }

    const RESET_PASSWORD_INITIAL_FORM = {

        newpassword: "",

        confirmnewpassword:"",
    }
    const PasswordResetManagement = (token) => {

    const [alertPassword, setAlertPassword] = useState({

        type: "",

        message: "",

    })

    const [resetFormData, setResetFormData] = useState(RESET_PASSWORD_INITIAL_FORM);

    const [formDataPassword, setFormDataPassword] = useState(SENDLINK_INITIAL_FORM);

    const [errorPassword, setErrorPassword] = useState({});

    const [loadingPassword, setLoadingPassword] = useState(false);


    const showAlert = (type, message) => {

        setAlertPassword({type, message});

        setTimeout(() => {

            setAlertPassword({type: "", message: ""});

        }, 3000);
        
    }

    const handleSendLinkChange = (e) => {

        const {name, value} = e.target;

        setFormDataPassword((prevData) => ({

            ...prevData,

            [name] : value

        }));

        setErrorPassword((prev) => ({
            ...prev,

            [name]: ""
        }));
    }

    const handleResetPasswordChange = (e) => {

        const {name, value} = e.target;

        setResetFormData((prevData) => ({
            
            ...prevData,

            [name] : value

        }));

          setErrorPassword((prev) => ({
            ...prev,

            [name]: ""
        }));

    }

    const handleSendLink = async(e) => {

        e.preventDefault();

        setLoadingPassword(true);

        setErrorPassword({});

        try{
          
            const response = await sendResetLink(formDataPassword)

            if(response){

                showAlert("success", response?.data.message);

                setFormDataPassword(SENDLINK_INITIAL_FORM);

            }

        } catch(err) {

            console.log(err.response?.data);
            const res = err.response?.data;

            setErrorPassword({

                email: res?.email,

                general: res?.message

            })

        } finally {

            setLoadingPassword(false);
        }

    }

    const handleResetpassword = async(e) => {

        e.preventDefault();

        setLoadingPassword(true);

        setErrorPassword({});

        try{

              await validateResetPasswordToken(token);

            const response = await resetPassword({
                
                ...resetFormData,
                token,
            })

            if(response) {

                  showAlert("success", response?.data.message);

                  setResetFormData(RESET_PASSWORD_INITIAL_FORM);

            }

        }catch(err) {


            const res = err.response?.data;

            setErrorPassword({

                newpassword: res?.newpassword,

                confirmnewpassword: res?.confirmnewpassword,

                general: res?.message

            })
             if (res?.message !== "Password and confirm password do not match") {
                    showAlert("error", res?.message);
            }

        } finally {

            setLoadingPassword(false);
        }

    }

    return {

        handleSendLinkChange,
        handleSendLink,
        handleResetPasswordChange,
        handleResetpassword,
        resetFormData,
        formDataPassword,
        loadingPassword,
        errorPassword,
        alertPassword,
    }

}

export default PasswordResetManagement;
   