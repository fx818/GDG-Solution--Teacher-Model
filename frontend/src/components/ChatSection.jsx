// import { useEffect } from "react";
import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, Send, MoreVertical, Mic, MicOff, Play, Pause, DivideSquare as SquareDivide, Languages, Microscope, Computer } from 'lucide-react';
// require('dotenv').config();
import axios from 'axios';
// import fs from 'fs';
// const fs = require('fs');

function App() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      text: 'Hi! How can I help you with your studies today?'
    }
  ]);


  // const fs = require('fs');
  // const axios = require('axios');
  async function saveMp3() {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/texttovoice',
        { text: "Hello, world!" },
        {
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      console.log('MP3 file downloaded as output.mp3');
    } catch (error) {
      console.error('Error saving MP3:', error.response?.data || error.message);
    }
  }
  

  const [inputText, setInputText] = useState('');
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessages(prev => [...prev, { type: 'user', text: transcript }]);
        // Here you would call your API with the transcript

        handleApiCall(transcript);

      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsRecording(true);

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleApiCall = async (text) => {
    // Simulate API loading state
    setMessages(prev => [...prev, { type: 'agent', text: 'Thinking...', loading: true }]);
    try {

      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const api = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      const genAI = new GoogleGenerativeAI(api);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = "You are my personlised AI tutor named Gideon. Now answer me this " + text;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());

      // const mp3Url = 'http://127.0.0.1:5000/texttovoice'; // Replace with actual URL
      // const outputFilePath = 'output.mp3';

      // saveMp3(mp3Url, outputFilePath);
      console.log("Some prob??")
      saveMp3();

      setTimeout(() => {
        setMessages(prev => [
          ...prev.filter(msg => !msg.loading),
          { type: 'agent', text: result.response.text() }
        ]);
      }, 1000);

      return result.response.text();

    } catch (error) {
      console.error('API call failed:', error);
      setMessages(prev => [
        ...prev.filter(msg => !msg.loading),
        { type: 'agent', text: 'Sorry, I encountered an error. Please try again.' }
      ]);
    }

  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: inputText }]);
    handleApiCall(inputText);
    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between py-4 text-sm md:text-base gap-4 overflow-x-auto">
            <li className="cursor-pointer hover:text-gray-400 whitespace-nowrap">
              <SquareDivide className="w-8 h-8 mr-2 inline" stroke="#6453b6" /> Mathematics
            </li>
            <li className="cursor-pointer hover:text-gray-400 whitespace-nowrap">
              <Languages className="w-8 h-8 mr-2 inline" stroke="#7453b6" /> Language Arts
            </li>
            <li className="cursor-pointer hover:text-gray-400 whitespace-nowrap">
              <Microscope className="w-8 h-8 mr-2 inline" stroke="#7453b6" /> Sciences
            </li>
            <li className="cursor-pointer hover:text-gray-400 whitespace-nowrap">
              <Computer className="w-8 h-8 mr-2 inline" stroke="#7453b6" /> Computer Science
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Video Section */}
        <div className="relative w-full md:w-2/3 bg-[#121212] rounded-xl overflow-hidden shadow-md flex">
          <video
            ref={videoRef}
            className="w-full h-auto"
            poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200"
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="https://framerusercontent.com/assets/WGdMSI7rMnyC5wedujwMKYP9iPU.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={handlePlayPause}
            className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </button>

          <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-3 py-2 rounded-md">
            <p className="font-semibold text-sm">AI Teacher</p>
            <p className="text-xs text-gray-300">Interactive Learning Session</p>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-1/3 bg-[#1a1a1a] rounded-xl shadow-md flex flex-col">
          <div className="border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h2 className="font-semibold text-sm md:text-base">Ask Your Questions</h2>
            </div>
            <button className="p-1 hover:bg-[#2a2a2a] rounded transition">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start space-x-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                {message.type === 'agent' && (
                  <div className="w-8 h-8 rounded-full bg-yellow-600 flex-shrink-0" />
                )}
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${message.type === 'user' ? 'bg-[#333333]' : 'bg-[#2a2a2a]'
                  }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 bg-[#2a2a2a] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => isRecording ? stopRecording() : startRecording()}
                className={`p-2 rounded-full transition ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2a2a2a] hover:bg-[#333333]'
                  }`}
              >
                {isRecording ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;