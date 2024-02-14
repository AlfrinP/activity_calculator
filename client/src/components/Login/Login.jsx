import React, { useEffect, useState } from "react";
import si from "../../assets/Login/student_icon.png";
import fi from "../../assets/Login/faculty_icon.png";
import book from "../../assets/Login/book.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../Util";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const [data, setData] = useState("Student Login");
  const [logdata, setLogData] = useState("student");
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleStudentLogin = () => {
    setData("Student Login");
    setLogData("student");
  };

  const handleFacultyLogin = () => {
    setData("Faculty Login");
    setLogData("faculty");
  };

  const form = [
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
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/dashboard/`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", pass);
    try {
      const formData = new FormData(e.target);
      const response = await axios.post(
        `${baseURL}auth/signin/${logdata}`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      if (response && response.status === 200) {
        localStorage.setItem("role", logdata);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        navigate(`/dashboard/${logdata}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-screen background-main center flex">
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
              onClick={handleStudentLogin}
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
              onClick={handleFacultyLogin}
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
      <div className="lg:w-1/2 h-full w-full center py-10 px-15 lg:center">
        <div className="w-full h-screen center">
          <form
            className="relative lg:h-3/4 h-96 gap-3 py-5 flex flex-col  justify-evenly background-form text-white  w-96 rounded-xl bg-clip-border"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="text-center w-full text-white text-2xl">{data}</div>
            <div className="center justify-evenly lg:hidden">
              <button
                type="button"
                className={`rounded-lg  text-md w-fit border center flex-col gap-2 py-2 px-6 border-[#F9F8FD] bg-opacity-0 ${
                  data === "Student Login"
                    ? "bg-[#41208B] border-purple-900 bg-opacity-100"
                    : ""
                } active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                onClick={handleStudentLogin}
              >
                Student
              </button>

              <button
                type="button"
                className={`rounded-lg  text-md w-fit border center flex-col gap-2 py-2 px-6 border-[#F9F8FD] bg-opacity-0 ${
                  data === "Faculty Login"
                    ? "bg-[#41208B] border-purple-900 bg-opacity-100"
                    : ""
                } active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                onClick={handleFacultyLogin}
              >
                Faculty
              </button>
            </div>
            <div className="flex flex-col gap-4 px-6">
              {form.map((item, index) => (
                <div className="relative h-11 w-full min-w-[200px]" key={index}>
                  <input
                    type={
                      item.name === "password"
                        ? isPasswordVisible
                          ? "text"
                          : "password"
                        : item.type
                    }
                    className={`w-full h-full px-3  relative py-3 font-sans text-sm font-normal transition-all bg-transparent  peer border-t-transparent  outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 rounded-lg border  border-white outline-none  placeholder:text-white text-white placeholder:text-lg focus:ring-purple-900 focus:border-purple-900 ${
                      item.name === "password" ? "pr-12" : ""
                    } `}
                    placeholder=" "
                    name={item.name}
                    onChange={(e) => {
                      item.func(e.target.value);
                    }}
                  />
                  {item.name === "password" ? (
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-2 w-fit justify-end mr-3"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </div>
                  ) : null}
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r  after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                    {item.label}
                  </label>
                  {item.name === "password" ? (
                    <Link className="text-white" to={"/register"}>
                      Forgot password ?
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="px-6 ">
              <button
                className="block select-none rounded-lg  px-6 align-middle  uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none py-3 text-center cursor-pointer text-white font-semibold text-lg w-full background-login"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="w-full text-center">
              Don't have an account{" "}
              <Link className="underline text-[#41208B]" to={"/register"}>
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
