import React from 'react';
import AssMarkItem from "./AssMarkItem";
import { useGetMarksQuery } from '../../../features/marks/marksApi';
function AssMarkList() {
    const {data,isLoading, isError, error} = useGetMarksQuery();
    console.log(data);
    console.log("marks");
    // console.log(data.marks);
    console.log(error);
    return (
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <ul className="assignment-status">
                    <li>Total <span>4</span></li>
                    <li>Pending <span>3</span></li>
                    <li>Mark Sent <span>1</span></li>
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
                        {data?.map((mark)=>(
                             <AssMarkItem key={mark.id} mark={mark}/>
                            ))}
                        <tr>
                            <td className="table-td">test testAssignment 1 - Scoreboard Application </td>
                            <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                            <td className="table-td">Saad Hasan</td>
                            <td className="table-td">https://github.com/Learn-with-Sumit/assignment-1</td>
                            <td className="table-td">100</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AssMarkList;