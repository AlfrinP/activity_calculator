import React, { useEffect, useState } from "react";
import sprofile from "../../assets/Dashboard/Student/profile.png";
import upload from "../../assets/General/file-upload.png";
import graph from "../../assets/General/graph.png";
import Table from "./tables/Table";
import Navbar from "../Navbar";
import FileUploadModel from "./FileUploadModal";
import ViewPointsModal from "./ViewPointsModal";
import PopMessage from "./PopMessage";
import api from "../api/Instance";
import Loader from "../subComponents/Loader";
import Layout from "./Layout";

export default function Student() {
  const [openFileModal, setOpenFileModal] = React.useState(false);
  const [openViewPoints, setOpenViewPoints] = React.useState(false);

  const handleOpenFileModal = () => setOpenFileModal(!openFileModal);
  const handleOpenViewPoints = () => setOpenViewPoints(!openViewPoints);

  const [studentData, setStudentData] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("dashboard/");
        setStudentData(response.student);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <FileUploadModel
            isOpen={openFileModal}
            handleOpen={handleOpenFileModal}
          />
          <ViewPointsModal
            isOpen={openViewPoints}
            handleOpen={handleOpenViewPoints}
            data={
              studentData.certificates?.length === 0
                ? null
                : studentData.certificates
            }
          />

          <div className="w-full relative center flex-col justify-between h-full gap-5 px-[100px] md:px-[200px]  ">
            <div className="w-full center gap-5">
              <div className="ring-offset-8 ring-2 ring-[#512B81] rounded-full w-32 ">
                <img
                  src={sprofile}
                  className="rounded-full "
                  alt="Student Profile"
                />
              </div>
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
                        {studentData.reg_no?.toUpperCase()}
                      </span>
                    </div>
                    <div className=" border-2 border-[#512B81] dashicon">
                      <span className="font-light text-[#512B81] ">
                        Branch :
                      </span>
                      <span className="font-semibold text-black text-lg">
                        {studentData.department || ""}
                      </span>
                    </div>
                  </div>
                  <div className="center gap-2">
                    <span className="text-[#512B81]">Semester</span>
                    <span className="text-2xl text-[#512B81]">4</span>
                  </div>
                </div>
                <div className="center flex-col gap-3 w-fit">
                  <button
                    className="bg-[#512B81]"
                    onClick={handleOpenFileModal}
                  >
                    <img src={upload} width={30} alt="Upload Icon" />
                    <span className=" text-white">Upload Certificate</span>
                  </button>
                  <button
                    className="bg-[#512B81]"
                    onClick={handleOpenViewPoints}
                  >
                    <img src={graph} width={20} alt="Graph Icon" />
                    <span className=" text-white">View Points</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full center shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black rounded-lg">
              <Table
                data={
                  studentData.certificates?.length === 0
                    ? null
                    : studentData.certificates
                }
              />
            </div>
            
          </div>
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
