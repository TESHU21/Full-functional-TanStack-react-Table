import React, { useState } from "react";
import { DateTime } from "luxon";
import { MdDelete, MdEdit, MdModeEditOutline } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { createColumnHelper } from "@tanstack/react-table";
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
const columnHelper = createColumnHelper();

export const getColumns = (
  editingRowIndex,
  setEditingRowIndex,
  data,
  setData
) => [
  { header: "ID", accessorKey: "id", footer: "ID" },
  columnHelper.group({
    id: "nameGroup",
    header: () => <span>Name</span>,
    columns: [
      columnHelper.accessor("first_name", {
        header: "First Name",

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
      }),
      columnHelper.accessor("last_name", {
        header: "Last Name",

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
      }),
    ],
  }),

  columnHelper.accessor("email", {
    id: "Email",
    header: "Email",

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
  }),

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
      <div className=" flex gap-3">
        {editingRowIndex === row.index ? (
          <button onClick={() => saveChanges(setEditingRowIndex)}>
            <FaSave size={20} color="blue" />{" "}
          </button>
        ) : (
          <button onClick={() => setEditingRowIndex(row.index)}>
            <MdEdit size={20} color="green" />
          </button>
        )}

        <button onClick={() => handleDelete(row.original.id, data, setData)}>
          <MdDelete size={20} color="red" />
        </button>
      </div>
    ),
  },
];
