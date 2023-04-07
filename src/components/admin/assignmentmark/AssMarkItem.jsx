import React, { useState } from "react";
import { useEditMarkMutation } from "../../../features/marks/marksApi";

function AssMarkItem(mark) {
  const {
    id,
    student_id,
    student_name,
    assignment_id,
    title,
    totalMark,
    repo_link,
    createdAt,
    status: status1,
    mark: mark1,
  } = mark.mark;
  const [editMark] = useEditMarkMutation();
  const [mark2, setMark2] = useState(mark1);

  //date formate
  const dateStr = createdAt;
  const dateObj = new Date(dateStr);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const AssMarkSubmitHandle = () => {
    editMark({
      id,
      student_id,
      student_name,
      assignment_id,
      title,
      totalMark,
      repo_link,
      status: "published",
      createdAt,
      mark: mark2,
    });

    alert("Assignment Marks Updated Successfully!!!");
    window.location.href = "/admin/assignmentmark";
  };
  // long value change to shortened
  const shortened_repo_link = repo_link?.substring(0, 10) + "..." + repo_link?.substring(repo_link.length - 10);
  const shortened_title = title?.substring(0, 20) + "....";
  return (
    <tr>
      <td className="table-td">{shortened_title}</td>
      <td className="table-td">{formattedDate}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{shortened_repo_link}</td>
      {status1 === "pending" ? (
        <td className="table-td input-mark">
          <input
            max="100"
            name="totalMark1"
            value={mark2}
            onChange={(e) => setMark2(e.target.value)}
          />
          <div onClick={AssMarkSubmitHandle}>
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
        </td>
      ) : (
        <td className="table-td">{mark1}</td>
      )}
    </tr>
  );
}

export default AssMarkItem;
