import React, { useEffect, useState } from "react";
import sprofile from "../../assets/Dashboard/Student/profile.png";
import upload from "../../assets/icons/upload.svg";
import level from "../../assets/icons/level.svg";
import CertificateTable from "./tables/CertificateTable";
import FileUploadModel from "./FileUploadModal";
import ViewPointsModal from "./ViewPointsModal";
import PopMessage from "./PopMessage";
import api from "../api/Instance";
import Loader from "../subComponents/Loader";
import Layout from "./Layout";
import { Avatar, Button } from "@material-tailwind/react";

export default function Student() {
  const [openFileModal, setOpenFileModal] = useState(false);
  const [openViewPoints, setOpenViewPoints] = useState(false);

  const handleOpenFileModal = () => setOpenFileModal(!openFileModal);
  const handleOpenViewPoints = () => setOpenViewPoints(!openViewPoints);

  const [studentData, setStudentData] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [dataReloading, setDataReloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("dashboard/");
        setStudentData(response.student);
        setTimeout(() => {
          setLoading(false);
        }, "1000");
        console.log(response.student);
      } catch (e) {
        setLoading(true);
      }
    };
    fetchData();
  }, [dataReloading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <FileUploadModel
            isOpen={openFileModal}
            handleOpen={() => {
              handleOpenFileModal();
              setDataReloading(true);
            }}
          />

          <ViewPointsModal
            isOpen={openViewPoints}
            handleOpen={handleOpenViewPoints}
            data={studentData?.certificates ?? []}
          />

          <>
            <div className="w-full h-fit center gap-5">
              <Avatar
                src={sprofile}
                alt="avatar"
                withBorder={true}
                color="#512B81"
                className="p-1.5 w-44 block h-44"
              />
              <div className="w-full center justify-around gap-2">
                <div className="center flex-col gap-3 items-start col-span-2 w-fit">
                  <div className="dashicon">
                    <span className="font-normal text-[#512B81]">
                      Student Name
                    </span>
                    <span className="text-lg font-semibold text-black">
                      {studentData.name}
                    </span>
                  </div>
                  <div className="center justify-start w-full gap-1">
                    <div className=" bg-[#512B81] dashicon">
                      <span className="font-light">Register No:</span>
                      <span className="font-semibold">
                        {studentData.regno?.toUpperCase()}
                      </span>
                    </div>
                    <div className="outline outline-2 outline-offset-[-2px] outline-[#512B81] dashicon">
                      <span className="font-light text-[#512B81] ">
                        Branch :
                      </span>
                      <span className="font-semibold text-black">
                        {studentData.department}
                      </span>
                    </div>
                  </div>
                  <div className="center gap-2">
                    <span className="text-[#512B81]">Semester</span>
                    <span className="text-2xl text-[#512B81]">4</span>
                  </div>
                </div>
                <div className="center flex-col gap-3 ">
                  <Button
                    className="bg-[#512B81] w-full center gap-2"
                    ripple={false}
                    onClick={handleOpenFileModal}
                  >
                    <img src={upload} alt="Upload Icon" />
                    <span className="text-white">Upload Certificate</span>
                  </Button>
                  {/* <ContainedInputs/> */}
                  <Button
                    className="bg-[#512B81] w-full center gap-2"
                    ripple={false}
                    onClick={handleOpenViewPoints}
                  >
                    <img src={level} alt="Graph Icon" className="rotate-90" />
                    <span className=" text-white">View Points</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full h-full overflow-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black rounded-lg">
              <CertificateTable
                data={
                  studentData.certificates?.length === 0
                    ? null
                    : studentData.certificates
                }
              />
            </div>
          </>
          <div className="flex items-start w-fit absolute bottom-2 left-10 ">
            <PopMessage
              data={
                studentData.certificates?.length === 0
                  ? null
                  : studentData.certificates
              }
              faculty={studentData.faculty_name}
            />
          </div>
        </Layout>
      )}
    </>
  );
}
