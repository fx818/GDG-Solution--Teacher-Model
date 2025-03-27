// 'use client';

// import { BookOpen } from 'lucide-react';
// import { useState } from 'react';

// function WebsiteViewerIframe({ siteUrl }) {
//   return (
//     <div className="w-full h-full">
//       <iframe
//         src={siteUrl}
//         title="Website Viewer"
//         width="100%"
//         height="100%"
//         className="border-none"
//       ></iframe>
//     </div>
//   );
// }

// export default function URLChat() {
//   // State to hold the submitted URL and temporary URL input
//   const [siteUrl, setSiteUrl] = useState('');
//   const [tempUrl, setTempUrl] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatInput, setChatInput] = useState('');

//   // Handle URL submission form
//   const handleUrlSubmit = (e) => {
//     e.preventDefault();
//     if (tempUrl.trim()) {
//       setSiteUrl(tempUrl.trim());
//       // Optionally, you could send the URL to your backend for processing/indexing here.
//     }
//   };

//   // Send a chat message to the backend (for "chat with URL")
//   const handleSendChatMessage = async () => {
//     if (!chatInput.trim()) return;
//     const userMsg = { type: 'user', text: chatInput };
//     setChatMessages((prev) => [...prev, userMsg]);
    
//     try {
//       // Including the URL in the payload in case the backend needs it
//       const response = await fetch("http://127.0.0.1:5000/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: chatInput, url: siteUrl }),
//       });
//       const data = await response.json();
//       const botMsg = { type: 'bot', text: data.answer || data.error };
//       setChatMessages((prev) => [...prev, botMsg]);
//     } catch (error) {
//       console.error("Error sending chat message:", error);
//       const botMsg = { type: 'bot', text: "Error processing your query." };
//       setChatMessages((prev) => [...prev, botMsg]);
//     }
//     setChatInput('');
//   };

//   return (
//     <>
//       <header className="w-full bg-white shadow-lg backdrop-blur-smsticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <BookOpen className="h-8 w-8 text-indigo-600" />
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               URL Chat
//             </h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <img
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
//               alt="Profile"
//               className="w-10 h-10 rounded-full border-2 border-indigo-600"
//             />
//           </div>
//         </div>
//       </header>

//       <main className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//         {/* Left side: Website Preview & Chat Section */}
//         <div className="md:w-2/3 w-full p-4 space-y-4">
//           {/* Website Preview */}
//           <div className="h-80 md:h-3/5 rounded-xl overflow-hidden bg-white shadow-lg">
//             {siteUrl ? (
//               <WebsiteViewerIframe siteUrl={siteUrl} />
//             ) : (
//               <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
//                 <div className="text-center">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                   <p className="mt-4 text-gray-500">Website preview will appear here</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Chat Section */}
//           <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col">
//             <div className="flex-1 overflow-y-auto h-64 p-2 border border-gray-200 rounded">
//               {chatMessages.length > 0 ? (
//                 chatMessages.map((msg, idx) => (
//                   <div key={idx} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
//                     <span className={`inline-block px-3 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
//                       {msg.text}
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500 text-center">Chat messages will appear here...</p>
//               )}
//             </div>
//             <div className="mt-4 flex">
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//                 placeholder="Type your question..."
//                 className="text-black flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
//               />
//               <button
//                 onClick={handleSendChatMessage}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right side: URL Submission Section */}
//         <div className="md:w-1/3 w-full p-4">
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="max-w-md mx-auto">
//               <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit URL</h1>
//               <form onSubmit={handleUrlSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
//                     Enter Website URL
//                   </label>
//                   <input
//                     type="url"
//                     id="url-input"
//                     value={tempUrl}
//                     onChange={(e) => setTempUrl(e.target.value)}
//                     placeholder="https://example.com"
//                     className="text-black mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                   />
//                 </div>
//                 <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
//                   Submit URL
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

'use client';

import { BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this component exists

function WebsiteViewerIframe({ siteUrl }) {
  return (
    <div className="w-full h-full">
      <iframe
        src={siteUrl}
        title="Website Viewer"
        width="100%"
        height="100%"
        className="border-none"
      ></iframe>
    </div>
  );
}

export default function URLChat() {
  const [siteUrl, setSiteUrl] = useState('');
  const [tempUrl, setTempUrl] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle URL submission.
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (tempUrl.trim()) {
      setSiteUrl(tempUrl.trim());
      // Optionally, send the URL to backend for processing.
    }
  };

  // Send chat message to backend.
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { type: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: chatInput, url: siteUrl }),
      });
      const data = await response.json();
      const botMsg = { type: 'bot', text: data.answer || data.error };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending chat message:", error);
      const botMsg = { type: 'bot', text: "Error processing your query." };
      setChatMessages((prev) => [...prev, botMsg]);
    }
    setChatInput('');
  };

  // Allow sending on Enter key (without Shift).
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <>
      {/* Header */}
      <header className="w-full bg-white shadow-lg backdrop-blur-sm sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              URL Chat
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

      {/* URL Submission Section */}
      <section className="max-w-7xl mx-auto my-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Submit URL</h2>
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
                Enter Website URL
              </label>
              <input
                type="url"
                id="url-input"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://example.com"
                className="text-black mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
              Submit URL
            </button>
          </form>
        </div>
      </section>

      {/* Main Content: Website Preview & Chat */}
      <section className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4">
        {/* Left: Website Preview */}
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg overflow-hidden h-[600px]">
          {siteUrl ? (
            <WebsiteViewerIframe siteUrl={siteUrl} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Website preview will appear here.
            </div>
          )}
        </div>

        {/* Right: Chat Section */}
        <div className="md:w-1/2 w-full bg-white shadow-lg rounded-lg flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Chat</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
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
          </ScrollArea>
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
