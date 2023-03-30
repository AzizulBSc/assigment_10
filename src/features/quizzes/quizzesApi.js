import { apiSlice } from "../api/apiSlice";
export const quizzes = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getQuizzes:builder.query({
            query:()=>"/quizzes",
        }),
    }),
});
export const {useGetQuizzesQuery} = quizzes;