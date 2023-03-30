import React from 'react'
import AdminNav from '../../components/AdminNav'
import AssMarkList from "../../components/admin/assignmentmark/AssMarkList";

export default function AssignmentMark() {
  return (
<>
<AdminNav/>
    <section className="py-6 bg-primary">
      <AssMarkList />
    </section>
</>
)
}