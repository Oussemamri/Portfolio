import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import './ChatWidget.css';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm Oussema's AI assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Call your backend API
      console.log('Sending message to API:', `${API_URL}/chat`);
      const response = await axios.post(`${API_URL}/chat`, { 
        message: inputValue 
      });
      
      // Add bot response to chat
      setMessages(prev => [
        ...prev, 
        { 
          id: prev.length + 1, 
          text: response.data.message || response.data.reply, 
          sender: 'bot' 
        }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      let errorMessage = "Sorry, I couldn't process your request. ";
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage += "The backend server is not reachable. Please make sure the API server is running.";
      } else if (error.response) {
        errorMessage += `Server error: ${error.response.status}`;
      } else {
        errorMessage += "Please try again later.";
      }
      
      setMessages(prev => [
        ...prev, 
        { 
          id: prev.length + 1, 
          text: errorMessage, 
          sender: 'bot',
          isError: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-title">
              <FaRobot className="bot-icon" />
              <span>Chat with Oussema's AI</span>
            </div>
            <button 
              className="close-button" 
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask me anything about Oussema..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
      
      <button 
        className={`chat-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default ChatWidget;