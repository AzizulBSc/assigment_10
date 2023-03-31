import { apiSlice } from "../api/apiSlice";
export const videosApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getVideos:builder.query({
            query:()=>"/videos",
            // providesTags:["Videos"],
        }),
        deleteVideo:builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags:["Videos"]
           
        }),
    }),
});
export const {useGetVideosQuery,useDeleteVideoMutation} = videosApi;

  
  