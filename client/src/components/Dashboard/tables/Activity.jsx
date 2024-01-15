import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import Table4 from "./Table4";
import { baseURL } from "../../Util";

function Activity({ isOpen, handleOpen, data }) {
  const [year, setYear] = useState("");
  const [tableData, setTableData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (year) {
      const requestData = {
        year: year,
        faculty_id: data.ID,
      };

      try {
        const response = await axios.post(
          `${baseURL}yearlypoint`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setTableData(response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

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
      <form onSubmit={handleFormSubmit}>
        <DialogBody className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full border-t border-gray-600">
          <h1 className="text-black mb-2">Select Year</h1>
          <Select
            variant="outlined"
            label="Select"
            onChange={(value) => setYear(value)}
          >
            <Option value="2022">22-23</Option>
            <Option value="2023">23-24</Option>
            <Option value="2024">24-25</Option>
            <Option value="2025">25-26</Option>
          </Select>
          <Table4 data={tableData} />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </DialogBody>
      </form>
    </Dialog>
  );
}

export default Activity;
