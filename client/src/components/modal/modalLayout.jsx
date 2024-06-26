import React from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import close from "../../assets/icons/close.svg";

export default function ModalLayout({
  header,
  children,
  isOpen,
  handleOpen,
  size,
}) {
  return (
    <Dialog
      open={isOpen}
      size={size}
      handler={handleOpen}
      className="px-3 py-2 w-full h-screen"
    >
      <DialogHeader className="center justify-between w-full pb-1 pt-3 ">
        <h1 className="text-2xl font-semibold text-black font-montserrat">
          {header}
        </h1>
        <IconButton color="gray" size="md" variant="text" onClick={handleOpen}>
          <img src={close} />
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-full overflow-y-scroll">{children}</DialogBody>
    </Dialog>
  );
}
