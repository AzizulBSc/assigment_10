import { apiSlice } from "../api/apiSlice";
export const marks = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMarks:builder.query({
            query:()=>"/assignmentMark",
        }),
    }),
});
export const {useGetMarksQuery} = marks;