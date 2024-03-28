import React, { useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import Table4 from "./Table4";
import ModalLayout from "../../modal/modalLayout";

function Sorted({ isOpen, handleOpen }) {
  return (
    <ModalLayout
      isOpen={isOpen}
      handleOpen={handleOpen}
      header="Activity Point"
    >
      <Select variant="outlined" label="Select">
        <Option>Insufficient points</Option>
        <Option>Short list</Option>
      </Select>
      <Table4 />
    </ModalLayout>
  );
}

export default Sorted;
