import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createMessageInquiry, getAllMessages, deleteMessage} from '../../../api/main/admin/messageManagement';
import swal from 'sweetalert2';

const INITIAL_FORM ={
    messageid: "",
    fullname:"",
    email: "",
    subjecttype: "",
    messagedesc: "",
}

const useMessageManagement = () => {
    const [alert, setAlert] = useState({
        type: "",
        message: "",
    });



    const [formData, setFormData] = useState(INITIAL_FORM);

    const [messages, setMessages] = useState([]);

    const [error, setError] = useState({});

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({

        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0,

    });

    const turnstileRef = useRef();

    const [captchaToken, setCaptchaToken] = useState("");

    const [captchaKey, setCaptchaKey] = useState(0);

    const showAlert = (type, message) => {

        setAlert({type, message});

        setTimeout(() => {

            setAlert({type: "", message: ""});

        }, 3000);

    }

    useEffect(() => {

    setCaptchaToken("");


    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prevData) => ({

            ...prevData,

            [name]: value

        }));

          setError((prev) => ({
        ...prev,
        [name]: ""
    }));
    };

    const fetchAllMessages = useCallback(async (page = 0, size = 10) => {

        try {
            const response = await getAllMessages(page, size);

            const data = response?.data?.data || response?.data;

            setMessages(data?.content || []);

            setPagination({

                currentPage:    data?.number || 0,

                pageSize:       data?.size || 10,

                totalPages:     data?.totalPages || 0,

                totalElements:  data?.totalElements || 0


            });

        } catch (err) {
            
            console.error("Fetch messages error:", err);

            setError({ general: "Failed to load messages." });

        }finally {

            setLoading(false);

        }
    }, []);

    const handleDelete = async(messageid) => {

        const confirm = await swal.fire({

            title: "Are you sure?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#16a34a",

            cancelButtonColor: "#d33",

            confirmButtonText: "Yes, delete it!"
        })

        if (confirm.isConfirmed) {
        
                    try {
        
                        const response = await deleteMessage(messageid);
        
                        await fetchAllMessages(pagination.currentPage, pagination.pageSize);
        
                        await swal.fire({
        
                        title: "Deleted!",
        
                        text: response?.data?.message,
        
                        icon: "success",
        
                        confirmButtonColor: "#16a34a",
        
                    });
        
                    } catch (err) {
        
                        setError({ general: "Failed to delete message." });
        
                    }
        
                }

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError({});

        try {

        if (!captchaToken) {

            setError({ general: "Complete captcha first" });

            setLoading(false);

            return;
        }


        const payload = {

            ...formData,

            captchatoken: captchaToken
        };


            
            const response = await createMessageInquiry(payload);

            if(response){

                showAlert("success", response?.data.message );

                setFormData(INITIAL_FORM);

                setCaptchaToken("");

                turnstileRef.current?.reset?.();

                setCaptchaKey((prev) => prev + 1);
                         

            }

        } catch (err) {

            const res = err.response?.data ;

                setError({

                    fullname: res?.fullname,

                    email: res?.email,

                    subjecttype: res?.subjecttype,

                    messagedesc: res?.messagedesc 

                  
                });

                showAlert("warning", res?.message)
               

        } finally {

            setLoading(false);

        };
        
    }

    return {
        handleChange,
        handleSubmit,
        handleDelete,
        formData,
        error,
        loading,
        alert,
        pagination,
        messages,
        fetchAllMessages,
        captchaToken,
        setCaptchaToken,
        turnstileRef,
        captchaKey,
        setCaptchaKey
 
    }
};
export default useMessageManagement;