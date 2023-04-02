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
        editMark:builder.mutation({
            query:(data)=>({
                url: `/assignmentMark/${data.id}`,
                method: "PATCH",
                body:data,

            }),
        })
    }),
});
export const {useGetMarksQuery,useDeleteMarkMutation,useEditMarkMutation} = marks;