import React, { useState } from "react";
import CheckCertificate from "../CheckCertificate";
import { Dialog } from "@material-tailwind/react";

function Pending({ isOpen, handleOpen, certificateData = [] }) {
  const [openCheckCertificate, setOpenCheckCertificate] = useState(false);
  const handleOpenCheckCertificate = () =>
    setOpenCheckCertificate(!openCheckCertificate);
  console.log(certificateData);

  const [data, setData] = useState();

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
        data={data}
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
              Certificate Name
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Activity Point
            </th>
            <th scope="col" className="px-5 py-3 text-center">
              Action
            </th>
            <th scope="col" className="px-5 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-black text-md">
          {certificateData.map((student, studentIndex) =>
            student.certificates.map((item, certificateIndex) => (
              <tr
                key={certificateIndex}
                className="odd:bg-white even:bg-[#F7F6FE] "
              >
                <td className="px-5 py-2 text-center">
                  {certificateIndex + 1}
                </td>
                <td className="px-5 py-2 text-center">{student.batch}</td>
                <td className="px-5 py-2 text-center">{student.name}</td>
                <td className="px-5 py-2 text-center">{item.name}</td>
                <td className="px-5 py-2 text-center">{item.point}</td>
                <td className="px-5 py-2 center">
                  <div className="p-2 px-3 w-fit rounded-full text-center font-semibold text-[#CD6200] bg-[#FEF2E5]">
                    {item.status}
                  </div>
                </td>
                <td className="px-5 py-2 text-center text-[#512B81] hover:underline cursor-pointer">
                  <a
                    onClick={() => {
                      setData(item);
                      handleOpenCheckCertificate();
                    }}
                    href="#"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Dialog>
  );
}

export default Pending;
