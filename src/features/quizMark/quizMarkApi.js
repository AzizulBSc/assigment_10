import { apiSlice } from "../api/apiSlice";
export const quizMark = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getQuizMarks:builder.query({
            query:()=>"/quizMark",
        }),
        deleteQuizMark:builder.mutation({
            query: (id) => ({
                url: `/quizMark/${id}`,
                method: "DELETE",
            }),
        }),
        addQuizMark:builder.mutation({
            query:(data)=>({
                url: "/quizMark",
                method: "POST",
                body:data,

            }),
        }),
        searchQuizMark:builder.query({
            query:(data)=>`/quizMark?student_id=${data.student_id}&&video_id=${data.video_id}`,
        }),
    }),

});
export const {useAddQuizMarkMutation,useDeleteQuizMarkMutation,useGetQuizMarksQuery,useSearchQuizMarkQuery} = quizMark;