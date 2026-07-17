import {useState, useEffect, useCallback} from "react";
import { getChatlist } from "../../../../api/services/RentalServices/branchAdmin/AdminManagement";
const useChatManagement = () => {

    const [tenantList, setTenantList] = useState([]);
    
    const [loading, setLoading] = useState(false);

    const fetchChatList = useCallback(async() => {

        setLoading(true);

        try{

            const res = await getChatlist();

            const detail = res?.data?.data;

            setTenantList(detail || []);
            
        } catch(err){

            console.error("Fetch tenant list error", err);

        }finally{

            setLoading(false);

        }


    }, [])


    useEffect(() => {

        fetchChatList();


    },[fetchChatList]);

    return{
        tenantList,
        fetchChatList,
        loading

    }
}

export default useChatManagement;