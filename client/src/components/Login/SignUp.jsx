import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../Util";

function SignUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [logdata, setLogData] = useState("student");

  const handleStudentSignup = () => {
    setLogData("student");
  };

  const handleFacultySignup = () => {
    setLogData("faculty");
  };

  const form = [
    {
      label: "Name",
      type: "text",
      name: "name",
      func: setName,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      func: setEmail,
    },
    {
      label: "Password",
      type: "text",
      name: "password",
      func: setPass,
    },
    {
      label: "Department",
      type: "text",
      name: "department",
      func: setDepartment,
    },
    {
      label: "Batch",
      type: "text",
      name: "batch",
      func: setBatch,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", pass);
    bodyFormData.append("name", name);
    bodyFormData.append("batch", batch);
    bodyFormData.append("department", department);

    try {
      const response = await axios.post(
        `${baseURL}auth/signup/${logdata}`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage(error.response.data.error);
    }
  };

  return (
    <div className="w-full h-screen center">
      <form
        className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="relative grid overflow-hidden text-white shadow-lg h-fit p-2 m-5 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
          <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
            Sign Up
          </h3>
        </div>
        <div className="center justify-evenly">
          <button
             type="button"
            className={`block w-fit select-none rounded-lg  hover:shadow-gray-900/20 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg ${
              logdata === "student" ? "bg-blue-gray-500" : "bg-gradient-to-tr from-gray-900 to-gray-800"
            } active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            onClick={handleStudentSignup}
          >
            Student
          </button>

          <button
             type="button"
            className={`block w-fit select-none rounded-lg  hover:shadow-gray-900/20 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg ${
              logdata === "faculty" ? "bg-blue-gray-500" : "bg-gradient-to-tr from-gray-900 to-gray-800"
            } active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            onClick={handleFacultySignup}
          >
            Faculty
          </button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {form.map((item, index) => (
            <div className="relative h-11 w-full min-w-[200px]" key={index}>
              <input
                className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                type={item.type}
                name={item.name}
                onChange={(e) => {
                  item.func(e.target.value);
                }}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <div className="p-6 pt-0 text-center text-sm text-red-500">
          {typeof responseMessage === "object" ? JSON.stringify(responseMessage) : responseMessage}
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
