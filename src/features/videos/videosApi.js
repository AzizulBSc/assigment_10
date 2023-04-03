import { apiSlice } from "../api/apiSlice";
export const videosApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getVideos:builder.query({
            query:()=>"/videos",
            // providesTags:["Videos"],
        }),
        getVideo:builder.query({
            query:(id)=>`/videos/${id}`,
        }),
        deleteVideo:builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags:["Videos"]
           
        }),
        videoAdd:builder.mutation({
            query:(data)=>({
                url: "/videos",
                method: "POST",
                body:data,

            }),
        }),
        videoEdit:builder.mutation({
            query:(data)=>({
                url: `/videos/${data.id}`,
                method: "PATCH",
                body:data,

            }),
        })
    }),
});
export const {useGetVideosQuery,useGetVideoQuery,useDeleteVideoMutation,useVideoAddMutation,useVideoEditMutation} = videosApi;

  
  