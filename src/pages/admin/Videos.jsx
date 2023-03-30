import React from 'react';
import AdminNav from '../../components/AdminNav';
import VideosList from "../../components/admin/videos/VideosList";
export default function Videos() {
    return (
        <>

            <AdminNav />
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <div className="w-full flex">
                            <button className="btn ml-auto">Add Video</button>
                        </div>
                        <VideosList/>
                    </div>
                </div>
            </section>
        </>

    )
}
