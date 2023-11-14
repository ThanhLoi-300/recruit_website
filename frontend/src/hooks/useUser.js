import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "~/redux/authSlice";
import { jwtDecode } from 'jwt-decode';
export default function useUser() {
    const dispatch = useDispatch();
    const [detailInfoUser,setDetailInfoUser] = useState({});
    const state = useSelector(state => state.auth);
    
    const handleDecoded = () => {
        let storageData = state.token || localStorage.getItem('token');
        let decoded = {}
        if (storageData !== 'undefined') {
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData }
    }

    const handleGetDetailsUser = async (id,token) =>{
        if(id && token){
            const detail = await dispatch(getDetailUser({id : id,token : token}));
            if(detail.payload && detail.payload.data){
                console.log(detail.payload.data);
                setDetailInfoUser(detail.payload.data);
            }
        }   
    }

    useEffect(() => {
        try {
            const { storageData, decoded } = handleDecoded()
            if (decoded?.id) {
                handleGetDetailsUser(decoded?.id, storageData)
            }
        } catch (error) {
            console.log(error);   
        }
    },[]);

    return {handleGetDetailsUser,detailInfoUser}
}