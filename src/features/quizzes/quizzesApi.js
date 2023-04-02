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
        quizzeAdd:builder.mutation({
            query:(data)=>({
                url: "/quizzes",
                method: "POST",
                body:data,

            }),
        }),
        quizzeedit:builder.mutation({
            query:(data)=>({
                url: `/quizzes/${data.id}`,
                method: "PATCH",
                body:data,

            }),
        })
    }),
});
export const {useGetQuizzesQuery,useDeleteQuizzeMutation,useQuizzeAddMutation,useQuizzeEditMutation} = quizzes;