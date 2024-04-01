// import React, { useState } from "react";
// import Wdownload from "../../assets/General/Whitedownload.svg";
// import back from "../../assets/General/back.svg";
// import Table3 from "./tables/Table3";
// import Navbar2 from "../Navbar2";
// import { Button } from "@material-tailwind/react";
// import Downloaddetail from "./Downloaddetail";
// import Layout from "./Layout";

// export default function StudentDetail({ data }) {
//   const [openDownload, setOpenDownload] = useState(false);
//   const handleOpenDownload = () => setOpenDownload(!openDownload);

//   return (
//     <Layout>
//       <Button
//         variant="text"
//         onClick={handleOpen}
//         className="center justify-end gap-1 p-3 absolute mt-20 mr-20 right-0 top-0"
//       >
//         <img src={back} alt="back" />
//         <div className="text-lg text-[#512B81] ml-1 font-semibold">Back</div>
//       </Button>
//       <Navbar2 />
//       <Downloaddetail isOpen={openDownload} handleOpen={handleOpenDownload} />

//       <div className="w-full center flex-col gap-5 px-60">
//         <div className="w-full center justify-evenly">
//           <div className="ring-offset-8 ring-2 ring-[#512B81] rounded-full w-32">
//             <img src={data.img} className="rounded-full" />
//           </div>
//           <div className="center flex-col gap-3 items-start col-span-2">
//             <div className="center flex-col items-start">
//               <span className="font-normal text-[#512B81]">Student Name</span>
//               <span className="text-lg font-semibold">{data.name}</span>
//             </div>
//             <div className="center justify-start w-full gap-3">
//               <div className="center flex-col items-start bg-[#512B81] rounded-xl w-[180px] py-1 px-2 justify-evenly text-white">
//                 <span className="font-light">Register No:</span>
//                 <span className="font-semibold">{data.regno}</span>
//               </div>
//               <div className="center flex-col items-start w-[180px] border-2 border-[#512B81] rounded-xl py-1 px-2 justify-evenly text-white">
//                 <span className="font-light text-[#512B81] ">Branch</span>
//                 <span className="font-semibold text-black">
//                   {data.department}
//                 </span>
//               </div>
//             </div>
//             <div className="center gap-2">
//               <span className="text-[#512B81]">Semester</span>
//               <span className="text-2xl text-[#512B81]">{data.semester}</span>
//             </div>
//           </div>
//           <div className="center ml-12">
//             <button
//               className="bg-[#512B81] py-4 px-6 mt-5 rounded-lg"
//               onClick={handleOpenDownload}
//             >
//               <img src={Wdownload} width={30} />
//               <span className=" text-white ml-2">Download Details</span>
//             </button>
//           </div>
//         </div>
//         <div className="w-full center shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black rounded-lg">
//           <Table3 />
//         </div>
//       </div>
//     </Layout>
//   );
// }
