import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    user: {
        name: '',
        phone: '',
        profile: {
            degree: ''
        }
    },
    token : '',
    isAuthenticated: false,
    isLoading: false,
    msg:'',
}

// HANDLE REGISTER USER
const signUpUser = createAsyncThunk('signUpUser',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/user/sendOTP', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

const createAccount = createAsyncThunk('createAccount', async (body) => {
    try {
        const res = await fetch(URL_API + 'api/user/sign-up', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE SIGN IN USER
const signInUser = createAsyncThunk('signInUser',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/user/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE SIGN IN USER
const getDetailUser = createAsyncThunk('getDetailUser',async(body)=> {
    try {
        const {id , token} = body;
        const res = await fetch(URL_API + 'api/user/getDetailUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token' : `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

//
const updateUserRecruitment = createAsyncThunk('updateUserRecruitment',async(body)=> {
    try {
        const {id , ...others} = body;
        const res = await fetch(URL_API + `api/user/updateUser/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(others),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

//
const updateCompanyUserRecruitment = createAsyncThunk('updateCompanyUserRecruitment',async(body)=> {
    try {
        const {id , ...others} = body;
        const res = await fetch(URL_API + `api/user/updateCompany/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(others),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// EMAIL RESPONSE FROM RECRUITER FOR APPLICANTS
const notificationByEmail = createAsyncThunk('notificationByEmail',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/user/notificationByEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// EMAIL RESPONSE FROM RECRUITER FOR APPLICANTS
const logoutInDB = createAsyncThunk('logoutInDB',async()=> {
    try {
        const res = await fetch(URL_API + 'api/user/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser : (state,action) => {
            const {name,phone,degree} = action.payload;
            state.user.name = name ? name : '';
            state.user.phone = phone ? phone : '';
            state.user.profile.degree = degree ? degree : '';
        },
        logOutUser: (state,action) => {
            localStorage.removeItem('token');
            state.token = "";
            state.msg = "Logout success";
        }
    },
    extraReducers : (builder) => {
        // ================= SIGN UP =================
        builder.addCase(signUpUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signUpUser.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(signUpUser.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= SIGN IN =================
        builder.addCase(signInUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signInUser.fulfilled,(state,action) => {
            const {access_token} = action.payload;
            state.isLoading = false;
            state.token = access_token;
            // SAVE TOKEN USER IN LOCAL
            localStorage.setItem('token',access_token);
        });
        builder.addCase(signInUser.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= UPDATE USER RECRUITMENT =================
        builder.addCase(updateUserRecruitment.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserRecruitment.fulfilled,(state,action) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.msg = message;
        });
        builder.addCase(updateUserRecruitment.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= UPDATE COMPANY USER RECRUITMENT =================
        builder.addCase(updateCompanyUserRecruitment.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(updateCompanyUserRecruitment.fulfilled,(state,action) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.msg = message;
        });
        builder.addCase(updateCompanyUserRecruitment.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default authSlice.reducer;
export {
    // REGISTER USER
    signUpUser,createAccount,
    // LOGIN
    signInUser,
    // GET DETAIL INFO USER
    getDetailUser,
    // UPDATE USER RECRUITMENT
    updateUserRecruitment,
    // UPDATE COMPANY USER RECRUITMENT
    updateCompanyUserRecruitment,
    // EMAIL RESPONSE FROM RECRUITER FOR APPLICANTS
    notificationByEmail,
    // LOGOUT
    logoutInDB
};
export const {updateUser,logOutUser} = authSlice.actions; 