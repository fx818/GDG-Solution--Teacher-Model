"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Upload, 
  AlertTriangle, 
  FileText, 
  Languages, 
  Search, 
  Shield, 
  CheckCircle,
  RefreshCw
} from "lucide-react";

export default function PlagiarismChecker() {
  // Toggle between file and text input modes.
  const [inputMode, setInputMode] = useState("file"); // "file" or "text"
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Configure react-dropzone to accept text-based files.
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  // Toggle input mode.
  const handleInputModeChange = (e) => {
    setInputMode(e.target.value);
    setFile(null);
    setTextInput("");
    setResult(null);
  };

  // Simulate API call: In a real app, you would post { text } to your backend.
  const simulateApiCall = async(textContent) => {
    console.log(textContent)
   const response = await fetch("http://127.0.0.1:5000/check_plagiarism", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ text: textContent }),
   })
   console.log(response)
   if(response.ok){
    console.log("hii")
    const data = await response.json();
    console.log(data)
    const dummyResult = {
      plagiarismPercent: Math.round(data.plaque_score*100),
      matchedKeywords: ["education", "learning", "AI", "dashboard", "technology", "innovation"],
      languagesDetected: ["English", "Python", "JavaScript", "HTML"],
      sources: [
        { url: "academic-papers.com/ai-education", similarity: "45%" },
        { url: "research-gate.net/machine-learning", similarity: "33%" }
      ],
      report:
        "The document shows high similarity with publicly available sources and academic papers. Significant matches were found in educational materials and technical articles.",
      severity: "high" // low, medium, or high
    };
    setResult(dummyResult);
    setLoading(false);
   }
   else{
      const dummyResult = {
        plagiarismPercent: 78,
        matchedKeywords: ["education", "learning", "AI", "dashboard", "technology", "innovation"],
        languagesDetected: ["English", "Python", "JavaScript", "HTML"],
        sources: [
          { url: "academic-papers.com/ai-education", similarity: "45%" },
          { url: "research-gate.net/machine-learning", similarity: "33%" }
        ],
        report:
          "The document shows high similarity with publicly available sources and academic papers. Significant matches were found in educational materials and technical articles.",
        severity: "high" // low, medium, or high
      };
      setResult(dummyResult);
      setLoading(false);
   }
    // setTimeout(() => {
    //   const dummyResult = {
    //     plagiarismPercent: 78,
    //     matchedKeywords: ["education", "learning", "AI", "dashboard", "technology", "innovation"],
    //     languagesDetected: ["English", "Python", "JavaScript", "HTML"],
    //     sources: [
    //       { url: "academic-papers.com/ai-education", similarity: "45%" },
    //       { url: "research-gate.net/machine-learning", similarity: "33%" }
    //     ],
    //     report:
    //       "The document shows high similarity with publicly available sources and academic papers. Significant matches were found in educational materials and technical articles.",
    //     severity: "high" // low, medium, or high
    //   };
    //   setResult(dummyResult);
    //   setLoading(false);
    // }, 2000);
  };

  // Handler for plagiarism checking.
  const handleCheckPlagiarism = () => {
    if (inputMode === "file" && !file) return;
    if (inputMode === "text" && !textInput.trim()) return;
    setLoading(true);
    setResult(null);

    if (inputMode === "file") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileText = event.target.result;
        simulateApiCall(fileText);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setLoading(false);
      };
      // For simplicity, assume the file is text-based.
      reader.readAsText(file);
    } else {
      simulateApiCall(textInput.trim());
    }
  };

  // Helper: Returns gradient stop classes based on percentage.
  const getGradientStops = (percentage) => {
    if (percentage < 30)
      return { from: "stop-color-from-green-500", to: "stop-color-to-emerald-600" };
    if (percentage < 60)
      return { from: "stop-color-from-yellow-500", to: "stop-color-to-orange-600" };
    return { from: "stop-color-from-red-500", to: "stop-color-to-rose-600" };
  };

  // Helper: Returns text color class based on percentage.
  const getSeverityColor = (percentage) => {
    if (percentage < 30) return "text-green-500";
    if (percentage < 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Circular Progress Bar component with SVG animation.
  const CircularProgressBar = ({ percentage }) => {
    const radius = 80;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const gradientStops = getGradientStops(percentage);

    return (
      <div className="relative">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="opacity-25"
          />
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ 
              strokeDashoffset,
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={gradientStops.from} />
              <stop offset="100%" className={gradientStops.to} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className={`text-4xl font-bold ${getSeverityColor(percentage)}`}>
            {percentage}%
          </span>
          <span className="text-sm text-gray-500">Similarity</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Plagiarism Checker
          </h1>
        </div>
        <p className="text-gray-600">
          Upload your document or paste text to check for potential plagiarism and content similarity.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Input Mode Toggle */}
        <div className="flex space-x-4 mb-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="file"
              checked={inputMode === "file"}
              onChange={handleInputModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="text-gray-700">File Upload</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value="text"
              checked={inputMode === "text"}
              onChange={handleInputModeChange}
              className="form-radio text-indigo-600"
            />
            <span className="text-gray-700">Paste Text</span>
          </label>
        </div>

        {/* Input Area */}
        {inputMode === "file" ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Upload Your Document</h2>
              </div>
              <div
                {...getRootProps()}
                className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${
                  isDragActive
                    ? "border-indigo-600 bg-indigo-50 scale-[0.99]"
                    : "border-gray-300 hover:border-indigo-600 hover:bg-gray-50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload
                  className={`h-12 w-12 mx-auto mb-4 transition-colors duration-300 ${
                    isDragActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                {isDragActive ? (
                  <p className="text-indigo-600 font-medium animate-pulse">
                    Drop your file here...
                  </p>
                ) : file ? (
                  <div className="space-y-2">
                    <p className="text-gray-800 font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      Click or drag another file to replace
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-700 font-medium">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOCX, DOC, and TXT files
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter or Paste Text
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste your text here..."
                rows={8}
                className=" text-black w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors duration-300"
              ></textarea>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleCheckPlagiarism}
            disabled={
              (inputMode === "file" && !file) ||
              (inputMode === "text" && !textInput.trim()) ||
              loading
            }
            className={`
                px-8 py-4 rounded-xl font-semibold text-white 
                flex items-center space-x-2
                transition-all duration-300
                ${((inputMode === "file" && !file) || (inputMode === "text" && !textInput.trim())) || loading
                  ? "bg-gray-400 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105"
                }
              `}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analyzing Document...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Check for Plagiarism</span>
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 animate-fadeIn">
            {/* Result Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Results</h2>
                <p className="text-gray-600">Document scan completed</p>
              </div>
              {result.plagiarismPercent >= 60 ? (
                <AlertTriangle className="h-8 w-8 text-red-500" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-500" />
              )}
            </div>

            {/* Progress and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center">
                <CircularProgressBar percentage={result.plagiarismPercent} />
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Languages className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">Languages Detected</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.languagesDetected.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">Matched Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Report */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Similar Sources Found</h3>
              <div className="space-y-3">
                {result.sources.map((source, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                  >
                    <span className="text-indigo-600 hover:underline cursor-pointer">
                      {source.url}
                    </span>
                    <span className="font-medium text-gray-700">{source.similarity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Summary</h3>
                <p className="text-gray-700 leading-relaxed">{result.report}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styled JSX for animations and stop-color classes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .stop-color-from-green-500 {
          stop-color: #22c55e;
        }
        .stop-color-to-emerald-600 {
          stop-color: #059669;
        }
        .stop-color-from-yellow-500 {
          stop-color: #eab308;
        }
        .stop-color-to-orange-600 {
          stop-color: #ea580c;
        }
        .stop-color-from-red-500 {
          stop-color: #ef4444;
        }
        .stop-color-to-rose-600 {
          stop-color: #e11d48;
        }
      `}</style>
    </div>
  );
}
