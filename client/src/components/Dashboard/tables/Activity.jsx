import React, { useState } from "react";
import {Option, Select } from "@material-tailwind/react";
import Table4 from "./Table4";
import api from "../../api/Instance";
import ModalLayout from "../../modal/modalLayout";

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
        const response = await api.post("yearlypoint", requestData);
        setTableData(response);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const submitForm = () => {
    handleFormSubmit({ preventDefault: () => {} });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      handleOpen={handleOpen}
      header="Activity Point Details"
    >
      <form onSubmit={handleFormSubmit}>
        <Select
          variant="outlined"
          label="Select Year"
          onChange={(value) => setYear(value)}
        >
          <Option value="2022" onClick={submitForm}>
            22-23
          </Option>
          <Option value="2023" onClick={submitForm}>
            23-24
          </Option>
          <Option value="2024" onClick={submitForm}>
            24-25
          </Option>
          <Option value="2025" onClick={submitForm}>
            25-26
          </Option>
        </Select>
        <Table4 data={tableData} />
      </form>
    </ModalLayout>
  );
}

export default Activity;
