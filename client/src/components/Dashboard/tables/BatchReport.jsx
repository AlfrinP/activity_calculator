import React, { useState } from "react";
import Download from "../../../assets/General/material-symbols_download.png";
import { Dialog, Button, Select, Option } from "@material-tailwind/react";
import api from "../../api/Instance";
import { saveAs } from "file-saver";
import { Spinner } from "@material-tailwind/react";

function BatchReport({ isOpen, handleOpen, data }) {
  const [year, setYear] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = () => {
    setLoader(true);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await api.post(`/generatexl/${year}`);
      console.log(response.file);
      const excelFile = response.file;
      saveAs(excelFile);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  return (
    <Dialog
      size="lg"
      open={isOpen}
      handler={handleOpen}
      className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-[400px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-5 h-5 w-5 float-right mt-3"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
      <table className="w-full text-sm text-left rtl:text-right text-black ">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm ">
          <tr>
            <th scope="col" className="px-5 py-3 text-center ">
              No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Regno
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Student Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Total Activity Point
            </th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {data.students.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-[#F7F6FE] ">
              <td className="px-5 py-2 text-center font-semibold text-black">
                {index + 1}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.regno}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black">
                {item.name}
              </td>
              <td className="px-5 py-2 text-center font-semibold text-black"></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="center items-end flex-col mt-4 w-full">
        <div className="center flex-col items-start">
          <div className="center gap-3 pr-4">
            <Select variant="outlined" label="Select Year">
              <Option onClick={() => setYear(2022)}>22-23</Option>
              <Option onClick={() => setYear(2023)}>23-24</Option>
              <Option onClick={() => setYear(2024)}>24-25</Option>
              <Option onClick={() => setYear(2025)}>25-26</Option>
            </Select>
            <Button
              className={`${
                loader ? "bg-green-500 cursor-none" : "bg-green-100"
              } text-green-600 center gap-1 p-2 rounded-md capitalize`}
              style={{ color: "#076F2C" }}
              onClick={() =>
                year ? handleSubmit() : setError("Please select a year")
              }
            >
              {loader ? <Spinner /> : null}
              <img src={Download} alt="Download" className="w-[30px] pl-2" />
              <span className="mr-6">Download</span>
            </Button>
          </div>
          {error ? <div className="text-red-500 w-fit">{error}</div> : null}
        </div>
      </div>
    </Dialog>
  );
}

export default BatchReport;
