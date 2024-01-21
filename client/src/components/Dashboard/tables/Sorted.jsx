import React, { useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import Table4 from "./Table4";

function Sorted({ isOpen, handleOpen }) {
  return (
    <Dialog open={isOpen} handler={handleOpen} className="p-4">
      <DialogHeader>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold text-purple-900">Activity Point</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 float-right"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </DialogHeader>
      <DialogBody className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full border-t border-gray-600">
        <h1 className="text-black mb-2">Select</h1>
        <Select variant="outlined" label="Select">
          <Option>Insufficient points</Option>
          <Option>Short list</Option>
        </Select>
        <Table4/>
      </DialogBody>
    </Dialog>
  );
}

export default Sorted;
