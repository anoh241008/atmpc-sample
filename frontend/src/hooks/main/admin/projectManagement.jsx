import { useState, useEffect, useCallback, useRef } from 'react';
import { createProject, updateProject, deleteProject, getAllProjects, getFeaturedProjects } from '../../../api/main/admin/projectManagement';
import swal from 'sweetalert2';

const INITIAL_FORM = {

    id: "",
    projectname: "",
    type: "",
    budget: "",
    status: "",
    description: "",
    progress: "",
    projectphoto: null,

}

const useProjectManagement = (mode = "create", initialData = null) => {

    const [alert, setAlert]             = useState ({
        type:"",
        message:""
    });

    const [formData, setFormData]       = useState(INITIAL_FORM);

    const [projects, setProjects]        = useState([]);
    
    const [fetchProject, setFetchProject] = useState([]);

    const [error, setError]             = useState({});

    const [loading, setLoading]         = useState(false);

    const [pagination, setPagination]   = useState({

        curreentPage: 0,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0,

    });

    const fileInputRef                  = useRef(null);

    const showAlert                     = (type, message) => {

        setAlert({type, message});

        setTimeout(() =>{

            setAlert({ type: "", message: ""});

        },3000);

    }

    const fetchFeaturedProjects = useCallback(async(page = 0, size = 4) => {

        try{
            
            setLoading(true);

            const response = await getFeaturedProjects(page, size);

            const data = response?.data?.data || response?.data;

            setFetchProject(data?.content || []);

            return response;

        } catch (err) {

            console.error("Fetch featured projects error:", err);

            setError({ general: "Failed to load featured projects." });

        } finally {

            setLoading(false);

        }

    }, []);

    const fetchAllProjects              = useCallback(async(page = 0, size = 10) => {

        try{

            setLoading(true);

            const response              = await getAllProjects(page, size);

            const data                  = response?.data?.data || response?.data;

            setProjects(data?.content || []);

            setPagination({

                currentPage:   data?.number        || 0,
                pageSize:       data?.size          || 10,
                totalPages:     data?.totalPages    || 0,
                totalElements:  data?.totalElements || 0,    

            })

        } catch (err) {

            console.error("Fetch projects error:",err);

            setError({ general: "Failed to load projects."});

            console.log(err);

        } finally {

            setLoading(false);

        }

    }, [])

    const handleSeeMore = async () => {

        try{

            if(loading) return;
            
            const nextPage = pagination.currentPage + 1;

            const response = await fetchAllProjects(nextPage, pagination.pageSize);

            const data = response?.data?.data || response?.data;

            setProjects((prev) => [...prev, ...(data?.content || [])]);

            setPagination((prev) => ({
                ...prev,
                currentPage:   data?.number        || 0,
                pageSize:       data?.size          || 10,
                totalPages:     data?.totalPages    || 0,
                totalElements:  data?.totalElements || 0,    
            }));

        } catch (err) {

            console.error("Load more projects error:", err);

        } finally {

            setLoading(false);  

        }
        
    };

    useEffect(() => {

        if (mode === "edit" && initialData) {

            setFormData({

                id:             initialData.projectid   || "",

                projectname:           initialData.projectname || "",

                type:           initialData.type || "",

                budget:         initialData.budget || "",

                status:         initialData.status || "",

                description:    initialData.description || "",

                progress:       initialData.progress || "",

                projectphoto: null,

            })

        }
        else if(mode === "create") {

            setFormData(INITIAL_FORM);

        }

        setError({});

    },[mode, initialData]);

    const handleChange = (e) => {

        const { name , value, files} = e. target;

        setFormData((prev) =>({

            ...prev,

            [name]: files ? files[0] : value,

        }));

        setError((prev) => ({...prev, [name]: ""}));

    }

    const handleSubmit = async (e) => {

        setLoading(true);

        setError({});

        try{

            const data = new FormData();

            data.append("projectname", formData.projectname.trim());

            data.append("type", formData.type.trim());

            data.append("budget", formData.budget.trim());

            data.append("status", formData.status.trim());

            data.append("description", formData.description.trim());

            data.append("progress", formData.progress);

            if(formData.projectphoto){

                data.append("file", formData.projectphoto);

            }

            let response;

            if(mode === "create") {

                response = await createProject(data);

            }
            else{

                response = await updateProject(formData.id, data);

            }

            if(response){

                showAlert("success", response?.data.message);

                await fetchAllProjects(pagination.currentPage, pagination.pageSize);

                if(mode === "create"){

                    setFormData(INITIAL_FORM)

                    fileInputRef.current.value = "";

                }
                else{

                    fileInputRef.current.value = "";

                }

            }

        } catch (err) {

            const res = err.response?.data;

            if(res?.message) {

                setError({ projectphoto: res.message });

            } 

            else if(res?.projectname || res?.type || res?.budget || res?.status || res?. description || res?.progress ) {

                setError(res);

            } 
            
            else {

                setError({ general: "something went wrong"});

            }

            return false;

        } finally {

            setLoading(false);

        }


    };
    
    const handleDelete = async (projectid) => {

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

                const response = await deleteProject(projectid); 

                await fetchAllProjects(pagination.currentPage, pagination.pageSize);
                   
                 await swal.fire({
                    
                    title: "Deleted!",
                    
                    text: response?.data?.message,
                    
                    icon: "success",
                    
                    confirmButtonColor: "#16a34a",
                    
                });


            } catch (err) {

                setError({ general: "Failed to delete project." });

            }   
        }
    }

    return {

        formData,
        setFormData,
        handleChange,
        handleSubmit,
        handleDelete,
        handleSeeMore,
        projects,
        fetchAllProjects,
        fetchFeaturedProjects,
        fetchProject,
        pagination,
        error,
        setError,
        loading,
        alert,
        setAlert,
        fileInputRef,


    };


};

export default useProjectManagement;