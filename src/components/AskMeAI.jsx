import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";

import "./AskMeAI.css";

const starterMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I’m Ahsan’s portfolio assistant. You can ask me about his skills, experience, projects or availability.",
};

const suggestedQuestions = [
  "What services does Ahsan provide?",
  "Tell me about Ahsan's Odoo experience",
  "Which projects has Ahsan completed?",
  "Is Ahsan available for freelance work?",
];

function AskMeAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([starterMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const openAssistant = () => {
    setIsOpen(true);
  };

  const closeAssistant = () => {
    if (!isLoading) {
      setIsOpen(false);
      setError("");
    }
  };

  const resetConversation = () => {
    if (isLoading) {
      return;
    }

    setMessages([starterMessage]);
    setQuestion("");
    setError("");
  };

  useEffect(() => {
    window.addEventListener(
      "open-ai-assistant",
      openAssistant
    );

    return () => {
      window.removeEventListener(
        "open-ai-assistant",
        openAssistant
      );
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => {
      clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeAssistant();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isLoading]);

  const askQuestion = async (questionText) => {
    const cleanQuestion = questionText.trim();

    if (!cleanQuestion || isLoading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: cleanQuestion,
    };

    const previousMessages = messages
      .filter((message) => message.id !== "welcome")
      .map((message) => ({
        role: message.role,
        text: message.text,
      }));

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: cleanQuestion,
          history: previousMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "The AI assistant is currently unavailable."
        );
      }

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.answer,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (requestError) {
      console.error("Ask Me error:", requestError);

      setError(
        requestError.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ai-assistant-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={closeAssistant}
        >
          <motion.div
            className="ai-assistant-window"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Header */}

            <div className="ai-assistant-header">
              <div className="ai-assistant-identity">
                <motion.span
                  className="ai-assistant-logo"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(200, 255, 69, 0)",
                      "0 0 0 7px rgba(200, 255, 69, 0.08)",
                      "0 0 0 0 rgba(200, 255, 69, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                  }}
                >
                  <Bot size={21} />
                </motion.span>

                <div>
                  <strong>Ahsan AI</strong>

                  <span>
                    <i />
                    Portfolio assistant
                  </span>
                </div>
              </div>

              <div className="ai-assistant-header-actions">
                <button
                  type="button"
                  onClick={resetConversation}
                  disabled={isLoading}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <Trash2 size={17} />
                </button>

                <button
                  type="button"
                  onClick={closeAssistant}
                  disabled={isLoading}
                  aria-label="Close AI assistant"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* Messages */}

            <div className="ai-assistant-messages">
              {messages.map((message) => {
                const isAssistant =
                  message.role === "assistant";

                return (
                  <motion.div
                    key={message.id}
                    className={`ai-message ${
                      isAssistant
                        ? "ai-message-assistant"
                        : "ai-message-user"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    <span className="ai-message-avatar">
                      {isAssistant ? (
                        <Sparkles size={15} />
                      ) : (
                        <User size={15} />
                      )}
                    </span>

                    <div className="ai-message-content">
                      <span className="ai-message-name">
                        {isAssistant
                          ? "Ahsan AI"
                          : "You"}
                      </span>

                      <p>{message.text}</p>
                    </div>
                  </motion.div>
                );
              })}

              {messages.length === 1 && (
                <motion.div
                  className="ai-suggestions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="ai-suggestions-label">
                    Suggested questions
                  </span>

                  <div className="ai-suggestions-grid">
                    {suggestedQuestions.map(
                      (suggestion) => (
                        <button
                          type="button"
                          key={suggestion}
                          onClick={() =>
                            askQuestion(suggestion)
                          }
                        >
                          {suggestion}
                        </button>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {isLoading && (
                <motion.div
                  className="ai-message ai-message-assistant"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="ai-message-avatar">
                    <Sparkles size={15} />
                  </span>

                  <div className="ai-message-content">
                    <span className="ai-message-name">
                      Ahsan AI
                    </span>

                    <div className="ai-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  className="ai-assistant-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}

            <form
              className="ai-assistant-form"
              onSubmit={handleSubmit}
            >
              <div className="ai-assistant-input-wrapper">
                <textarea
                  ref={inputRef}
                  rows="1"
                  value={question}
                  maxLength={600}
                  disabled={isLoading}
                  placeholder="Ask about skills, projects or availability..."
                  onChange={(event) => {
                    setQuestion(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      handleSubmit(event);
                    }
                  }}
                />

                <button
                  type="submit"
                  disabled={
                    isLoading || !question.trim()
                  }
                  aria-label="Send question"
                >
                  <Send size={18} />
                </button>
              </div>

              <div className="ai-assistant-form-footer">
                <span>
                  AI can make mistakes. Verify important
                  information.
                </span>

                <span>{question.length}/600</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AskMeAI;