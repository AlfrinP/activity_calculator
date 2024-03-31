import { Option, Select } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Table2 from "./tables/Table2";
import ModalLayout from "../modal/modalLayout";

function ViewPointsModal({ isOpen, handleOpen, data }) {
  const [totalPoint, setTotalPoint] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    selectYear();
  }, [selectedYear]);

  const selectYear = () => {
    let total = 0;

    if (selectedYear) {
      data.filter((item) => {
        if (new Date(item.date).getFullYear() === selectedYear) {
          total += item.point;
          return true;
        }
        return false;
      });
    }

    setTotalPoint(total);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      handleOpen={handleOpen}
      header="Activity Point Details"
    >
      <div className="flex flex-row gap-20 center mb-3">
        <Select variant="outlined" label="Year">
          <Option onClick={() => setSelectedYear(2022)}>22-23</Option>
          <Option onClick={() => setSelectedYear(2023)}>23-24</Option>
          <Option onClick={() => setSelectedYear(2024)}>24-25</Option>
          <Option onClick={() => setSelectedYear(2025)}>25-26</Option>
        </Select>
        <div className="bg-purple-900 w-fit py-1 px-5 rounded-lg box">
          <p className="text-center text-white text-xs">
            Total Points {totalPoint}
          </p>
        </div>
      </div>
      <Table2 data={data} year={selectedYear} />
    </ModalLayout>
  );
}

export default ViewPointsModal;
