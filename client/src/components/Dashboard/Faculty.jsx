import React, { useEffect, useState } from "react";
import facultyImage from "../../assets/Dashboard/Faculty/faculty.png";
import short from "../../assets/General/short.png";
import arrowDown from "../../assets/General/arrow_down.svg";
import TableFaculty from "./tables/TableFaculty";
import BatchReport from "./tables/BatchReport";
import Activity from "./tables/Activity";
import Shortlist from "./tables/Shortlist";
import Sorted from "./tables/Sorted";
import Pending from "./tables/Pending";
import api from "../api/Instance";
import Loader from "../subComponents/Loader";
import Layout from "./Layout";

function Faculty() {
  const [openBatch, setOpenBatch] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const handleOpenBatch = () => setOpenBatch(!openBatch);

  const [openActivity, setOpenActivity] = useState(false);
  const handleOpenActivity = () => setOpenActivity(!openActivity);

  const [openShort, setOpenShort] = useState(false);

  const handleOpenShort = () => {
    setOpenShort(!openShort);
    setReloadData(!reloadData);
  };

  const [openPending, setOpenPending] = useState(false);
  const handleOpenPending = () => setOpenPending(!openPending);

  const [openSorted, setOpenSorted] = useState(false);
  const handleOpenSorted = () => setOpenSorted(!openSorted);

  const [facultyData, setFacultyData] = useState();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("dashboard/");
        setFacultyData(response.faculty);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        console.log(facultyData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reloadData]);

  let totalStudents = facultyData?.students?.length || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Layout>
          <BatchReport
            isOpen={openBatch}
            handleOpen={handleOpenBatch}
            data={facultyData}
          />
          <Activity
            isOpen={openActivity}
            handleOpen={handleOpenActivity}
            data={facultyData}
          />
          <Shortlist
            isOpen={openShort}
            batch={facultyData?.batch}
            department={facultyData?.department}
            handleOpen={handleOpenShort}
          />
          <Pending
            isOpen={openPending}
            handleOpen={handleOpenPending}
            certificateData={facultyData?.students}
          />
          <Sorted isOpen={openSorted} handleOpen={handleOpenSorted} />
          <div className="w-full center flex-col gap-5 px-[100px] md:px-[200px]  ">
            <div className="w-full flex gap-10 ">
              <div className="ring-offset-8 ring-2 ring-[#512B81] rounded-full w-32">
                <img src={facultyImage} className="rounded-full" />
              </div>
              <div className="center flex-col gap-3 items-start">
                <div className="dashicon flex-row text-lg">
                  <span className="font-normal text-[#512B81]">
                    Faculty Name :
                  </span>
                  <span className="text-xl font-semibold text-black">
                    {facultyData?.name}
                  </span>
                </div>
                <div className=" text-lg border-2 border-[#512B81] dashicon flex-row">
                  <span className="font-light text-[#512B81] ">
                    Department -
                  </span>
                  <span className="font-semibold text-black text-xl">
                    {facultyData.department || ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="font-bold text-lg text-start w-full">
              Batch info
            </div>
            <div className="w-full center flex-wrap xl:justify-between gap-10">
              <div className="center flex-col w-fit gap-2 p-5 rounded-lg border-t border-solid border-gray-300 border-opacity-82 bg-white shadow-md shadow-offset-x-11 shadow-offset-y-24 shadow-blur-26 shadow-opacity-20">
                <div className="center w-full gap-2 justify-evenly">
                  <div className=" bg-[#512B81] flex-row dashicon ">
                    <span className="font-light ">Batch :</span>
                    <span className="font-semibold">{facultyData?.batch}</span>
                  </div>
                  <div className="dashicon flex-row border-2 border-[#512B81]">
                    <span className="font-light text-[#512B81] ">Branch :</span>
                    <span className="font-semibold text-black">
                      {facultyData.department || ""}
                    </span>
                  </div>
                </div>
                <div className="center w-full gap-2 justify-evenly">
                  <div className=" dashicon flex-row bg-[#512B81]">
                    <span className="font-light">Semester :</span>
                    <span className="font-semibold">4</span>
                  </div>
                  <div className=" dashicon flex-row border-2 border-[#512B81]">
                    <span className="font-light text-[#512B81] ">
                      Number of Students :
                    </span>
                    <span className="font-semibold text-black">
                      {totalStudents}
                    </span>
                  </div>
                </div>
              </div>
              <div className="center flex-col w-fit gap-2 p-5 rounded-lg border-t border-solid border-gray-300 border-opacity-82 bg-white shadow-md shadow-offset-x-11 shadow-offset-y-24 shadow-blur-26 shadow-opacity-20">
                <div className="center gap-3 ">
                  <button onClick={handleOpenShort} className="bg-[#512B81]">
                    <span className=" text-white">Add Shortlist</span>
                    <img src={short} width={30} />
                  </button>
                  <button
                    onClick={handleOpenBatch}
                    className="border-solid border-2 border-[#512B81] text-black"
                  >
                    <img src={arrowDown} width={15} />
                    <span>Download Batch Report</span>
                  </button>
                </div>
                <div className="center w-full gap-3 justify-around">
                  <button onClick={handleOpenPending} className="bg-[#512B81]">
                    <span className="font-semibold">Pending</span>
                  </button>
                  <button onClick={handleOpenActivity} className="bg-[#512B81]">
                    <span className="font-semibold">Activity Point</span>
                  </button>
                  <button
                    onClick={handleOpenSorted}
                    className="border-purple-900 border-2 text-black"
                  >
                    <span>View sorted list</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="font-bold text-lg w-full text-start">
              Batch Report
            </div>
            <div className="w-full center shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black rounded-lg">
              {facultyData.students ? (
                <TableFaculty data={facultyData.students} />
              ) : null}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}

export default Faculty;
