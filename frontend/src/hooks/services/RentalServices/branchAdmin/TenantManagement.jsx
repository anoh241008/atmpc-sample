import React,{useState, useEffect, useCallback} from 'react';
import { ToApprovalTenant,ToSetDueTenant, deleteTenant, AssgningRoomTenant, getBranchTenants, getRoomListForTenantToAssign } from '../../../../api/services/RentalServices/branchAdmin/AdminManagement';
import Swal from 'sweetalert2';

const INITIAL_FORM_ROOMASSIGN = {
    customerid:"",
    roomid:"",
    roomnumber:""
}

const useTenantManagement = (mode = "Assigning Room", initialData = null) => {

    const [formDataRoomAssign, setFormDataRoomAssign] = useState(INITIAL_FORM_ROOMASSIGN);

    const [roomListToAssignForTenant, setRoomListToAssignForTenant] = useState([]);

    const [tenants, setTenants] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({});

    const [alert, setAlert] = useState({ type: "", message: "" });

    const [pagination, setPagination] = useState({

        currentPage:0,
        pageSize:10,
        totalPages:0,
        totalElements:0,

    })

    const showAlert = (type, message) => {

        setAlert({type,message});

        setTimeout(() => {

            setAlert({type:"", message: ""});

        },3000);

    }  

    useEffect(() => {

        if(mode === "Assigning Room" && initialData){

            setFormDataRoomAssign({

                customerid: initialData.customerid || "",
                roomid: initialData.roomid || "",
                roomnumber: initialData.roomnumber || ""

            })

        }
        else{

            setFormDataRoomAssign(INITIAL_FORM_ROOMASSIGN);

        }

        setError({});

    },[mode, initialData])
    
    const fetchBranchTenants = useCallback(async (page = 0, size = 10) => {

        setLoading(true);

        try {

            const response = await getBranchTenants(page, size);

            const data = response?.data?.data;

            setTenants(data?.content || []);

            setPagination({

                currentPage:   data?.page?.number        ?? 0,
                pageSize:      data?.page?.size          ?? 10,
                totalPages:    data?.page?.totalPages    ?? 0,
                totalElements: data?.page?.totalElements ?? 0,

            })

        } catch (error) {

            console.error("Error fetching branch tenants:", error);

        } finally {

            setLoading(false);

        }

    }, []);

    const fetchRoomListToAssignForTenant = useCallback(async() => {

        setLoading(true);

        try{

            const response = await getRoomListForTenantToAssign();

            const data = response?.data?.data;

            setRoomListToAssignForTenant(data || []);

        } catch(err) {

            console.error("Error fetching room list:", err);

        } finally {

            setLoading(false);

        }

    }, [])
const handleChangeRoomAssign = (e) => {

        const {name, value} = e.target;

        setFormDataRoomAssign((prev) => ({

            ...prev,
            [name]: value,

        }));

        setError((prev) => ({ ...prev, [name]: "" }));

    }

 const handleApproval = async(user) => {

    Swal.fire({

        title: `${user.email}`,

        text: "Do you want to approve this tenant or set a due?",

        icon: "question",

        showCancelButton: true,
        showDenyButton: true,

        confirmButtonColor: "#16a34a",
        denyButtonColor: "#f59e0b",
        cancelButtonColor: "#6b7280",

        confirmButtonText: "Approve",
        denyButtonText: "Set Due",
        cancelButtonText: "Cancel"

    }).then(async(result) => {

        if(result.isConfirmed){

            try{

                const response = await ToApprovalTenant(user.customerid);

                if(response){

                    await fetchBranchTenants();

                    Swal.fire({

                        title: "Approved!",

                        icon: "success",

                        timer: 1500,

                        showConfirmButton: false

                    });

                }

            } catch(err){

                Swal.fire("Error", "Something went wrong", "error");

            }

        } else if(result.isDenied){

            const { value: response } = await Swal.fire({

                title: "Set Due Date",
                html: `
                    <input 
                        type="date" 
                        id="dueDateInput" 
                        class="swal2-input"
                    >
                `,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#16a34a",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Set Due",
                cancelButtonText: "Cancel",
                preConfirm: async() => {

                    const input = document.getElementById("dueDateInput").value;


                    try{

                        const result = await ToSetDueTenant(user.customerid, input);
                        return result;

                    } catch(err){
                        console.log(err);
                      Swal.showValidationMessage(
                            err?.response?.data?.dateDue || "Invalid due date"
                        );
                        return false;

                    }

                }

            });

            if(response){

                await fetchBranchTenants();

                Swal.fire({

                    title: "Due Date Set!",

                    icon: "success",

                    timer: 1500,

                    showConfirmButton: false

                });

            }

        }

    },[fetchBranchTenants]);

}

    const handleDeletion = async(user) => {

    Swal.fire({

        title: `${user.fullname}`,

        text: "Do you want to delete this tenant?",

        icon: "question",

        showCancelButton: true,

        confirmButtonColor: "rgb(255, 0, 0)",

        cancelButtonColor: "#6b7280",

        confirmButtonText: "Delete",

        cancelButtonText: "Cancel"

    }).then(async(result) => {

        if(result.isConfirmed){

            try{

                const response = await deleteTenant(user.customerid);

                if(response){

                    await fetchBranchTenants();

                    Swal.fire({

                        title: "Deleted!",

                        icon: "success",

                        timer: 1500,

                        showConfirmButton: false

                    });

                }

            } catch(err){

                Swal.fire("Error", "Something went wrong", "error");

            }

        }

    },[fetchBranchTenants]);

}

    const handleAssignRoom = useCallback(async(e) => {  

        e.preventDefault();

        setLoading(true);

        setError({});   

        try{

            const data = {

                roomid: parseInt(formDataRoomAssign.roomid)


            };


            const response = await AssgningRoomTenant(formDataRoomAssign.customerid, data);  

            if(response){

                await fetchBranchTenants();   

                showAlert("success", response?.data?.message);

                setFormDataRoomAssign(INITIAL_FORM_ROOMASSIGN);

            }

        } catch(err) {

            const res = err.response?.data;

            setError(res || { general: "Something went wrong" });

        } finally {

            setLoading(false);

        }

    },[fetchBranchTenants, mode, formDataRoomAssign]);

    return{
    tenants,
    loading,
    error,
    alert,
    fetchBranchTenants,
    pagination,
    formDataRoomAssign,             
    handleChangeRoomAssign,         
    handleAssignRoom,               
    fetchRoomListToAssignForTenant,
    roomListToAssignForTenant,
    handleApproval,
    handleDeletion
    }
}

export default useTenantManagement;