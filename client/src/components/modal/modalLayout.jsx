import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import close from "../../assets/icons/close.svg";

export default function ModalLayout({ header, children, isOpen, handleOpen,size }) {
  return (
    <Dialog open={isOpen} size="lg" handler={handleOpen} className="px-3 py-2 w-full">
      <DialogHeader className="center justify-between w-full pb-1 pt-3 ">
        <h1 className="text-2xl font-semibold text-black font-montserrat">{header}</h1>
        <div
          className="hover:bg-blue-gray-50 cursor-pointer rounded-full object-contain p-1"
          onClick={handleOpen}
        >
          <img src={close} />
        </div>
      </DialogHeader>
      <DialogBody className="h-fit">{children}</DialogBody>
    </Dialog>
  );
}
