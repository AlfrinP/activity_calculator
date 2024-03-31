import React, { useState } from "react";
import Download from "../../../assets/General/material-symbols_download.png";
import { Dialog, Button, Select, Option } from "@material-tailwind/react";
import api from "../../api/Instance";
import { saveAs } from "file-saver";
import { Spinner } from "@material-tailwind/react";
import TableLayout from "./tableLayout";
import ModalLayout from "../../modal/modalLayout";

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
    <ModalLayout isOpen={isOpen} handleOpen={handleOpen} header={"Batch Report Details"}>
      <TableLayout
        header={["No", "Reg No", "Student Name", "Total Activity Point"]}
      >
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
      </TableLayout>
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
    </ModalLayout>
  );
}

export default BatchReport;
