import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css'; // Import custom styles
import ReactMarkdown from 'react-markdown';
import faqDataset from '../data/chatBotdata.json'
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const popupRef = useRef(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };


  async function handleSend(e) {
    e.preventDefault();
    if (message.trim() === "") return;
    setGeneratingAnswer(true);
  
    // Check if the message matches any FAQ
    const matchedFaq = faqDataset.find((faq) =>
      message.toLowerCase().includes(faq.question.toLowerCase())
    );
  
    if (matchedFaq) {
      // If a matching FAQ is found, use its answer
      const userMessage = {
        parts: [{ text: message }],
        role: "user",
      };
  
      const botResponse = {
        parts: [{ text: matchedFaq.answer }],
        role: "model",
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
      setMessage(""); // Clear the input after sending
      setGeneratingAnswer(false); // Hide loader
    } else {
      // If no FAQ matches, proceed with API call
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_OPENAI_API_KEY}`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: message }] }],
          },
        });
  
        const botResponse = {
          parts: response.data.candidates?.[0]?.content?.parts || [{ text: "No answer received." }],
          role: "model",
        };
  
        const userMessage = {
          parts: [{ text: message }],
          role: "user",
        };
  
        setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
        setMessage(""); 
      } catch (error) {
        console.error("API call error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { parts: [{ text: "Sorry - Something went wrong. Please try again!" }], role: "model" },
        ]);
      }
  
      setGeneratingAnswer(false); 
    }
  }
  
  
  
  
  
  



  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    });
    return <div ref={elementRef} />;
  };

  return (
    <div className="chatbot">
      {!isOpen && (
        <button className="chatbot-button" onClick={handleToggle}>
          <img src="/chat-bot.png" alt="Chat Icon" className="chat-icon" />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-popup" ref={popupRef}>
          <div className="chatbot-header">
            <span>HireHub Chatbot</span>
            <button className="chatbot-close" onClick={handleToggle}>×</button>
          </div>

          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <RenderMessage key={index} message={msg} />
                ))
              ) : (
                <p>Hello! How can I assist you today?</p>
              )}
              <AlwaysScrollToBottom />
            </div>

            <div className="chatbot-input-container">
  <input
    type="text"
    value={message}
    onChange={handleInputChange}
    placeholder="Type your message..."
    className="chatbot-input"
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(e);
      }
    }}
    disabled={generatingAnswer} // Disable input during loading
  />
  <button
    className="chatbot-send"
    onClick={handleSend}
    disabled={generatingAnswer} // Disable the button during loading
  >
    {generatingAnswer ? (
      <div className="loader"></div> // Show loader if generating answer
    ) : (
      "Send" // Show "Send" text if not loading
    )}
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};



const RenderMessage = ({ message }) => {
  const { parts, role } = message;

  return (
    <div
      className={`chat-message ${role === 'user' ? 'user-message' : 'bot-message'}`}
      style={{
        display: 'flex',
        justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <div className={`message-bubble ${role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
        {parts.map((part, index) => (
          <ReactMarkdown key={index}>{part.text}</ReactMarkdown>
        ))}
      </div>
    </div>
  );
};




export default ChatBot;


