import React,{useState,useEffect,useCallback} from 'react';
import { getPaymentList, billingElectric } from '../../../../api/services/RentalServices/BillingAndPayment/BillingAndPaymentManagement';
import { validateToken } from '../../../../api/Authentication/authenticationManagement';
const INITIAL_FORM ={

    paymentid:"",
    electricbill:""

}


const useBillingPaymentManagement = (mode="Electric Billing", initialData = null) =>{

    const [alert, setAlert] = useState({

        type:"",
        message:""

    })

    const [formData, setFormData] = useState(INITIAL_FORM);

    const [billDetails, setBillDetails] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({});

    const [pagination, setPagination] = useState({

        currentPage:0,
        pageSize:20,
        totalPages:0,
        totalElements:0,

    })

    const showAlert = (type,message) => {

        setAlert({type, message});

        setTimeout(() => {

            setAlert({ type:"", message:""});

        }, 3000);

    };

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));
        
        setError((prev) => ({
            
            ...prev,
            [name]: ""
        }));


    }

    const fetchBillDetails = useCallback(async(page = 0, size = 20) => {

        setLoading(true);
        
        try{

            const response = await getPaymentList(page, size);

            const data = response?.data?.data;

            setBillDetails(data?.content || []);

            setPagination({


                currentPage:   data?.page?.number        ?? 0,
                pageSize:      data?.page?.size          ?? 20,
                totalPages:    data?.page?.totalPages    ?? 0,
                totalElements: data?.page?.totalElements ?? 0,

            })

        } catch (error) {

            console.log("Error fetching branch tenants:", error);

        } finally {

            setLoading(false);

        }


    }, [])



   useEffect(() => {

    if (mode === "Electric Billing" && initialData) {

        setFormData({
            paymentid: initialData.paymentid || "",
            electricbill: initialData.electricbill || ""
        });

    } else {

        setFormData(INITIAL_FORM);

    }

    setError({});

    fetchBillDetails();

}, [mode, initialData, fetchBillDetails]);    


    const handleElectricBilling = useCallback(async(e) =>{

        e.preventDefault();

        setLoading(true);

        setError({});

        try{

            const data = {

               electricbill: formData.electricbill.trim()

            }


            const response = await billingElectric(formData.paymentid, data);

            if(response){

                fetchBillDetails();

                showAlert("success", response?.data.message);

                setFormData(INITIAL_FORM);

            }

        } catch(err){

            const res = err.response?.data;

            setError({

                    electricbill: res.message

            })


        }finally {

            setLoading(false);

        };


    },[fetchBillDetails, formData])


    return{
        handleChange,
        handleElectricBilling,
        error,
        formData,
        alert,
        loading,
        pagination,
        fetchBillDetails,
        billDetails

    }

}



export default useBillingPaymentManagement;