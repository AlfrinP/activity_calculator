import React, { useEffect, useState } from "react";
import facultyImage from "../../assets/Dashboard/Faculty/faculty.png";
import user from "../../assets/icons/user-plus.svg";
import download from "../../assets/icons/download.svg";
import TableFaculty from "./tables/TableFaculty";
import BatchReport from "./tables/BatchReport";
import list from "../../assets/icons/list.svg";
import Shortlist from "./tables/Shortlist";
import Sorted from "./tables/Sorted";
import Pending from "./tables/Pending";
import pending from "../../assets/icons/pending.svg";
import api from "../api/Instance";
import Loader from "../subComponents/Loader";
import Layout from "./Layout";
import { Button } from "@material-tailwind/react";

function Faculty() {
  const [openBatch, setOpenBatch] = useState(false);
  const [openShort, setOpenShort] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [openPending, setOpenPending] = useState(false);
  const [openSorted, setOpenSorted] = useState(false);
  const [facultyData, setFacultyData] = useState();
  const [isLoading, setLoading] = useState(true);

  const handleOpenBatch = () => setOpenBatch(!openBatch);
  const handleOpenShort = () => {
    setOpenShort(!openShort);
    setReloadData(!reloadData);
  };
  const handleOpenPending = () => {
    setOpenPending(!openPending);
    setReloadData(!reloadData);
  };
  const handleOpenSorted = () => setOpenSorted(!openSorted);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("dashboard/");
        setFacultyData(response.faculty);
        setTimeout(() => {
          setLoading(false);
        }, "1000");
        console.log(response.faculty);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(true);
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
          <div className="w-full flex gap-10 overflow-x ">
            <div className="ring-offset-8 ring-2 ring-[#512B81] rounded-full w-32">
              <img src={facultyImage} className="rounded-full" />
            </div>
            <div className="center flex-col gap-3 items-start">
              <div className="dashicon flex-row text-xl">
                <span className="font-normal text-[#512B81]">
                  Faculty Name :
                </span>
                <span className="text-xl font-semibold text-black">
                  {facultyData?.name}
                </span>
              </div>
              <div className=" text-lg border-2 border-[#512B81] dashicon flex-row px-6 py-3 ">
                <span className="font-normal text-[#512B81] ">Department -</span>
                <span className="font-semibold text-black text-xl">
                  {facultyData?.department}
                </span>
              </div>
            </div>
          </div>
          <div className="font-bold text-lg text-start w-full">Batch info</div>
          <div className="w-full center flex-wrap xl:justify-between gap-10">
            <div className="center flex-col w-fit gap-2 p-5 rounded-lg border-t border-solid border-gray-300 border-opacity-82 bg-white shadow-md shadow-offset-x-11 shadow-offset-y-24 shadow-blur-26 shadow-opacity-20">
              <div className="center w-full gap-2 justify-evenly">
                <div className=" bg-[#512B81] text-lg px-6 py-3 flex-row dashicon ">
                  <span className="font-normal ">Batch :</span>
                  <span className="font-semibold">{facultyData?.batch}</span>
                </div>
                <div className="dashicon flex-row border-2 text-lg border-[#512B81] px-6 py-3">
                  <span className="font-normal text-[#512B81] ">Branch :</span>
                  <span className="font-semibold text-black">
                    {facultyData.department}
                  </span>
                </div>
              </div>
              <div className="center w-full gap-2 justify-evenly">
                <div className=" dashicon flex-row text-lg bg-[#512B81] px-6 py-3">
                  <span className="font-normal">Semester :</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="dashicon flex-row border-2 text-lg border-[#512B81] px-6 py-3">
                  <span className="font-normal text-[#512B81] ">
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
                <Button
                  onClick={handleOpenShort}
                  className="bg-[#512B81] text-sm center gap-2"
                >
                  <span className="text-white">Add Shortlist</span>
                  <img src={user} />
                </Button>
                <Button
                  onClick={handleOpenBatch}
                  variant="outlined"
                  className="border-2 border-[#512B81] text-sm center gap-2 text-[#512B81]"
                >
                  <img src={download} className="h-6" />
                  <span>Download Batch Report</span>
                </Button>
              </div>
              <div className="center w-full gap-3 justify-around">
                <Button
                  onClick={handleOpenPending}
                  className="bg-[#512B81] center gap-2 w-full text-sm"
                >
                  <span className="font-semibold">Pending</span>
                  <img src={pending} />
                </Button>
                <Button
                  onClick={handleOpenSorted}
                  variant="outlined"
                  className="border-2 text-sm border-[#512B81] center gap-2 text-[#512B81] w-full"
                >
                  <img src={list} />
                  <span>View sorted list</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="font-bold text-lg w-full text-start">
            Batch Report
          </div>
          {facultyData.students ? (
            <TableFaculty data={facultyData.students} />
          ) : null}
        </Layout>
      )}
    </>
  );
}

export default Faculty;
