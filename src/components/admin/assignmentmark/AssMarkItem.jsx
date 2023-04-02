import React, { useState } from "react";
import { useEditMarkMutation } from "../../../features/marks/marksApi";

function AssMarkItem(mark) {
    const {id,
        student_id,
        student_name,
        assignment_id,
        title,
        totalMark,
        repo_link,
        createdAt,
        status:status1,
        mark: mark1,
    } = mark.mark;
const [editMark] = useEditMarkMutation();
    const [mark2, setMark2] = useState(mark1);

const AssMarkSubmitHandle = ()=>{
    editMark({id,student_id,student_name,assignment_id,title,totalMark,repo_link,status:'published',createdAt,mark:mark2});
    
    alert("Assignment Marks Updated Successfully!!!");
    window.location.href = "/admin/assignment/mark";
}

    let marktdcontent = "";
    if (status1 === "pending") {
        marktdcontent = (
            <td className="table-td input-mark">
                {/* <form onSubmit={AssMarkSubmitHandle}> */}
                <input
                    max="100"
                    name="totalMark1"
                    value={mark2}
                    onChange={(e) => setMark2(e.target.value)}
                />
                <div onClick={AssMarkSubmitHandle} >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
                </div>
                {/* </form> */}
            </td>
        );
    } else {
        marktdcontent = <td className="table-td">{mark1}</td>;
    }
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {marktdcontent}
        </tr>
    );
}

export default AssMarkItem;
