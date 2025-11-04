"use client";

import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import Header from "./Header";

const MOCK_API_URL = "https://677184e2ee76b92dd48fe746.mockapi.io/api/chats";

export default function Chat({locale}) {
  const t = useTranslations("Chat");
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(MOCK_API_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(t("errorFetch"));
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const messageData = {
      content: newMessage,
      user_id: user.id,
      user_name: user.firstName || user.username,
      user_image_url: user.imageUrl,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(MOCK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error(t("errorSend"));
      }

      const savedMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, savedMessage]);
      setNewMessage("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch(`${MOCK_API_URL}/${messageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(t("errorDelete"));
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return <div>{t("loadingUser")}</div>;
  }

  return (
    <div className={`flex-1 flex flex-col bg-background-light dark:bg-background-dark h-[calc(100vh-100px)] ${locale === "ar" ? "lg:mr-64" : "lg:ml-64"}`}>
      <Header />
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div>
          <h3 className="font-bold text-lg">{t("publicChat")}</h3>
          <p className="text-sm text-green-500">
            {isLoading
              ? t("loading")
              : t("connectedAs", { firstName: user.firstName })}{" "}
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {isLoading && <p>{t("loadingMessages")}</p>}
        {error && (
          <p className="text-red-500">
            {t("errorPrefix")}
            {error}
          </p>
        )}{" "}
        {messages.map((msg) => {
          const isMyMessage = msg.user_id === user.id;

          return (
            <div
              key={msg.id}
              className={`group flex items-start gap-3 ${
                isMyMessage ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage: `url(${
                    msg.user_image_url ||
                    "https://placehold.co/40x40/E2E8F0/94A3B8?text=U"
                  })`,
                }}
              ></div>

              <div
                className={`flex flex-col ${
                  isMyMessage ? "items-end" : "items-start"
                } max-w-lg`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    isMyMessage
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-700 rounded-tl-none"
                  }`}
                >
                  {!isMyMessage && (
                    <strong className="text-sm font-semibold mb-1 block">
                      {msg.user_name}
                    </strong>
                  )}
                  <p className="text-sm">{msg.content}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {isMyMessage && (
                <div className="flex items-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    title={t("deleteTitle")}
                    className="p-1 hover:text-red-500"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSend} className="flex items-center gap-4">
          <input
            className="flex-1 bg-background-light dark:bg-background-dark border-none rounded-full h-12 px-5 focus:ring-primary/50 text-sm"
            placeholder={t("placeholder")}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center justify-center size-12 bg-primary text-white rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
