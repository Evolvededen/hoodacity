/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AttachmentIcon,
  BotIcon,
  UserIcon,
  VercelIcon,
} from "@/components/icons";
import { useChat } from "ai/react";
import { DragEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Header } from "@/components/header";
import { Streamdown } from "streamdown";

const getTextFromDataUrl = (dataUrl: string) => {
  const base64 = dataUrl.split(",")[1];
  return window.atob(base64);
};

function TextFilePreview({ file }: { file: File }) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      setContent(typeof text === "string" ? text.slice(0, 100) : "");
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div>
      {content}
      {content.length >= 100 && "..."}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { messages, input, handleSubmit, handleInputChange, isLoading: chatIsLoading } =
    useChat({
      onError: () =>
        toast.error("You've been rate limited, please try again later!"),
    });

  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      const files = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const file = items[i].getAsFile();
          if (file && (file.type.startsWith("image/") || file.type.startsWith("text/"))) {
            files.push(file);
          }
        }
      }
      if (files.length > 0) {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
      } else {
        toast.error("Only image and text files are allowed");
      }
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    const droppedFilesArray = Array.from(droppedFiles);
    if (droppedFilesArray.length > 0) {
      const validFiles = droppedFilesArray.filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("text/")
      );

      if (validFiles.length === droppedFilesArray.length) {
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
      } else {
        toast.error("Only image and text files are allowed!");
      }

      setFiles(droppedFiles);
    }
    setIsDragging(false);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("text/")
      );

      if (validFiles.length === selectedFiles.length) {
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
      } else {
        toast.error("Only image and text files are allowed");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Welcome to HoodaCity
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Please sign in or create an account to get started
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-3 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center pb-20 h-dvh bg-white dark:bg-zinc-900"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Header />

      <AnimatePresence>
        {isDragging && (
          <motion.div
            className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 flex flex-row justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>Drag and drop files here</div>
            <div className="text-sm dark:text-zinc-400 text-zinc-500">
              {"(images and text)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-between gap-4 flex-1">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-2 h-full w-dvw items-center overflow-y-scroll">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex flex-row gap-2 px-4 w-full md:w-[500px] md:px-0 ${
                  index === 0 ? "pt-20" : ""
                }`}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
                  {message.role === "assistant" ? <BotIcon /> : <UserIcon />}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
                    <Streamdown>{message.content}</Streamdown>
                  </div>
                  <div className="flex flex-row gap-2">
                    {message.experimental_attachments?.map((attachment) =>
                      attachment.contentType?.startsWith("image") ? (
                        <img
                          className="rounded-md w-40 mb-3"
                          key={attachment.name}
                          src={attachment.url}
                          alt={attachment.name}
                        />
                      ) : attachment.contentType?.startsWith("text") ? (
                        <div className="text-xs w-40 h-24 overflow-hidden text-zinc-400 border p-2 rounded-md dark:bg-zinc-800 dark:border-zinc-700 mb-3">
                          {getTextFromDataUrl(attachment.url)}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {chatIsLoading &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex flex-row gap-2 px-4 w-full md:w-[500px] md:px-0">
                  <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
                    <BotIcon />
                  </div>
                  <div className="flex flex-col gap-1 text-zinc-400">
                    <div>hmm...</div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>
        ) : (
          <motion.div className="h-[350px] px-4 w-full md:w-[500px] md:px-0 pt-20">
            <div className="border rounded-lg p-6 flex flex-col gap-4 text-zinc-500 text-sm dark:text-zinc-400 dark:border-zinc-700">
              <p className="flex flex-row justify-center gap-4 items-center text-zinc-900 dark:text-zinc-50">
                <VercelIcon />
                <span>+</span>
                <AttachmentIcon />
              </p>
              <p>
                The useChat hook supports sending attachments along with
                messages as well as rendering previews on the client. This can
                be useful for building applications that involve sending images,
                files, and other media content to the AI provider.
              </p>
              <p>
                Learn more about the{" "}
                <Link
                  className="text-blue-500 dark:text-blue-400"
                  href="https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot#attachments-experimental"
                  target="_blank"
                >
                  useChat
                </Link>
                {" "}hook from Vercel AI SDK.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <form
        className="flex flex-col gap-2 relative items-center"
        onSubmit={(event) => {
          const options = files ? { experimental_attachments: files } : {};
          handleSubmit(event, options);
          setFiles(null);
        }}
      >
        <AnimatePresence>
          {files && (
            <div className="flex flex-row gap-2 max-w-[500px] w-full px-4 md:px-0 flex-wrap">
              {Array.from(files).map((file) =>
                file.type.startsWith("image") ? (
                  <motion.img
                    key={file.name}
                    className="rounded-md w-28 h-16 object-cover"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      y: -10,
                      scale: 1.1,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                  />
                ) : (
                  <motion.div
                    key={file.name}
                    className="text-[8px] leading-1 w-28 h-16 overflow-hidden text-zinc-500 border p-2 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      y: -10,
                      scale: 1.1,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <TextFilePreview file={file} />
                  </motion.div>
                )
              )}
            </div>
          )}
        </AnimatePresence>

        <input
          type="file"
          multiple
          accept="image/*,text/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px)] bg-zinc-100 dark:bg-zinc-700 rounded-full px-4 py-2">
          <button
            type="button"
            onClick={handleUploadClick}
            className="text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-100 focus:outline-none mr-3"
            aria-label="Upload Files"
          >
            <span className="w-5 h-5">
              <AttachmentIcon aria-hidden="true" />
            </span>
          </button>

          <input
            ref={inputRef}
            className="bg-transparent flex-grow outline-none text-zinc-800 dark:text-zinc-300 placeholder-zinc-400"
            placeholder="Send a message..."
            value={input}
            onChange={handleInputChange}
            onPaste={handlePaste}
          />

          <button
            type="submit"
            className="text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-100 focus:outline-none ml-3"
            aria-label="Send"
          >
            <span className="w-5 h-5">→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
