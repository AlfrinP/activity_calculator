import React from "react";
import CheckCertificate from "../CheckCertificate";
import { Dialog } from "@material-tailwind/react";

function Pending({ isOpen, handleOpen, studentData=[] }) {
  const [openCheckCertificate, setOpenCheckCertificate] = React.useState(false);
  const handleOpenCheckCertificate = () =>
    setOpenCheckCertificate(!openCheckCertificate);

  const data = [
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Aalap",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Abhishek",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Adithya",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
      approval: "Processing",
    },
    {
      no: "01",
      regno: "CCE22CS001",
      name: "Agna",
      point: "15",
      approval: "Processing",
    },
  ];
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
      <CheckCertificate
        isOpen={openCheckCertificate}
        handleOpen={handleOpenCheckCertificate}
      />
      <table className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-black uppercase bg-gray-5 border-b text-sm">
          <tr>
            <th scope="col" className="px-5 py-3 text-center">
              SI.No
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Reg.no
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Student Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Total Activity Point
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Approval
            </th>
            <th scope="col" className="px-5 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {studentData.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-[#F7F6FE] ">
              <td className="px-5 py-2 text-center">{item.no}</td>
              <td className="px-5 py-2 text-center">{item.regno}</td>
              <td className="px-5 py-2 text-center">{item.name}</td>
              <td className="px-5 py-2 text-center">{item.point}</td>
              <td className="px-5 py-2 center">
                <div className="p-2 px-3 w-fit rounded-full text-center font-semibold text-[#CD6200] bg-[#FEF2E5]">
                  {item.}
                </div>
              </td>
              <td className="px-5 py-2 text-center text-[#512B81] hover:underline cursor-pointer">
                <a onClick={handleOpenCheckCertificate} href="#">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Dialog>
  );
}

export default Pending;
