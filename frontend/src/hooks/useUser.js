import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser, logOutUser } from "~/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
export default function useUser() {
    const dispatch = useDispatch();
    const [obDetailInfoUser,setDetailInfoUser] = useState({});
    const state = useSelector(state => state.auth);
    const navigate = useNavigate();
    const handleDecoded = () => {
        let storageData = state.token || localStorage.getItem('token');
        let decoded = {}
        if (storageData !== 'undefined' && storageData !== null) {
            decoded = jwtDecode(storageData);
        }
        return { decoded, storageData }
    }

    const handleGetDetailsUser = async (id,token) =>{
        if(id && token){
            const detail = await dispatch(getDetailUser({id : id,token : token}));
            if(detail.payload && detail.payload.data){
                setDetailInfoUser(detail.payload.data);
            }
        }   
    }

    const handleLogOutUser = () => {
        dispatch(logOutUser());
        window.location.reload();
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

    return {handleGetDetailsUser,obDetailInfoUser,handleLogOutUser}
}