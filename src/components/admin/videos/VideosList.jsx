import React from 'react';
import {useGetVideosQuery} from "../../../features/videos/videosApi";
import VideoItem from "./VideoItem";
function VideosList() {
    const {data,isLoading, isError, error} = useGetVideosQuery();

    return (

        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                {data?.map((video)=>(
                    <VideoItem key={video.id} video={video}/>
                ))}
                </tbody>
            </table>

        </div>
    );
}

export default VideosList;