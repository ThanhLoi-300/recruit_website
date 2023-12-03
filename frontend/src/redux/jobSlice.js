import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    job: {
        id: '',//
        title: '',// STEP2
        vacancy: '',// STEP2
        logoLink: '',//COMPANY
        websiteLink: '',//COMPANY
        nameCompany: '',//COMPANY
        urgent: false,
        address: '',//COMPANY
        area: '',//COMPANY
        careerType: '',//STEP2
        jobDescription: '',
        typeJob: '',//STEP 3
        quantityRecruit: 0,//STEP 3
        salary: '', //STEP 3
        experienceYear: '', //STEP 3
        deadlineApplication: '',
        active: true,
        userId: '',// INIT
        level: '', // COMPANY LEVEL
    },
    isLoading: false,
    msg:'',
}

// CREATE JOB
const createJob = createAsyncThunk('createJob',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/job/createJob', {
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

// HANDLE GET LIST JOB RECRUITER
const getListJobByRecruiter = createAsyncThunk('getListJobByRecruiter',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/job/searchJobByIdRecruiter', {
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

// HANDLE SEARCH JOBS
const searchJob = createAsyncThunk('searchJob',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/job/searchJob', {
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

// HANDLE SEARCH JOBS
const getDetailJobById = createAsyncThunk('getDetailJobById',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/job/getJobByUser/${id}`, {
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

// HANDLE GET JOB RANDOM
const getJobRandom = createAsyncThunk('getJobRandom',async()=> {
    try {
        const res = await fetch(URL_API + 'api/job/getJobRandom', {
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

// HANDLE UPDATE STATUS JOBS
const updateStatusJob = createAsyncThunk('updateStatusJob',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/job/changeStatusJob/${id}`, {
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

// HANDLE UPDATE STATUS JOBS
const updateJobByDB = createAsyncThunk('updateJobByDB',async(body)=> {
    try {
        const {id , ...others} = body;
        const res = await fetch(URL_API + `api/job/updateJob/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
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

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        updateJob : (state,action) => {
            const { title, logoLink, websiteLink, nameCompany, address, area, careerType, vacancy, jobDescription,
                level, typeJob, quantityRecruit, salary, experienceYear, deadlineApplication, userId } = action.payload;
            state.job.title = title ? title : '';
            state.job.logoLink = logoLink ? logoLink : '';
            state.job.websiteLink = websiteLink ? websiteLink : '';
            state.job.nameCompany = nameCompany ? nameCompany : '';
            state.job.address = address ? address : '';
            state.job.area = area ? area : '';
            state.job.careerType = careerType ? careerType : '';
            state.job.logoLink = logoLink ? logoLink : '';
            state.job.vacancy = vacancy ? vacancy : '';
            state.job.jobDescription = jobDescription ? jobDescription : '';
            state.job.level = level ? level : '';
            state.job.typeJob = typeJob ? typeJob : '';
            state.job.quantityRecruit = quantityRecruit ? quantityRecruit : '';
            state.job.salary = salary ? salary : '';
            state.job.experienceYear = experienceYear ? experienceYear : '';
            state.job.deadlineApplication = deadlineApplication ? deadlineApplication : '';
            state.job.userId = userId ? userId : '';
        }
    },
    extraReducers : (builder) => {
        // ================= CREATE JOB =================
        builder.addCase(createJob.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(createJob.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(createJob.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= CREATE JOB =================
        builder.addCase(getListJobByRecruiter.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getListJobByRecruiter.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(getListJobByRecruiter.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default jobSlice.reducer;
export {
    // CREATE JOB
    createJob,
    // GET LIST JOB RECRUITER
    getListJobByRecruiter,
    // SEARCH JOBS
    searchJob,
    // GET DETAIL JOBS BY ID
    getDetailJobById,
    // GET JOB RANDOM
    getJobRandom,
    // HANDLE UPDATE STATUS JOB
    updateStatusJob,
    // HANDLE UPDATE JOB
    updateJobByDB
};
export const {updateJob} = jobSlice.actions; 