import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import MessageIcon from "../../assets/General/message.png";
import CloseIcon from "../../assets/General/crossicon.svg";
import Avatar from "../../assets/General/avatar.png";

function PopMessage({ data = [], faculty }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <>
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
          <PopoverContent>
            {data
              .filter((item) => item.status === "rejected")
              .map((item, index) => (
                <span className="w-fit flex flex-row center py-6" key={index}>
                  <img src={Avatar} alt="avatar" className="rounded-full" />
                  <div className="flex flex-col message p-4">
                    <h4 className="font-bold text-black">{faculty}</h4>
                    <p>{item.category}</p>
                    <p>{item.comment}</p>
                  </div>
                </span>
              ))}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default PopMessage;
