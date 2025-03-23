"use client"

import Image from "next/image"
import React, { useRef, useState } from "react"
import {
  Play,
  Pause,
  SquareDivide,
  Languages,
  Microscope,
  Computer,
  // ...any other icons from Lucide or your icon library
} from "lucide-react"

// Example chat icons (you can replace with custom icons)
import { MessageCircle, Send, MoreVertical } from "lucide-react"

export default function ChatSection() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header / Nav Bar */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between py-4 text-sm md:text-base gap-4 overflow-x-auto">
            {/* Replace or add more nav items as needed */}
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
            {/* <li className="cursor-pointer hover:text-gray-400 whitespace-nowrap">
              Healthcare
            </li> */}
          </ul>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Column: Video & Overlay */}
        <div className="relative w-full md:w-2/3 bg-[#121212] rounded-xl overflow-hidden shadow-md flex">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-auto"
            poster="/poster.jpg" // Update to your actual poster image
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="https://framerusercontent.com/assets/WGdMSI7rMnyC5wedujwMKYP9iPU.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Overlay Button */}
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

          {/* Top-left overlay: Name & ID */}
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-3 py-2 rounded-md">
            <p className="font-semibold text-sm">Alyssa</p>
            <p className="text-xs text-gray-300">AI Teacher Support ⇒ z:maths</p>
          </div>
        </div>

        {/* Right Column: Chat */}
        <div className="w-full md:w-1/3 bg-[#1a1a1a] rounded-xl shadow-md flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h2 className="font-semibold text-sm md:text-base">
                How can I help you?
              </h2>
            </div>
            <button className="p-1 hover:bg-[#2a2a2a] rounded transition">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Agent Message */}
            <div className="flex items-start space-x-2">
              {/* Agent Avatar */}
              <div className="w-8 h-8 rounded-full bg-yellow-600 flex-shrink-0" />
              <div className="bg-[#2a2a2a] px-3 py-2 rounded-lg max-w-[80%]">
                <p className="text-sm leading-relaxed">
                  Well that is a great question! We can start by referrring the text. Once
                  you reach page 30 on your textbook do let me know, I’ll start the explaination process for you.
                </p>
              </div>
            </div>

            {/* Example Timestamps & Items */}
            <div className="flex flex-col space-y-2 text-sm text-gray-500">
              <div className="self-start bg-[#2a2a2a] px-3 py-2 rounded-lg max-w-xs">
                <p>Loading the explaination...</p>
              </div>
              <div className="self-start bg-[#2a2a2a] px-3 py-2 rounded-lg max-w-xs">
                <p>Reading through content...</p>
              </div>
              <div className="self-start bg-[#2a2a2a] px-3 py-2 rounded-lg max-w-xs">
                <p>Explaination complete</p>
              </div>
              <button
                type="button"
                className="self-start text-blue-500 hover:underline text-xs"
              >
                re-evaluate
              </button>
            </div>

            {/* User Message */}
            <div className="flex items-start justify-end space-x-2">
              <div className="bg-[#333333] px-3 py-2 rounded-lg max-w-[80%]">
                <p className="text-sm leading-relaxed">
                  Please begin the doubt clearing.
                </p>
              </div>
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[#2a2a2a] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1">
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
