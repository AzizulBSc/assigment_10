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
        quizzeEdit:builder.mutation({
            query:(data)=>({
                url: `/quizzes/${data.id}`,
                method: "PATCH",
                body:data,

            }),
        }),
        getVideoQuizze:builder.query({
            query:(video_id)=>`/quizzes?video_id=${video_id}`,
        }),
    }),
    
});
export const {useGetQuizzesQuery,useDeleteQuizzeMutation,useQuizzeAddMutation,useQuizzeEditMutation,useGetVideoQuizzeQuery} = quizzes;