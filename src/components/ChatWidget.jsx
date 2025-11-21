import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(null);

  // Initialize or retrieve sessionId
  useEffect(() => {
    let sessionId = sessionStorage.getItem("chatSessionId");
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      sessionStorage.setItem("chatSessionId", sessionId);
    }
    sessionIdRef.current = sessionId;
  }, []);

  // Scroll to last message when chat opens or messages change
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://lordcdev29.app.n8n.cloud/webhook/a0883180-0b5d-4f8b-b496-d696511b84ae/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            chatInput: userMessage,
          }),
        }
      );

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      setMessages((prev) => [...prev, { from: "bot", text: data.output }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Lo siento, encontré un error al procesar tu consulta. Por favor, intenta de nuevo o reformula tu pregunta sobre el clima.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // FAQ questions for climate explorer
  const faqs = [
    "¿Qué datos climáticos puedo consultar?",
    "¿De dónde provienen los datos?",
    "¿Cómo interpreto el mapa interactivo?",
    "¿Qué es el cambio climático?",
    "¿Cómo puedo contribuir al proyecto?",
  ];

  const handleFaqClick = async (question) => {
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://lordcdev29.app.n8n.cloud/webhook/a0883180-0b5d-4f8b-b496-d696511b84ae/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            chatInput: question,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from chat");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.output }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Lo siento, encontré un error al procesar tu consulta. Por favor, intenta de nuevo o reformula tu pregunta sobre el clima.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}
    >
      {/* Botón flotante del chat - visible cuando el chat está cerrado */}
      {!open && (
        <button
          type="button"
          className="p-3 hover:scale-110 transition-all duration-300 bg-[#1a1f2e] rounded-full border-2 border-primary/40 shadow-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat climático"
        >
          <img
            src="/logo.png"
            alt="El Ventarrón"
            className="w-16 h-16 object-contain"
          />
        </button>
      )}

      {/* Ventana del chat - solo visible cuando está abierto */}
      {open && (
        <div
          className="fixed bottom-0 right-0 lg:bottom-4 lg:right-4 z-50 w-full sm:w-[28rem] lg:w-[32rem] h-[90vh] sm:h-auto sm:max-h-[600px] max-w-2xl  sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-primary/30"
          style={{ backgroundColor: "#020617" }}
        >
          {/* Header */}
          <div className="relative flex items-center px-4 py-3 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1f2e] p-2 flex items-center justify-center border border-primary/30">
              <img
                src="/logo.png"
                alt="El Ventarrón"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base font-bold">
                Asistente Climático
              </h3>
              <p className="text-primary/80 text-xs">El Ventarrón</p>
            </div>
            <button
              type="button"
              className="text-white/80 hover:text-primary text-2xl font-bold transition-colors leading-none"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
            {/* Overlay con efecto glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 pointer-events-none"></div>
            {/* Línea inferior con glow */}
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>

          {/* FAQ Container */}
          <div className="px-4 py-3 border-b border-primary/20 bg-[#071428]">
            <div className="font-semibold text-primary text-sm mb-2">
              Preguntas Frecuentes
            </div>
            <div className="flex flex-wrap gap-2">
              {faqs.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="bg-[#1a1f2e] text-primary text-xs px-3 py-1.5 rounded-full font-medium hover:bg-[#2a3f5f] hover:scale-105 transition-all border border-primary/30"
                  onClick={() => handleFaqClick(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="px-4 py-3 space-y-3 overflow-y-auto h-[400px] bg-[#020617]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#1a1f2e] p-3 border border-primary/30">
                  <img
                    src="/logo.png"
                    alt="El Ventarrón"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-primary/60 text-sm">
                  ¡Hola! Pregúntame sobre datos climáticos
                </p>
              </div>
            )}
            {messages.map((msg, idx) => {
              const isUser = msg.from === "user";
              return (
                <div
                  key={idx}
                  className={`flex w-full ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={
                      isUser
                        ? "text-white bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-2xl rounded-tr-sm max-w-[85%] font-semibold shadow-md"
                        : "text-[#E6F2FF] bg-[#1a1f2e] px-4 py-2 rounded-2xl rounded-tl-sm max-w-[85%] border border-primary/20 markdown-content"
                    }
                  >
                    {isUser ? (
                      msg.text
                    ) : (
                      <ReactMarkdown
                        components={{
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside my-2 space-y-1" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside my-2 space-y-1" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="ml-2" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="my-1" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-bold text-primary" {...props} />
                          ),
                          em: ({ node, ...props }) => (
                            <em className="italic" {...props} />
                          ),
                          code: ({ node, inline, ...props }) => (
                            inline ? (
                              <code className="bg-[#0a1929] px-1.5 py-0.5 rounded text-secondary font-mono text-sm" {...props} />
                            ) : (
                              <code className="block bg-[#0a1929] p-2 rounded my-2 font-mono text-sm overflow-x-auto" {...props} />
                            )
                          ),
                          a: ({ node, ...props }) => (
                            <a className="text-primary hover:text-secondary underline" target="_blank" rel="noopener noreferrer" {...props} />
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="text-[#E6F2FF] bg-[#1a1f2e] px-4 py-3 rounded-2xl rounded-tl-sm border border-primary/20">
                  <div className="flex space-x-1.5">
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-primary/20 px-4 py-3 bg-[#020617]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full border border-primary/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              style={{
                backgroundColor: "#f8f9fa",
                color: "#1a1f2e",
                caretColor: "#1a1f2e",
              }}
              placeholder="Pregunta sobre el clima..."
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-[#020617] rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
