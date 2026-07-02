import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: (...args: unknown[]) => unknown;
  }
}

const ChatbaseWidget = () => {
  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById("chatbase-script")) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "chatbase-script";
    script.async = true;

    // Use your bot ID here
    script.setAttribute("chatbotId", "TQBUIhZ1jmRWYplTEztUs");
    script.setAttribute("domain", "www.chatbase.co");

    document.body.appendChild(script);

    // No cleanup
  }, []);

  return null;
};

export default ChatbaseWidget;