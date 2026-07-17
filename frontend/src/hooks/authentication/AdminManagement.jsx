import React, { useEffect, useRef, useState } from 'react';
import { createAdmin, tenantCreate } from "../../api/Authentication/AdminManagement";

const CREATE_INITIAL_FORM = {
    email: "",
    admin_type: "",
    branch: "",
    password: "",
    confirmpassword:""
}
const REGISTRATION_TENANT_FORM = {
    email: "",

    password: "",

    branch: "",

}
const AdminManagement = () => {

    const [alert, setAlert] = useState({
    
            type:"",
    
            message:"",
    
        })

    const [registerForm, setRegisterForm] = useState(REGISTRATION_TENANT_FORM);   

    const [createForm, setCreateForm] = useState(CREATE_INITIAL_FORM);    

    const [message, setMessage] = useState([]);
    
    const [error, setError] = useState({});
    
    const [loading, setLoading] = useState(false);

    const [captchatoken, setCaptchatoken]  = useState("");
    
    const [captchakey, setCaptchakey] = useState(0);

    const turnstileRef = useRef();

    const showAlert = (type, message) => {

        setAlert({ type, message});

        setTimeout(() => {

            setAlert({ type: "", message: ""});

        } , 3000);

    }

    //ALL ADMIN PORTAL
    const handleCreateChange = (e) => {

        const {name, value} = e.target;

        setCreateForm((prevData) => ({

            ...prevData,

            [name] : value

        }));


        setError((prev) => ({

            ...prev,

            [name]: ""

        }));

    };

        //TENANT ADMIN PORTAL
      const handleRegisterChange = (e) => {

      const { name, value } = e.target;

      setRegisterForm((prevData) => ({

        ...prevData,

        [name]: value

      }));

      setError((prev) => ({

        ...prev,

        [name]: ""

      }));

    }

    // ALL ADMIN PORTAL
    const handleCreateAccount = async (e) => {
    
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
    
                    ...createForm,
    
                    captchatoken: captchatoken
    
                };
    
                const response = await createAdmin(payload);
    
                if(response){
    
                    showAlert("success", response?.data.message);
    
                    setCreateForm(CREATE_INITIAL_FORM);
    
                    setCaptchatoken("");
    
                    setCaptchakey((prev) => prev + 1);
    
                }
    
            } catch (err) {
    
                const res = err.response?.data;
    
                setError({
    
                    email: res?.email,
    
                    admin_type: res?.admin_type,
    
                    branch: res?.branch,
    
                    password: res?.password,
    
                    confirmpassword: res?.confirmpassword,
    
                    general: res?.message
                })
    
                  if (res?.message !== "Password and confirm password do not match") {
                        showAlert("error", res?.message);
                }
    
            } finally {
    
                setLoading(false);
    
            };
    
    
        }

        //TENANT ADMIN PORTAL
        const handleRegistrationSubmit = async (e) => {
        
              e.preventDefault();
        
              setLoading(true);
        
              setError({});
        
              try{
        
                if(!captchatoken){  
        
                  setError({ captcha: "Please complete the CAPTCHA" });
        
                  setLoading(false);
        
                  return;
        
              }
        
              const payload = {
        
                ...registerForm,
        
                captchatoken: captchatoken
        
            };
        
            const response = await tenantCreate(payload);
        
            if(response){
        
              showAlert("success", response?.data.message);
        
              setRegisterForm(REGISTRATION_TENANT_FORM);
        
              setCaptchatoken("");
        
              setCaptchakey((prev) => prev + 1);
        
            }
          }catch (err) {
            
            const res = err.response?.data;
        
            setError({
        
              email: res?.email,
        
              password: res?.password,
        
              branch: res?.branch,
        
              general: res?.message
        
            })
        
        
        
          } finally {
        
            setLoading(false);
        
          }
        }

        return{

            handleRegistrationSubmit,
            handleRegisterChange,
            registerForm,
            handleCreateChange,
            handleCreateAccount,
            createForm,
            captchatoken,
            setCaptchatoken,
            captchakey,
            setCaptchakey,
            error,
            loading,
            alert,
            turnstileRef


        }

}

export default AdminManagement;