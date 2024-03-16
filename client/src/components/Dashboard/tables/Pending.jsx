import React, { useState } from "react";
import CheckCertificate from "../CheckCertificate";
import TableLayout from "./tableLayout";
import ModalLayout from "../../modal/modalLayout";

function Pending({ isOpen, handleOpen, certificateData = [] }) {
  const [openCheckCertificate, setOpenCheckCertificate] = useState(false);
  const handleOpenCheckCertificate = () =>
    setOpenCheckCertificate(!openCheckCertificate);
  console.log(certificateData);

  const [data, setData] = useState();

  return (
    <ModalLayout isOpen={isOpen} handleOpen={handleOpen} header={null}>
      <CheckCertificate
        isOpen={openCheckCertificate}
        handleOpen={handleOpenCheckCertificate}
        data={data}
      />
      <TableLayout
        header={[
          "Sl No",
          "Reg No",
          "Student Name",
          "Certificate Name",
          "Activity Point",
          "Status",
          "Action",
        ]}
      >
        {certificateData.map((student, studentIndex) =>
          student.certificates.map((item, certificateIndex) => (
            <tr
              key={certificateIndex}
              className="odd:bg-white even:bg-[#F7F6FE] "
            >
              <td className="px-5 py-2 text-center">{certificateIndex + 1}</td>
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
      </TableLayout>
    </ModalLayout>
  );
}

export default Pending;
