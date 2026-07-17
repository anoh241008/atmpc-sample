import { useState, useEffect, useCallback, useRef } from "react";
import { createContent, updateContent, deleteContent, getAllContents, getLatestContents, getNewsAndEvents } from "../../../api/main/admin/contentManagement";
import swal from "sweetalert2";
const INITIAL_FORM = {
    id: "",
    title: "",
    type: "",
    description: "",
    contentphoto: null,
};

const useContentManagement = (mode = "create", initialData = null) => {

    const [alert, setAlert]           = useState({
        type: "",
        message: ""
    });

    const [formData, setFormData]     = useState(INITIAL_FORM);

    const [contents, setContents]     = useState([]);

    const [latestUpdate, setLatestUpdate] = useState([]);

    const [newsAndEvents, setNewsAndEvents] = useState([]);

    const [error, setError]           = useState({});

    const [loading, setLoading]       = useState(false);
    
    const [pagination, setPagination] = useState({

        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0,
        
    });

    const fileInputRef = useRef(null);

    const showAlert = (type, message) => {

        setAlert({type, message});

        setTimeout(() => {
            setAlert({type:"",message:""});
        },3000);

    };

    // ── Fetch ────────────────────────────────────────────
    const fetchAllContents = useCallback(async (page = 0, size = 10) => {

        try {

            setLoading(true);

            const response    = await getAllContents(page, size);

            const data        = response?.data?.data || response?.data;

            setContents(data?.content       || []);

            setPagination({

                currentPage:   data?.number        || 0,

                pageSize:      data?.size          || 10,

                totalPages:    data?.totalPages    || 0,

                totalElements: data?.totalElements || 0,

            });

        } catch (err) {

            console.error("Fetch contents error:", err);

            setError({ general: "Failed to load contents." });

        } finally {

            setLoading(false);

        }

    }, []);

    const fetchLatestUpdate = useCallback(async (page = 0, size = 4) => {

        try {

            const response = await getLatestContents(page, size);

            const data = (response?.data?.data || response?.data);

            setLatestUpdate(data?.content || []);

        } catch (err) {

            console.error("Fetch latest update error:", err);

            setError({ general: "Failed to load latest updates." });

        }

    }, []);

    const fetchNewsAndEvents = useCallback(async (page = 0, size = 4) => {
    try {
        const response = await getNewsAndEvents(page, size);
        const data = (response?.data?.data || response?.data);

        setNewsAndEvents(data?.content || []);

        setPagination({
            currentPage:   data?.page?.number        || 0,
            pageSize:      data?.page?.size          || 4,
            totalPages:    data?.page?.totalPages    || 0,
            totalElements: data?.page?.totalElements || 0,
        });

    } catch (err) {
        console.error("Fetch news and events error:", err);
        setError({ general: "Failed to load news and events." });
    }
}, []);

    // ── Populate form on mode/data change only ───────────
    useEffect(() => {

        if (mode === "edit" && initialData) {

            setFormData({

                id:           initialData.contentid   || "",

                title:        initialData.title       || "",

                type:         initialData.type        || "",

                description:  initialData.description || "",

                contentphoto: null,

            });

        } else if (mode === "create") {

            setFormData(INITIAL_FORM);

        }

        setError({});  // clear stale errors on every mode switch

    }, [mode, initialData]);

    // ── Field change ─────────────────────────────────────
    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: files ? files[0] : value,

        }));

        setError((prev) => ({ ...prev, [name]: "" }));

    };

    // ── Submit ───────────────────────────────────────────
    const handleSubmit = async (e) => {
        
        setLoading(true);

        setError({});

        try {

            const data = new FormData();

            data.append("title", formData.title.trim());

            data.append("type", formData.type.trim());

            data.append("description", formData.description.trim());

            if (formData.contentphoto) {

                data.append("file", formData.contentphoto);

            }

            let response;

            if (mode === "create") {

                response = await createContent(data);

            } else {

                response = await updateContent(formData.id, data);
            }

            if(response){

                showAlert("success", response?.data.message);

                await fetchAllContents(pagination.currentPage, pagination.pageSize);
                if(mode === "create"){
                    setFormData(INITIAL_FORM);
                    fileInputRef.current.value = "";
                }
                else{
                    fileInputRef.current.value = "";
                }

            } 


        } catch (err) {

              const res = err.response?.data;

        if (res?.message) {

            setError({ contentphoto: res.message });

        } 

        else if (res?.title || res?.type || res?.description) {

            setError(res);

        } 
        else {

            setError({ general: "Something went wrong." });


        }

        } finally {

            setLoading(false);
            
        }
    };

    const handleDelete = async (contentid) => {

        const confirm = await swal.fire({

            title: "Are you sure?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#16a34a",

            cancelButtonColor: "#d33",

            confirmButtonText: "Yes, delete it!"

        });

        if (confirm.isConfirmed) {

            try {

                const response = await deleteContent(contentid);

                await fetchAllContents(pagination.currentPage, pagination.pageSize);

                await swal.fire({

                title: "Deleted!",

                text: response?.data?.message,

                icon: "success",

                confirmButtonColor: "#16a34a",

            });

            } catch (err) {

                setError({ general: "Failed to delete content." });

            }

        }
    };

    return {

        formData, setFormData,
        handleChange, handleSubmit,
        fileInputRef,
        contents, fetchAllContents, fetchLatestUpdate, latestUpdate, fetchNewsAndEvents, newsAndEvents,
        pagination,
        error, setError,
        loading,
        alert,
        setAlert,
        handleDelete
    };

};

export default useContentManagement;