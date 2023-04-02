import React, { useState } from 'react';
import { useGetMarksQuery } from '../../../features/marks/marksApi';
import AssMarkItem from "./AssMarkItem";
function AssMarkList() {
    const { data, isLoading, isError, error } = useGetMarksQuery();
    let counter = 0;
    for (let key in data) {
        if (data[key].status === "pending") {
            counter++;
        }
    }
    const pending = counter;
    const total = data?.length;
    const sent = total - Number(pending);
    return (
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <ul className="assignment-status">
                    <li>Total <span>{total}</span></li>
                    <li>Pending <span>{pending}</span></li>
                    <li>Mark Sent <span>{sent}</span></li>
                </ul>
                <div className="overflow-x-auto mt-4">
                    <table className="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th className="table-th">Assignment</th>
                                <th className="table-th">Date</th>
                                <th className="table-th">Student Name</th>
                                <th className="table-th">Repo Link</th>
                                <th className="table-th">Mark</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-600/50">
                            {data?.map((mark) => (
                                <AssMarkItem key={mark.id} mark={mark} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AssMarkList;