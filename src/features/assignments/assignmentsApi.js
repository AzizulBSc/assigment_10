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
    }),
});
export const {useGetAssignmentsQuery,useDeleteAssignmentMutation} = assignments;