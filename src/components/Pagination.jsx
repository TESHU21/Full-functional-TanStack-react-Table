import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Pagination = ({ table }) => {
  const [pageInput, setPageInput] = useState("");

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
  };
  const handlePageInputSubmit = () => {
    const pageNumber = Number(pageInput) - 1;
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 0 &&
      pageNumber < table.getPageCount()
    ) {
      table.setPageIndex(pageNumber);
    }
  };
  const handlePageSelectChange = (e) => {
    const pageNumber = Number(e.target.value);
    table.setPageIndex(pageNumber);
  };

  return (
    <div className="flex flex-row place-content-between mx-10	 mt-4">
      <div>
        <div className=" flex gap-3">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className={`${
              !table.getCanPreviousPage() ? " text-gray-300" : " text-gray-600"
            }`}
          >
            <FaAngleDoubleLeft className="  font-thin " size={20} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`text-3xl ${
              !table.getCanPreviousPage() ? "text-gray-300" : " text-gray-600"
            }`}
          >
            {" "}
            <FaAngleLeft size={20} />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`text-3xl ${
              !table.getCanNextPage() ? "text-gray-300" : " text-gray-600"
            }
            `}
          >
            <FaAngleRight size={20} />
          </button>

          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={`text-3xl ${
              !table.getCanNextPage() ? "text-gray-200" : "text-gray-600"
            }`}
          >
            <FaAngleDoubleRight size={20} />
          </button>
        </div>
      </div>
      <div className=" flex flex-row align-center gap-4">
        <div className=" flex flex-row relative">
          <div className="  text-justify mt-2 mr-5">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className=" flex gap-3">
            <input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              placeholder="Page:"
              className=" text-sm   focus:outline-none active:outline-none h-10 w-[6rem] border  border-gray-400 rounded-md  pl-1 pr-4 py-2   "
            />
            <button onClick={handlePageInputSubmit}>Go</button>
          </div>
          <select
            value={table.getState().pagination.pageIndex}
            onChange={handlePageSelectChange}
            className=" text-gray-400 absolute items-right  top-1/2 -translate-y-1/2  right-2 mr-7"
          >
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
