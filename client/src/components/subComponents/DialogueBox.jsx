import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";


function DialogueBox(props) {
  return (
    <Dialog size="xxl" open={isOpen} handler={handleOpen} className="p-4 h-screen w-full overflow-y-scroll">
      <DialogHeader>
        <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-purple-900">Details</h1>
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
      <DialogBody>
        
      </DialogBody>
    </Dialog>
  )
}

export default DialogueBox
