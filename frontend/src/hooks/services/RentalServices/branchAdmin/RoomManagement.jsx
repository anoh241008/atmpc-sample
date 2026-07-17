import React,{useCallback, useState, useEffect} from "react";
import { createRoom, updateRoom, getRoomList } from "../../../../api/services/RentalServices/branchAdmin/AdminManagement";

const INITIAL_FORM = {
    roomid:"",
    roomnumber:"",
    capacity:"",
    monthlyrent:""
}



const useRoomManagement = (mode = "Create Room", initialData = null) => {

    const [formData, setFormData] = useState(INITIAL_FORM);

    const [tenants, setTenants] = useState([]);

    const [roomList, setRoomList] = useState([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({

        currentPage:0,
        pageSize:10,
        totalPages:0,
        totalElements:0,

    })
    const [error, setError] = useState({});

    const [alert, setAlert] = useState({

        type: "", 
        message: ""

    });

    const showAlert = (type, message) => {

        setAlert({type,message});

        setTimeout(() => {

            setAlert({type:"", message: ""});

        },3000);

    }  

  
 
    useEffect(() => {

        if(mode === "Edit Room" && initialData){

            setFormData({

                roomid: initialData.roomid || "",
                roomnumber: initialData.roomnumber || "",
                capacity: initialData.capacity || "",
                monthlyrent: initialData.monthlyrent || ""

            });

        } else if(mode === "Create Room"){

            setFormData(INITIAL_FORM);

        }

        setError({});

    },[mode, initialData]);


    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData((prev) => ({
            
            ...prev,
            [name]: value,

        }))

        setError((prev) =>({ ...prev, [name]: ""}));

    }

    const fetchRoomList = useCallback(async (page = 0 , size= 10) => {

        try{

            const response = await getRoomList(page, size);

            const data = (response?.data?.data || response?.data);

            setRoomList(data?.content || []);

            setPagination({

                currentPage:   data?.page?.number        ?? 0,
                pageSize:      data?.page?.size          ?? 10,
                totalPages:    data?.page?.totalPages    ?? 0,
                totalElements: data?.page?.totalElements ?? 0,

            })

        } catch(err){

            setError({general: "failed to load room list"});

        }

    }, [])

    const handleSubmit = useCallback(async(e) => {

        setLoading(true);

        setError({});

        e.preventDefault();

        try{

            const data = {

                roomnumber: formData.roomnumber.trim(),
                capacity: formData.capacity.trim(),
                monthlyrent: formData.monthlyrent.trim(),

            };

            let response;

            if(mode === "Create Room"){

                response = await createRoom(data);

            }else{

                response = await updateRoom(formData.roomid, data);

            }

            if(response){

                await fetchRoomList();          

                showAlert("success", response?.data?.message);

                setFormData(INITIAL_FORM);     
                
            }

        } catch(err){

            const res = err.response?.data;

            if(res?.roomnumber || res?.capacity || res?.monthlyrent){

                setError(res);

            }else{

                setError({general: "Something went wrong"});

            }

        } finally{

            setLoading(false);

        }

    },[fetchRoomList, mode, formData]);

   

    return { 

        loading, 
        pagination,
        error, setError,
        alert, setAlert,
        formData, setFormData,
        handleChange,
        handleSubmit,
        fetchRoomList,
        roomList,
    };
};

export default useRoomManagement;