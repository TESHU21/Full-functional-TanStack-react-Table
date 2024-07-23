import React, { useState } from "react";
import { DateTime } from "luxon";
import { MdDelete, MdEdit, MdModeEditOutline } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { createColumnHelper } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
              className="border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 w-64 p-2 bg-gray-50 placeholder-gray-400 shadow-sm focus:border-blue-300 focus:outline-none transition duration-150 ease-in-out"
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
              className="border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 w-64 p-2 bg-gray-50 placeholder-gray-400 shadow-sm focus:border-blue-300 focus:outline-none transition duration-150 ease-in-out"
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
          className="border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 w-64 p-2 bg-gray-50 placeholder-gray-400 shadow-sm focus:border-blue-300 focus:outline-none transition duration-150 ease-in-out"
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
          className="border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 w-64 p-2 bg-gray-50 placeholder-gray-400 shadow-sm focus:border-blue-300 focus:outline-none transition duration-150 ease-in-out"
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              {" "}
              <MdDelete size={20} color="red" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete user
                data from table!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(row.original.id, data, setData)}
                className=" text-red-50 bg-gray-400"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];
