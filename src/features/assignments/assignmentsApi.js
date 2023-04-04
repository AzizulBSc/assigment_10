import { apiSlice } from "../api/apiSlice";
export const assignments = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAssignments:builder.query({
            query:()=>"/assignments",
        }),
        deleteAssignment:builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",
            }),

        }),
        assignmentAdd:builder.mutation({
            query:(data)=>({
                url: "/assignments",
                method: "POST",
                body:data,

            }),
        }),
        assignmentEdit:builder.mutation({
            query:(data)=>({
                url: `/assignments/${data.id}`,
                method: "PATCH",
                body:data,

            }),
        }),
        getVideoAssignment:builder.query({
            query:(video_id)=>`/assignments?video_id=${video_id}`,
        }),
    }),
});
export const {useGetAssignmentsQuery,useDeleteAssignmentMutation,useAssignmentAddMutation,useAssignmentEditMutation,useGetVideoAssignmentQuery} = assignments;