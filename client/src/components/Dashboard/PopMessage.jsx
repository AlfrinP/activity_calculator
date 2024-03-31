import React, { useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import MessageIcon from "../../assets/General/message.png";
import CloseIcon from "../../assets/General/crossicon.svg";
import Avatar from "../../assets/General/avatar.png";

function PopMessage({ data = [], faculty = "" }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className="mb-3 flex gap-3">
      <Popover placement="top-start">
        <PopoverHandler onClick={() => setIsMessageOpen(!isMessageOpen)}>
          <Button className="bg-purple-900 rounded-full p-5">
            {isMessageOpen ? (
              <img src={CloseIcon} alt="close" className="w-5 h-5" />
            ) : (
              <img src={MessageIcon} alt="message" className="w-5 h-5" />
            )}
          </Button>
        </PopoverHandler>
        <PopoverContent className="h-1/2 w-[18%] overflow-scroll overflow-x-hidden rounded-lg">
          {data && data.some(item => item.status === "rejected") ? (
            data
              .filter((item) => item.status === "rejected")
              .map((item, index) => (
                <div className="w-fit center items-end py-2" key={index}>
                  <img src={Avatar} alt="avatar" className="rounded-full block w-10" />
                  <div className="flex flex-col message p-2">
                    <h4 className="font-bold text-black">{item.faculty}</h4>
                    <p>{item.category}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="flex  items-center">
              <img src={Avatar} alt="avatar" className="rounded-full block w-10" />
              <p className="message p-2">All is well 👍</p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PopMessage;
