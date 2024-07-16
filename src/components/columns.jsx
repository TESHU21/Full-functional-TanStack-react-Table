import React from "react";
import { DateTime } from "luxon";
const [editingRowIndex, setEditingRowIndex] = useState(null);

export const columns = (handleEdit, handleDelete) => [
  { header: "ID", accessorKey: "id", footer: "ID" },
  // {
  //   header: "Name",

  //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  //   footer: "Name",
  // },

  {
    header: "Name",
    columns: [
      {
        header: "First Name",
        accessorKey: "first_name",
        footer: "First Name",
      },
      { header: "Last Name", accessorKey: "last_name", footer: "Last Name" },
    ],
  },
  { header: "Email", accessorKey: "email", footer: "Email" },

  {
    header: "Date of Birth",
    accessorKey: "dob",
    footer: "Date of Birth",
    cell: (info) => {
      return DateTime.fromISO(info.getValue()).toLocaleString(
        DateTime.DATE_MED
      );
    },
  },
  {
    header: "Actions",
    cell: (info) => (
      <div>
        <button onClick={() => handleEdit(info.row)}>Edit</button>
        <button onClick={() => handleDelete(info.row)}>Delete</button>
      </div>
    ),
  },
];
