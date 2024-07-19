import React, { useMemo, useState } from "react";
import mockdata from "./MOCK_DATA.json";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { CiSearch } from "react-icons/ci";
import { getColumns } from "./columns";
import EditRowModal from "./EditRowModal";
import AddROW from "./AddROW";
import Pagination from "./Pagination";

const BasicTable = () => {
  const [data, setData] = useState(mockdata);
  // const data = useMemo(() => updatedData, [updatedData]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const columns = useMemo(
    () => getColumns(editingRowIndex, setEditingRowIndex, data, setData),
    [editingRowIndex, data]
  );

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting: sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 9, //custom default page size
      },
    },
  });

  const handleAddRow = (newRow) => {
    setData((prev) => [...prev, { ...newRow, id: data.length + 1 }]);
  };
  const headerGroups = table.getHeaderGroups();

  console.log(headerGroups);
  return (
    <div className="">
      <div className="  flex flex-row place-content-between mx-16 mb-2">
        <AddROW handleAddRow={handleAddRow} />
        <div className=" relative">
          <CiSearch
            fontSize={20}
            className=" text-gray-400 absolute items-center  top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            value={filtering || ""}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Global search..."
            className=" text-sm   focus:outline-none active:outline-none h-10 w-[10rem] border  border-gray-400 rounded-md  pl-10 pr-4 py-2   "
          />
        </div>
      </div>

      <table className=" w-full table-auto border border-solid  ">
        <thead className=" ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className={` p-4 bg-gray-100
                   ${
                     header.column.id === "nameGroup"
                       ? " pl-[8rem] text-left"
                       : "text-left"
                   }`}
                >
                  {header.isPlaceholder ? null : (
                    <div className="">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border  border-gray-300 h-[40px] align-bottom  text-left ]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=" px-4 font-roboto">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pagination table={table} />
      </div>
    </div>
  );
};

export default BasicTable;
