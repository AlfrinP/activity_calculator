import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Faculty({ onSubmit }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const { register, handleSubmit } = useForm();

  const faculty_form = [
    {
      label: "Name",
      type: "text",
      name: "name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      type: "text",
      name: "password",
    },
    {
      label: "Batch",
      type: "text",
      name: "batch",
    },
    {
      label: "Department",
      type: "text",
      name: "department",
    },
  ];

  return (
    <form
      className="relative h-fit gap-3 py-5 flex flex-col justify-evenly background-form text-white w-96 rounded-xl bg-clip-border"
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 px-6">
        {faculty_form.map((item, index) => (
          <div key={index} className="relative h-11 w-full min-w-[200px]">
            <input
              {...register(item.name)}
              type={
                item.type === "password"
                  ? isPasswordVisible
                    ? "text"
                    : "password"
                  : item.type
              }
              className={`w-full h-full px-3 relative py-3 font-sans text-sm font-normal transition-all bg-transparent peer border-t-transparent outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 rounded-lg border border-white outline-none placeholder:text-white text-white placeholder:text-lg focus:ring-purple-900 focus:border-purple-900 ${
                item.name === "password" ? "pr-12" : ""
              }`}
              placeholder=""
              name={item.name}
            />
            {item.name === "password" && (
              <div
                className="absolute inset-y-0 right-0 flex items-center px-2 w-fit justify-end mr-3 cursor-pointer"
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
                    {/* Eye icon for visible password */}
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
                    {/* Eye-slash icon for hidden password */}
                  </svg>
                )}
              </div>
            )}
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-purple-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-purple-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
              {item.label}
            </label>
          </div>
        ))}
        <div className="px-6 ">
          <button
            className="block select-none rounded-lg  px-6 align-middle  uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none py-3 text-center cursor-pointer text-white font-semibold text-lg w-full background-login"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        Have an account{" "}
        <Link className="underline text-[#41208B]" to={"/login"}>
          SignUp
        </Link>
      </div>
    </form>
  );
}

export default Faculty;
