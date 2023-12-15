import React from 'react';
import { Select, Option, Dialog, DialogBody, DialogHeader,Button } from '@material-tailwind/react';
import Add from "../../assets/General/Addicon.svg"
function FileUploadModel({ isOpen, handleOpen }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Dialog open={isOpen} handler={handleOpen} className='p-4'>
    <DialogHeader>
        <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-black">Upload Files</h1>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5 float-right"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
        </div>
      </DialogHeader>
      <DialogBody>
        <form className="w-full flex flex-col items-center mt-6 gap-4" onSubmit={handleSubmit}>
          <div className="border-dashed border-2 border-gray-300 rounded p-4 w-full bg-[#F7F6FE]">
            <h4 className="text-black text-center text-xl" >Drop your files here!</h4>
            <p className="text-gray-400 text-center pb-4">or click</p>
          </div>
          <div className="bg-[#512B81] rounded z-10 flex items-center justify-center gap-2 px-9 h-12 -mt-12 cursor-pointer">
            <img src={Add} alt="addicon" className='w-5'/>
            <p className="text-white">Add files</p>
          </div>
          <div className="w-full">
            <h4 className="text-black text-md font-medium">OPTIONS</h4>
            <hr className="border-gray-400" />
            <div className="grid grid-cols-2 gap-5 mt-4">
              <Select variant="outlined" label="Category">
                <Option>1</Option>
              </Select>
              <Select variant="outlined" label="Actvity Name">
                <Option>1</Option>
              </Select>
              <Select variant="outlined" label="Levels">
                <Option>1</Option>
              </Select>
              <Select variant="outlined" label="Points">
                <Option>1</Option>
              </Select>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="bg-[#512B81] rounded text-white px-4 py-2 text-sm font-medium cursor-pointer text-lowercase capitalize" style={{color: "white"}}
              >
                Upload files
              </Button>
              <span className="text-gray-700">or</span>
              <a href="#" className="text-[#512B81] underline">Cancel</a>
            </div>
            <Button onClick={handleOpen} className="bg-[#512B81] rounded text-white  cursor-pointer w-fit text-lowercase capitalize" style={{color:"white"}}>Done</Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}

export default FileUploadModel;