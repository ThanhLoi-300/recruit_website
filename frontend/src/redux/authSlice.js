import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    createdAt:'',
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUSer : (state,action) => {
            const {firstName,lastName,email,address,dateOfBirth,image} = action.payload;
            state.user.firstName = firstName;
            state.user.lastName = lastName;
            state.user.email = email;
            state.user.address = address;
            state.user.dateOfBirth = dateOfBirth;
            state.user.image = image;
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
    }
});
 
export default authSlice.reducer;
export {
    // REGISTER USER
    signUpUser,createAccount,
    // LOGIN
    signInUser,
    // GET DETAIL INFO USER
    getDetailUser
};
export const {updateUSer} = authSlice.actions; 