import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}

// CREATE APPLY JOB
const createApplyJob = createAsyncThunk('createApplyJob',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/apply/createApply', {
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

// CREATE APPLY JOB
const getAppliesByUserId = createAsyncThunk('getAppliesByUserId',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/apply/getAppliesByUser/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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

const applyJobSlice = createSlice({
    name: "applyJob",
    initialState,
    reducers: {
        updateJob : (state,action) => {
            
        }
    },
    extraReducers : (builder) => {
        // ================= CREATE JOB =================
        builder.addCase(createApplyJob.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(createApplyJob.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(createApplyJob.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default applyJobSlice.reducer;
export {
    // CREATE APPLY JOB
    createApplyJob,
    // GET APPLIES BY USER ID
    getAppliesByUserId
};
export const {updateJob} = applyJobSlice.actions; 