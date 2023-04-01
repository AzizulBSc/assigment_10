import { apiSlice } from "../api/apiSlice";
export const quizzes = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getQuizzes:builder.query({
            query:()=>"/quizzes",
        }),
        deleteQuizze:builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",
            }),

        }),
    }),
});
export const {useGetQuizzesQuery,useDeleteQuizzeMutation} = quizzes;