import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import StreamUserIcon from "../assets/images/cocklogo.png";
import AdminButton from "./AdminButton";
import { IoSend } from "react-icons/io5";
import { UserContext } from "../context/UserContext";

const socket = io(import.meta.env.VITE_API_URL);

const StreamChat = () => {
  const { messages, setMessages } = useContext(UserContext);
  const { userid } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);
  const colors = ["white"];

  // Function to scroll to the bottom of the chat box
  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("chat message", { message: newMessage });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior (like form submission)
      handleSendMessage();
    }
  };
  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]); // This effect runs every time messages change

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve from local storage or auth provider
    socket.emit("authenticate", token);
  }, []);

  useEffect(() => {
    // Listen for new chat messages
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <StreamChatWrapper>
      <StreamChatTitle>Stream chat</StreamChatTitle>
      <ChatWrapper ref={chatBoxRef}>
        {messages.length > 0 &&
          messages.map((message, key) => (
            <ChatItemWrapper key={key}>
              <ChatUserIcon src={StreamUserIcon} />
              <ChatUserText color={colors[key % colors.length]}>
                {message.username}: {message.message}
              </ChatUserText>
            </ChatItemWrapper>
          ))}
      </ChatWrapper>
      <ChatInputWrapper>
        <ChatInput
          type="text"
          placeholder="Send message..."
          value={newMessage}
          disabled={userid ? false : true}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Handle key down events
        />
        <AdminButton
          bgcolor="#980312"
          color="white"
          width="30px"
          icon={<IoSend fill="white" />}
          fweight="500"
          padding="3px"
          height="28px"
          onClick={handleSendMessage}
          onKeyDown={handleKeyDown}
        />
      </ChatInputWrapper>
    </StreamChatWrapper>
  );
};

const StreamChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  height: 430px;
  gap: 10px;
  width: 100%;
  background-color: rgba(152, 3, 18, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #980312;
  user-select: none;
  @media screen and (max-width: 950px) {
    max-width: 360px;
  }
`;
const StreamChatTitle = styled.div`
  font-family: "aquire";
  font-size: 20px;
  font-weight: 900;
  padding: 10px;
  border-bottom: 1px solid #980312;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 16px;
  overflow: auto;
  height: 300px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ChatItemWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ChatUserIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const ChatUserText = styled.div`
  font-size: 12px;
  color: ${(props) => props.color}; /* Set the color dynamically */
`;

const ChatInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-radius: 8px;
  border: 2px solid #980312;
  padding: 3px;
  margin: 5px 16px;
  box-sizing: border-box;
`;

const ChatInput = styled.input`
  outline: 0;
  border: 0;
  background-color: transparent;
  font-size: 12px;
  font-style: italic;
  font-family: "General Sans";
  width: 80%;
  padding: 5px;
  color: white;
`;

export default StreamChat;
