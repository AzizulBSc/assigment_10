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
        videoAdd:builder.mutation({
            query:({data})=>({
                url: `/videos`,
                method: "POST",
                body:data,

            }),
        })
    }),
});
export const {useGetVideosQuery,useDeleteVideoMutation,useVideoAddMutation} = videosApi;

  
  