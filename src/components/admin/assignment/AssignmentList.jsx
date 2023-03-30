import React from 'react';
import {useGetAssignmentsQuery} from "../../../features/assignments/assignmentsApi";
import AssignmentItem from "./AssignmentItem";
function AssignmentList() {
    const {data,isLoading, isError, error} = useGetAssignmentsQuery();
    console.log(data);
    console.log(error);
    return (

        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                {data?.map((assignment)=>(
                    <AssignmentItem key={assignment.id} assignment={assignment}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignmentList;