import { apiSlice } from "../api/apiSlice";
export const marks = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getMarks:builder.query({
            query:()=>"/assignmentMark",
        }),
        assmarksAdd:builder.mutation({
            query:(data)=>({
                url: "/assignmentMark",
                method: "POST",
                body:data,

            }),
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
        }),
        getAssMark:builder.query({
            query:(data)=>`/assignmentMark?student_id=${data.student_id}&&assignment_id=${data.assignment_id}`,
        }),
    }),
});
export const {useGetMarksQuery,useDeleteMarkMutation,useEditMarkMutation,useAssmarksAddMutation,useGetAssMarkQuery} = marks;