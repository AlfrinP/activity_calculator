import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../Util";
import si from "../../assets/Login/student_icon.png";
import fi from "../../assets/Login/faculty_icon.png";
import book from "../../assets/Login/book.png";
import Faculty from "../forms/login/Faculty";
import Student from "../forms/login/Student";

function SignUp() {
  const [data, setData] = useState("Student Login");

  const [logdata, setLogData] = useState("student");

  const handleStudentSignup = () => {
    setData("Student Login");
    setLogData("student");
  };

  const handleFacultySignup = () => {
    setData("Faculty Login");
    setLogData("faculty");
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("hi");
      console.log(formData);
      const response = await axios.post(
        `${baseURL}auth/signup/${logdata}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponseMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage(error.response.data.error);
    }
  };

  return (
    <div className="w-full h-screen background-main center flex">
      <div className="lg:w-1/2 h-full w-full center py-10 px-15 lg:center">
        <div className="w-full h-screen center">
          {data === "Student Login" ? (
            <Student onSubmitdata={handleSubmit} />
          ) : (
            <Faculty onSubmit={handleSubmit} />
          )}
        </div>
      </div>
      <div className="lg:w-1/2 lg:flex hidden lg:h-full lg:center lg:flex-col lg:gap-10">
        <div className="w-full center flex-col gap-2">
          <div className="w-full text-center text-2xl text-white">
            Welcome to
          </div>
          <div className="w-full text-center text-4xl text-white font-bold">
            CCE Portal
          </div>
        </div>
        <div>
          <ul className="center gap-5">
            <li
              className={`rounded-lg border center cursor-pointer flex-col gap-2 p-5 px-8 border-[#F9F8FD] bg-opacity-0 ${
                data === "Student Login"
                  ? "bg-[#41208B] border-purple-900 bg-opacity-100"
                  : ""
              }`}
              onClick={handleStudentSignup}
            >
              <img className="w-10" src={si} alt="student_img" />
              <div className="text-lg text-white">Student</div>
            </li>
            <li
              className={`rounded-lg border center flex-col gap-2 p-5 px-8 border-[#F9F8FD] bg-opacity-0  ${
                data === "Faculty Login"
                  ? "bg-[#41208B] border-purple-900 bg-opacity-100"
                  : ""
              }`}
              onClick={handleFacultySignup}
            >
              <img className="w-10" src={fi} alt="faculty_img" />
              <div className="text-lg text-white">Faculty</div>
            </li>
          </ul>
        </div>
        <div>
          <img src={book} alt="Main Hero" className="w-72" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;

