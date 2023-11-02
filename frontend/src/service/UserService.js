import axios from 'axios';
export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-in`, data);
    return res.data;
};

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-up`, data);
    return res.data;
};

export const getDetailUser = async (id, access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/user/getDetailUser/${id}`, {
        headers: {
            token: access_token,
        },
    });
    return res.data;
};

export const logioutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/logout`);
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_KEY}/user/updateUser/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
