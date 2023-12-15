import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import Certificate from "../../assets/General/certificate.png";
import Download from "../../assets/General/material-symbols_download.png";
import Print from "../Dashboard/Print";

const Downloaddetail = ({ isOpen, handleOpen }) => {
  const [openPrint, setOpenPrint] = React.useState(false);
  const handleOpenPrint = () => setOpenPrint(!openPrint);
  const data = [
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
    {
      name: "GTA Sand Shore",
      cat: "Hackathon",
      level: "District",
      date: "DD/MM/YY",
    },
  ];

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
        <div className="flex flex-col  w-full justify-center gap-3 border-t border-black">
          <Print isOpen={openPrint} handleOpen={handleOpenPrint} />
          <div className="flex items-center justify-center flex-wrap gap-10 mt-6">
            {data.map((item, index) => (
              <div key={index} className="flex flex-row box3 rounded-lg p-4">
                <div className="flex flex-col">
                  <h3 className="ml-4 font-semibold text-xl">Uploaded Details</h3>
                  <img
                    src={Certificate}
                    alt="certificate"
                    className="w-96"
                    onClick={handleOpenPrint}
                  />
                </div>
                <ul className="flex flex-col mt-12">
                  <li className="flex flex-col">
                    <h3>Activity Name</h3>
                    <h4 className="font-bold text-black text-xl">
                      {item.name}
                    </h4>
                  </li>
                  <li className="flex flex-col">
                    <h3>Category</h3>
                    <h4 className="font-bold text-black text-xl">{item.cat}</h4>
                  </li>
                  <li className="flex flex-col">
                    <h3>Level</h3>
                    <h4 className="font-bold text-black text-xl">{item.level}</h4>
                  </li>
                  <li className="flex flex-col">
                    <h3>Date</h3>
                    <h4 className="font-bold text-black text-xl">{item.date}</h4>
                  </li>
                  <Button
                    onClick={handleOpenPrint}
                    className="flex flex-row bg-green-100 w-fit p-1 px-4 rounded-md text-lowercase capitalize mt-10 ml-14"
                    style={{ color: "#076F2C" }}
                  >
                    <img src={Download} alt="download" className=" w-[19px]" />
                    Download
                  </Button>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default Downloaddetail;
