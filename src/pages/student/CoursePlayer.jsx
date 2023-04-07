/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Player from '../../components/student/courseplayer/Player';
import Videos from '../../components/student/courseplayer/Videos';
import { useGetVideosQuery } from "../../features/videos/videosApi";

export default function CoursePlayer() {
    const {data, isLoading, isError, error} = useGetVideosQuery();
    const [playingId, setPlayingId] = useState(1);
    return (
        <>
            <Nav/>
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        <Player playingId={playingId}/>
                        <Videos setPlayingId={setPlayingId} playingId={playingId}/>
                    </div>
                </div>
            </section>
        </>
    )
}
