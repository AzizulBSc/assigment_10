import React from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import VideoLoading from './VideoLoading';
import Video from './Video';

export default function Videos(props) {
    const { data, isLoading, isError, error } = useGetVideosQuery();
    let content = "";
    if (isLoading) {
        content = <VideoLoading/>;
    }
    else if (data && !isError && !isLoading) {
        content =  data.map((video) => (
            <Video key={video.id} video={video} setPlayingId={props.setPlayingId} playingId={props.playingId} />
          ))
      }
    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

            
            {content}

        </div>
    )
}
