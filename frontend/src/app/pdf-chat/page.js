'use client';

import { BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function PDFViewerIframe({ pdfUrl }) {
  return (
    <div className="w-full h-full">
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="100%"
        className="border-none"
      ></iframe>
    </div>
  );
}

export default function PDFChat() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Send chat message along with the PDF file to the backend.
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    if (!pdfFile) {
      const errorMsg = { type: 'bot', text: "Please select a PDF file before sending a query." };
      setChatMessages((prev) => [...prev, errorMsg]);
      return;
    }
    const userMsg = { type: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("query", chatInput);

      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const botMsg = { type: 'bot', text: data.response || data.error };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending chat message:", error);
      const botMsg = { type: 'bot', text: "Error processing your query." };
      setChatMessages((prev) => [...prev, botMsg]);
    }
    setChatInput('');
  };

  // Trigger send on Enter (unless Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-lg backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PDF Chat
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-600"
            />
          </div>
        </div>
      </header>

      {/* Upload Section (Top) */}
      <section className="max-w-7xl mx-auto my-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Upload PDF</h2>
          <div
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0l-3 3m3-3l3 3M17 16V4m0 0l3 3m-3-3l-3 3" />
            </svg>
            <p className="mt-4 text-gray-500">Drag & drop your PDF file here, or click to select.</p>
            <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Select File
              <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          {pdfFile && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">Selected File: {pdfFile.name}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lower Section: PDF Viewer and Chat */}
      <section className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4">
        {/* Left: PDF Viewer */}
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg overflow-hidden h-[600px]">
          {pdfUrl ? (
            <PDFViewerIframe pdfUrl={pdfUrl} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              PDF preview will appear here.
            </div>
          )}
        </div>

        {/* Right: Chat Section */}
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Chat</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No chat messages yet.</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 flex">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none resize-none"
              rows={1}
            />
            <button
              onClick={handleSendChatMessage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
