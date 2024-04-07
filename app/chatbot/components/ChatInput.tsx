"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "@/components/Input";
import Button from "@/components/Button";

const ChatInput = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");

  const sendMessageToServer = () => {
    fetch("http://localhost:3000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type":"application/json"}, 
      body: JSON.stringify({
        message: userInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Обновляем состояние с ответом от сервера
        setBotResponse(data.message);
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value); // Обновляем состояние с введенным сообщением при изменении инпута
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("UserInput: " + userInput)
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    sendMessageToServer(); // Вызываем функцию для отправки сообщения на сервер
    setUserInput(""); // Очищаем состояние с введенным сообщением
  };

  return (
    <div>
      <form className="flex" onSubmit={handleSubmit}>
        <Input
          className=" rounded-l-md"
          type="text"
          placeholder="What is your mood today?"
          value={userInput}
          onChange={handleChange}
        />
        <Button type="submit" className="flex-1 rounded-r">
          Submit
        </Button>
      </form>
      <p>{botResponse}</p>
    </div>
  );
};

export default ChatInput;
