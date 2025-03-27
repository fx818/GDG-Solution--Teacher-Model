"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import jsPDF from "jspdf";
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar,
  FileText,
  PenTool,
  UserCheck,
  Bot,
  Upload,
  Link as LinkIcon,
  Download
} from "lucide-react";

export default function TeacherDashboard() {
  // State for managing input type and content.
  const [inputType, setInputType] = useState("url"); // "url", "file", or "text"
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);

  // Configure dropzone for file uploads.
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // Handle switching between input types.
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setUrl("");
    setFile(null);
    setText("");
    setTestData(null);
    setError(null);
  };

  // Helper: Calls the generate_qa endpoint with given text.
  const callGenerateQA = async (content) => {
    const response = await fetch("http://127.0.0.1:5000/generate_qa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paragraph: content, n: 5 }),
    });
    if (!response.ok) {
      throw new Error("Failed to generate QA");
    }
    const qaData = await response.json();
    // Wrap the array so the UI can use testData.questions.
    return { questions: qaData };
  };

  // Main handler to generate test: extract text (if needed) then call generate_qa.
  const handleGenerateTest = async () => {
    setLoading(true);
    setTestData(null);
    setError(null);
    try {
      let extractedText = "";
      if (inputType === "file") {
        // Upload the file to the file extractor API.
        const formData = new FormData();
        formData.append("file", file);
        const extractResponse = await fetch("http://127.0.0.1:5000/extract_content", {
          method: "POST",
          body: formData,
        });
        if (!extractResponse.ok) {
          throw new Error("Failed to extract content from file");
        }
        const extractData = await extractResponse.json();
        if (extractData.error) {
          throw new Error(extractData.error);
        }
        extractedText = extractData.content;
      } else if (inputType === "url") {
        // Call a hypothetical endpoint to extract content from the URL.
        const urlResponse = await fetch("http://127.0.0.1:5000/extract_url_content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        if (!urlResponse.ok) {
          throw new Error("Failed to extract content from URL");
        }
        const urlData = await urlResponse.json();
        if (urlData.error) {
          throw new Error(urlData.error);
        }
        extractedText = urlData.content;
      } else if (inputType === "text") {
        if (!text.trim()) {
          throw new Error("Text input is empty");
        }
        extractedText = text.trim();
      }
      // Now, call the generate_qa API with the extracted text.
      const qaResult = await callGenerateQA(extractedText);
      setTestData(qaResult);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  // Download generated test as a PDF.
  const handleDownloadPDF = () => {
    if (!testData) return;
    const doc = new jsPDF();
    doc.text("Generated Test", 10, 10);
    let yOffset = 20;
    testData.questions.forEach((q, idx) => {
      doc.text(`${idx + 1}. ${q.question}`, 10, yOffset);
      yOffset += 10;
      // Either display a single answer or list multiple answers.
      if (q.answer) {
        doc.text(`   Answer: ${q.answer}`, 10, yOffset);
        yOffset += 10;
      } else if (q.answers) {
        q.answers.forEach((a) => {
          doc.text(`   - ${a}`, 10, yOffset);
          yOffset += 10;
        });
      }
      yOffset += 10;
    });
    doc.save("generated_test.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow-lg backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Test Management
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

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome & Stats */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, Sarah<span className="text-indigo-600">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample statistics cards */}
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                  +5% growth
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-800">43</p>
              <p className="text-sm text-gray-500 mt-2">Active Students</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8 text-purple-600" />
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  +2.5% improvement
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-800">78%</p>
              <p className="text-sm text-gray-500 mt-2">Average Score</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-rose-600" />
                <span className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                  Upcoming
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-800">7</p>
              <p className="text-sm text-gray-500 mt-2">Pending Tasks</p>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, text: "Create Lecture", color: "indigo" },
              { icon: PenTool, text: "Create Quiz", color: "purple" },
              { icon: UserCheck, text: "Mark Attendance", color: "rose" },
              { icon: Bot, text: "AI Assistant", color: "emerald" },
            ].map((item, index) => (
              <button
                key={index}
                className={`bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center space-y-4 hover:bg-${item.color}-50 transition-colors duration-300 group`}
              >
                <item.icon className={`h-8 w-8 text-${item.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                <p className={`font-semibold text-gray-800 group-hover:text-${item.color}-600 transition-colors duration-300`}>
                  {item.text}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Test Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Generate Test from Content
            </h2>
          </div>

          <div className="space-y-6">
            {/* Input Type Selection */}
            <div className="flex space-x-6 flex-col md:flex-row">
              {["url", "file", "text"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    inputType === type
                      ? "bg-indigo-50 border-2 border-indigo-600"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={inputType === type}
                    onChange={handleInputTypeChange}
                    className="hidden"
                  />
                  {type === "url" ? (
                    <LinkIcon className={`h-5 w-5 ${inputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  ) : type === "file" ? (
                    <Upload className={`h-5 w-5 ${inputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  ) : (
                    <FileText className={`h-5 w-5 ${inputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  )}
                  <span className={`font-medium capitalize ${inputType === type ? "text-indigo-600" : "text-gray-600"}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>

            {/* Input fields based on type */}
            {inputType === "url" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/content"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-300"
                />
              </div>
            )}

            {inputType === "file" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload File
                </label>
                <div
                  {...getRootProps()}
                  className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-600 hover:bg-gray-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-indigo-600" : "text-gray-400"}`} />
                  {isDragActive ? (
                    <p className="text-indigo-600 font-medium">Drop it here!</p>
                  ) : file ? (
                    <p className="text-gray-800 font-medium">{file.name}</p>
                  ) : (
                    <p className="text-gray-500">
                      Drag and drop a file here, or click to select one
                    </p>
                  )}
                </div>
              </div>
            )}

            {inputType === "text" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter or Paste Text
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here..."
                  rows={8}
                  className="text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-300"
                ></textarea>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleGenerateTest}
                disabled={loading || 
                  (inputType === "url" && !url) || 
                  (inputType === "file" && !file) ||
                  (inputType === "text" && !text.trim())
                }
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  loading || (inputType === "url" && !url) || (inputType === "file" && !file) || (inputType === "text" && !text.trim())
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Generate Test"
                )}
              </button>
            </div>

            {error && (
              <div className="text-red-600 text-center font-medium">
                {error}
              </div>
            )}

            {testData && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    Generated Test
                  </h3>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-100 text-indigo-600 font-medium hover:bg-indigo-200 transition-colors duration-300"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {testData.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <p className="font-medium text-gray-800 mb-4">
                        {idx + 1}. {q.question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.answer ? (
                          <div className="p-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-600 transition-colors duration-300">
                            <p className="text-gray-600">{q.answer}</p>
                          </div>
                        ) : (
                          q.answers &&
                          q.answers.map((a, aIdx) => (
                            <div
                              key={aIdx}
                              className="p-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-600 transition-colors duration-300"
                            >
                              <p className="text-gray-600">{a}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
