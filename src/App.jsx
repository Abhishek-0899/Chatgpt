import { useState } from "react";
import "./App.css";
import { IoCodeWorkingSharp, IoSendSharp } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [message, setMessage] = useState("");
  const [isresponseScreen, setresponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);

  const hiRequest = () => {
    if (message) {
      GenerateGoogleResponse(message);
    } else {
      alert("please enter a message");
    }
  };

  const GenerateGoogleResponse = async (msg) => {
    if (!msg) {
      return;
    }
    const genAI = new GoogleGenerativeAI("AIzaSyCWe8ucjgCV1BL6ptkcyIVGhofBXN0oLBg");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    const NewMessage = [
      ...messages,
      { type: "user", text: msg },
      { type: "response", text: result.response.text() },
    ];

    setMessages(NewMessage);
    setresponseScreen(true);
    setMessage("");
  };

  const newChat = () => {
    setresponseScreen(false);
    setMessages([]);
  };

  return (
    <>
      <div className="container mx-auto min-h-screen bg-black text-white overflow-x-hidden">
        {isresponseScreen ? (
          <div className="h-[80vh] flex flex-col">
            <div className="header flex pt-4 items-center justify-between w-full px-4 md:px-16 lg:px-24">
              <h2 className="text-2xl md:text-3xl">Assist Me</h2>
              <button
                id="newChatbtn"
                className="bg-[#181818] p-2 md:p-3 cursor-pointer rounded-full px-4"
                onClick={newChat}
              >
                New Chat
              </button>
            </div>

            <div className="messages flex-grow pt-4 px-4 md:px-16 lg:px-24">
              {messages?.map((msg, index) => (
                <div className={msg.type} key={index}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="middle flex flex-col justify-center items-center h-[80vh]">
            <h1 className="text-3xl md:text-5xl">Assist Me</h1>
            <div className="boxes flex flex-wrap items-center gap-4 py-6">
              {[
                "What is code? How can we learn?",
                "What is the largest star?",
                "Learn everyday new with genAI",
                "Build something different",
              ].map((text, idx) => (
                <div
                  key={idx}
                  className="card relative px-4 py-6 rounded-xl cursor-pointer transition-all hover:bg-lime-800 min-h-[20vh] bg-slate-700 w-full sm:w-[48%] lg:w-[23%] text-center"
                >
                  <p className="text-lg md:text-xl" style={{ lineHeight: 1.6 }}>
                    {text}
                  </p>
                  <IoCodeWorkingSharp className="absolute right-4 bottom-4 text-2xl" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bottom flex flex-col justify-center items-center py-4">
          <div className="input_box text-sm py-2 w-full max-w-2xl flex items-center rounded-full bg-[#1a1a1a]">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-lg border-none outline-none bg-transparent p-3 pl-6 rounded-full"
              type="text"
              id="messageBox"
              placeholder="Write your message here..."
            />
            {message !== "" && (
              <i
                className="text-white text-lg mr-3 bg-red-600 rounded-full p-3 cursor-pointer"
                onClick={hiRequest}
              >
                <IoSendSharp />
              </i>
            )}
          </div>
          <p className="text-lg text-fuchsia-800 mt-2 text-center">
            Assist me is developed by Abhishek Kumar using gemini-AI
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
