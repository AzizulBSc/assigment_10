import { apiSlice } from "../api/apiSlice";
export const marks = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMarks:builder.query({
            query:()=>"/assignmentMark",
        }),
        deleteMark:builder.mutation({
            query: (id) => ({
                url: `/assignmentMark/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags:["Videos"]

        }),
    }),
});
export const {useGetMarksQuery,useDeleteMarkMutation} = marks;