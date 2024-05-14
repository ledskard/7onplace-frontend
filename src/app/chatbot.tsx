"use client";
import Image from "next/image";
import { useState } from "react";

function ChatbotIframe() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChatbot = () => setIsOpen(!isOpen);

  const closeChatbot = (e: any) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 md:bottom-5 md:right-5 z-[999999] cursor-pointer flex flex-col ${isOpen ? "w-[350px] h-[600px] max-h-full" : "w-16 h-16 md:w-20 md:h-20"}`}
      onClick={toggleChatbot}
    >
      {isOpen && (
        <>
          <div
            className="self-end cursor-pointer text-white bg-black rounded-full w-6 h-6 flex items-center justify-center mb-2"
            onClick={closeChatbot}
          >
            X
          </div>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/3lo6IqzN78T3TxHGCldMi"
            width="100%"
            height="100%"
            className="rounded-lg flex-1"
            onClick={(e) => e.stopPropagation()}
          ></iframe>
        </>
      )}
      {!isOpen && (
        <div className="w-17 h-17 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center ">
          <img
            src="https://7onsexycatalogo.s3.amazonaws.com/Suporte+7+On+Place.png"
            alt="Chat Icon"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ChatbotIframe;
