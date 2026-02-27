import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        jobs:[],
        selectedJob:null,
    },
    reducers:{
        setJob:(state,action)=>{
            state.jobs=action.payload;
        },
        addJob:(state,action)=>{
            state.jobs.unshift(action.payload);
        },
        deleteJob:(state,action)=>{
            state.jobs=state.jobs.filter(
                (job)=>job._id!==action.payload
            );
        },
        updateJob:(state,action)=>{
             state.jobs = state.jobs.map((job) =>
             job._id === action.payload._id
             ? action.payload
             : job
          );  
        },
         setSelectedJob: (state, action) => {
           state.selectedJob = action.payload;
      },
    },
});

export const {
    setJob,addJob,deleteJob,updateJob,setSelectedJob
}=jobSlice.actions;

export default jobSlice.reducer;