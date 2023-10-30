"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ChatContent from "./components/ChatContent";
import ChatInput from "./components/ChatInput";

interface ChatBotProps {
    chatParams: {text: String}
}

const ChatBot: React.FC<ChatBotProps> = ({chatParams}: ChatBotProps) => {
    
    return (
        <div
            className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        AI ChatBot
                    </h1>
                    <ChatInput />
                </div>
            </Header>
            <ChatContent/>
        </div>
    );
};

export default ChatBot;
