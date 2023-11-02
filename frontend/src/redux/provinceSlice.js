const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}

// HANDLE REGISTER USER
const getProvince = createAsyncThunk('getProvince',async(body)=> {
    try {
        const res = await fetch('https://vapi.vnappmob.com/api/province/', {
            method: 'GET',
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

const provinceSlice = createSlice({
    name: "province",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= SIGN UP =================
        builder.addCase(getProvince.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getProvince.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(getProvince.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default provinceSlice.reducer;
export {
    // REGISTER USER
    getProvince,
};
//export const {} = provinceSlice.actions; 