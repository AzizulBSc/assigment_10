import React from 'react';

function AssMarkItem(mark) {
    console.log(mark.mark);
    const {student_name,title,totalMark,repo_link,status,createdAt} = mark.mark;
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{createdAt}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            <td className="table-td input-mark">
                <input max="100" value="100" />
                <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                     className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5" />
                </svg>

            </td>
        </tr>
    );
}

export default AssMarkItem;