import { apiSlice } from "../api/apiSlice";
export const assignments = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAssignments:builder.query({
            query:()=>"/assignments",
        }),
    }),
});
export const {useGetAssignmentsQuery} = assignments;