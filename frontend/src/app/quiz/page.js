"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
  Download,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import QuizPlayer from "@/components/QuizPlayer";

export default function QuizManagement() {
  const [showQuiz, setShowQuiz] = useState(false);

  /* =======================
       Section 1: Quiz Management (Student Records)
  ======================== */
  const studentRecords = [
    { id: 1, name: "Alice", quizzes: 5, average: 80, best: 90 },
    { id: 2, name: "Bob", quizzes: 3, average: 70, best: 75 },
    { id: 3, name: "Charlie", quizzes: 6, average: 85, best: 92 },
    { id: 4, name: "David", quizzes: 4, average: 78, best: 80 },
    { id: 5, name: "Eva", quizzes: 7, average: 88, best: 95 },
    { id: 6, name: "Frank", quizzes: 2, average: 65, best: 70 },
    { id: 7, name: "Grace", quizzes: 5, average: 82, best: 87 },
    { id: 8, name: "Hannah", quizzes: 4, average: 77, best: 80 },
    { id: 9, name: "Ian", quizzes: 6, average: 83, best: 89 },
    { id: 10, name: "Jane", quizzes: 3, average: 75, best: 78 },
    { id: 11, name: "Kyle", quizzes: 5, average: 80, best: 85 },
    { id: 12, name: "Liam", quizzes: 4, average: 79, best: 82 },
  ];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentRecords.length / itemsPerPage);
  const displayedRecords = studentRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const maxAvg = Math.max(...studentRecords.map((s) => s.average));

  /* =======================
       Section 2: Quiz Generation
  ======================== */
  // Support three input types: "url", "file", and "text"
  const [quizInputType, setQuizInputType] = useState("url");
  const [quizUrl, setQuizUrl] = useState("");
  const [quizFile, setQuizFile] = useState(null);
  const [quizText, setQuizText] = useState("");
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizLink, setQuizLink] = useState("");
  const [quizError, setQuizError] = useState("");

  const onQuizDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setQuizFile(acceptedFiles[0]);
      setQuizError("");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onQuizDrop,
    multiple: false,
  });

  const handleQuizInputTypeChange = (e) => {
    setQuizInputType(e.target.value);
    setQuizUrl("");
    setQuizFile(null);
    setQuizText("");
    setQuizData(null);
    setQuizLink("");
    setQuizError("");
  };

  // Function to generate quiz by extracting content (if needed) then calling the MCQ API.
  const handleGenerateQuiz = async () => {
    setQuizLoading(true);
    setQuizData(null);
    setQuizLink("");
    setQuizError("");
    try {
      let extractedText = "";
      if (quizInputType === "file") {
        // Use file extraction API.
        const formData = new FormData();
        formData.append("file", quizFile);
        const res = await fetch("http://127.0.0.1:5000/extract_content", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error("Failed to extract content from file");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        extractedText = data.content;
      } else if (quizInputType === "url") {
        // Use URL extraction API.
        const res = await fetch("http://127.0.0.1:5000/extract_url_content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: quizUrl }),
        });
        if (!res.ok) {
          throw new Error("Failed to extract content from URL");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        extractedText = data.content;
      } else if (quizInputType === "text") {
        if (!quizText.trim()) {
          throw new Error("Text input is empty");
        }
        extractedText = quizText.trim();
      }
      
      // Now call the MCQ generation API.
      const mcqRes = await fetch("http://127.0.0.1:5000/generate_mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraph: extractedText, n: 5 }),
      });
      if (!mcqRes.ok) {
        throw new Error("Failed to generate MCQ");
      }
      const mcqData = await mcqRes.json();
      if (mcqData.error) {
        throw new Error(mcqData.error);
      }
      setQuizData(mcqData);
      console.log(mcqData)
    } catch (err) {
      console.error("Error generating quiz:", err);
      setQuizError(err.message);
    }
    setQuizLoading(false);
  };

  const handleGenerateQuizLink = () => {
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {showQuiz && quizData && (
        <QuizPlayer 
          questions={quizData} 
          onClose={() => setShowQuiz(false)} 
        />
      )}

      {/* Header */}
      <header className="w-full bg-white/80 shadow-lg backdrop-blur-md sticky top-0 z-40 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Quiz Management
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                alt="Profile"
                className="w-10 h-10 rounded-full ring-2 ring-indigo-600 ring-offset-2"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Total Students", value: "156", color: "from-blue-500 to-blue-600" },
            { icon: FileText, label: "Active Quizzes", value: "24", color: "from-purple-500 to-purple-600" },
            { icon: Award, label: "Avg. Score", value: "78%", color: "from-green-500 to-green-600" },
            { icon: Calendar, label: "This Month", value: "+12%", color: "from-orange-500 to-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Section 1: Student Quiz Performance */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Student Performance
              </h2>
            </div>
            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
              Export Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Quizzes Taken</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Average Score</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Best Score</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Progress</th>
                </tr>
              </thead>
              <tbody>
                {displayedRecords.map((student, idx) => (
                  <tr 
                    key={student.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      idx !== displayedRecords.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                          {student.name[0]}
                        </div>
                        <span className="font-medium text-gray-700">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{student.quizzes}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {student.average}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {student.best}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(student.average / maxAvg) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Section 2: Quiz Generation */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              AI Quiz Generator
            </h2>
          </div>

          <div className="space-y-8">
            {/* Input Type Selection */}
            <div className="flex space-x-6 flex-col md:flex-row">
              {["url", "file", "text"].map((type) => (
                <label
                  key={type}
                  className={`flex-1 flex items-center space-x-3 p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    quizInputType === type
                      ? "bg-indigo-50 border-2 border-indigo-600 shadow-lg"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                  onClick={() => setQuizInputType(type)}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={quizInputType === type}
                    onChange={handleQuizInputTypeChange}
                    className="hidden"
                  />
                  {type === "url" ? (
                    <LinkIcon className={`h-6 w-6 ${quizInputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  ) : type === "file" ? (
                    <Upload className={`h-6 w-6 ${quizInputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  ) : (
                    <FileText className={`h-6 w-6 ${quizInputType === type ? "text-indigo-600" : "text-gray-400"}`} />
                  )}
                  <div>
                    <span className={`block font-semibold capitalize ${quizInputType === type ? "text-indigo-600" : "text-gray-700"}`}>
                      {type === "url" ? "Website URL" : type === "file" ? "Upload Document" : "Enter Text"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {type === "url" 
                        ? "Generate quiz from web content" 
                        : type === "file"
                        ? "Upload PDF, DOCX, or TXT files"
                        : "Paste your content here"}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Input fields based on type */}
            {quizInputType === "url" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter URL
                </label>
                <div className="mt-1 flex rounded-xl shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={quizUrl}
                    onChange={(e) => setQuizUrl(e.target.value)}
                    placeholder="https://example.com/quiz-content"
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition-colors duration-300"
                  />
                </div>
              </div>
            )}

            {quizInputType === "file" && (
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
                  <Upload
                    className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? "text-indigo-600" : "text-gray-400"}`}
                  />
                  {isDragActive ? (
                    <p className="text-indigo-600 font-medium">Drop it here!</p>
                  ) : quizFile ? (
                    <p className="text-gray-800 font-medium">{quizFile.name}</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium">
                        Drag and drop a file here, or click to select
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supports PDF, DOCX, or TXT files
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {quizInputType === "text" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter or Paste Text
                </label>
                <textarea
                  value={quizText}
                  onChange={(e) => setQuizText(e.target.value)}
                  placeholder="Enter your content here..."
                  rows={8}
                  className="text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-300"
                ></textarea>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleGenerateQuiz}
                disabled={
                  quizLoading ||
                  (quizInputType === "url" && !quizUrl) ||
                  (quizInputType === "file" && !quizFile) ||
                  (quizInputType === "text" && !quizText.trim())
                }
                className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                  quizLoading ||
                  (quizInputType === "url" && !quizUrl) ||
                  (quizInputType === "file" && !quizFile) ||
                  (quizInputType === "text" && !quizText.trim())
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                {quizLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                    <span>Generating Quiz...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Bot className="w-5 h-5" />
                    <span>Generate Quiz</span>
                  </div>
                )}
              </button>
            </div>

            {quizError && (
              <div className="text-red-600 text-center font-medium">
                {quizError}
              </div>
            )}

            {quizData && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    Generated Quiz
                  </h3>
                  <button
                    onClick={handleGenerateQuizLink}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <PenTool className="h-5 w-5" />
                    <span>Take Quiz</span>
                  </button>
                </div>

                {quizLink && (
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-700">Quiz Link:</p>
                    <p className="text-indigo-600 font-medium">{quizLink}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {quizData.map((q, idx) => {
                    console.log(q)
                    return(
                    <div
                      key={idx}
                      className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                        
                            {Object.keys(q).filter(key => key.startsWith('question')).map(key => (
                              <p key={key} className="font-medium text-gray-800 mb-4">{q[key]}</p>
                            ))}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {q.options.map((option, oIdx) => (
                              <div
                                key={oIdx}
                                className="p-3 rounded-lg bg-white border border-gray-200 hover:border-indigo-600 transition-colors duration-300"
                              >
                                <p className="text-gray-600">{option}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
