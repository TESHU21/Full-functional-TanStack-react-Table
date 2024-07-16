import React, { useState } from "react";
import { DateTime } from "luxon";
const handleInputChange = (e, rowIndex, field, data, setData) => {
  const newData = [...data];
  newData[rowIndex][field] = e.target.value;
  setData(newData);
};
const saveChanges = (setEditingRowIndex) => {
  setEditingRowIndex(null);
};
const handleDelete = (id, data, setData) => {
  // const newData = data.filter((item) => item.row.index !== rowIndex);
  const newData = data.filter((item) => item.id !== id);
  setData(newData);
};

export const getColumns = (
  editingRowIndex,
  setEditingRowIndex,
  data,
  setData
) => [
  { header: "ID", accessorKey: "id", footer: "ID" },
  {
    header: "Name",
    columns: [
      {
        header: "First Name",
        accessorKey: "first_name",
        footer: "First Name",
        cell: ({ row, getValue }) =>
          editingRowIndex === row.index ? (
            <input
              value={row.original.first_name}
              onChange={(e) =>
                handleInputChange(e, row.index, "first_name", data, setData)
              }
            />
          ) : (
            getValue()
          ),
      },
      {
        header: "Last Name",
        accessorKey: "last_name",
        footer: "Last Name",
        cell: ({ row, getValue }) =>
          editingRowIndex === row.index ? (
            <input
              value={row.original.last_name}
              onChange={(e) =>
                handleInputChange(e, row.index, "last_name", data, setData)
              }
            />
          ) : (
            getValue()
          ),
      },
    ],
  },
  {
    header: "Email",
    accessorKey: "email",
    footer: "Email",
    cell: ({ row, getValue }) =>
      editingRowIndex === row.index ? (
        <input
          value={row.original.email}
          onChange={(e) =>
            handleInputChange(e, row.index, "email", data, setData)
          }
        />
      ) : (
        getValue()
      ),
  },

  {
    header: "Date of Birth",
    accessorKey: "dob",
    footer: "Date of Birth",
    cell: ({ row, getValue }) =>
      editingRowIndex === row.index ? (
        <input
          type="date"
          value={DateTime.fromISO(row.original.dob).toLocaleString(
            DateTime.DATE_MED
          )}
          onChange={(e) =>
            handleInputChange(e, row.index, "dob", data, setData)
          }
        />
      ) : (
        DateTime.fromISO(row.original.dob).toLocaleString(DateTime.DATE_MED)
      ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div>
        {editingRowIndex === row.index ? (
          <button onClick={() => saveChanges(setEditingRowIndex)}>Save</button>
        ) : (
          <button onClick={() => setEditingRowIndex(row.index)}>Edit</button>
        )}

        <button onClick={() => handleDelete(row.original.id, data, setData)}>
          Delete
        </button>
      </div>
    ),
  },
];
