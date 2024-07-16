import React, { useMemo, useState } from "react";
import mockdata from "./MOCK_DATA.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { columns } from "./columns";
import EditRowModal from "./EditRowModal";
import AddROW from "./AddROW";

const BasicTable = () => {
  const [updatedData, setUpdatedData] = useState(mockdata);
  const data = useMemo(() => updatedData, [updatedData]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const handleDelete = (row) => {
    const newData = data.filter((item) => item.id !== row.original.id);
    setUpdatedData(newData);
  };
  const tableColumns = columns({}, handleDelete);
  const table = useReactTable({
    data,
    columns: tableColumns,
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
        pageSize: 10, //custom default page size
      },
    },
  });

  const handleAddRow = (newRow) => {
    setUpdatedData((prev) => [
      ...prev,
      { ...newRow, id: updatedData.length + 1 },
    ]);
  };
  return (
    <div className="w3-container">
      {editingRow && (
        <EditRowModal
          row={editingRow}
          onSave={handleSave}
          onClose={() => setEditingRow(null)}
        />
      )}

      <input
        type="text"
        value={filtering || ""}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Global search..."
      />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w3-light-grey">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          First Page
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next Page
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {" "}
          Previous Page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last Page
        </button>
      </div>
      <AddROW handleAddRow={handleAddRow} />
    </div>
  );
};

export default BasicTable;
