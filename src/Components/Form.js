import React, { useState } from "react";
import axios from "axios";
import SummarizedText from "./SummarizedText";

export default function Form() {
  const [file, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [summary, setSummary] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + " KB",
      });
    }
  };

  const handleSubmit = async (event) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/summarize",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

// const handleSubmit = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", file);
  
//     try {
//       const response = await fetch("http://127.0.0.1:5000/summarize", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         setSummary(data.summary); // ✅ Update summary state
//       } else {
//         console.error("Error:", data.error);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };
  
  return (
    <div>
      <div className="max-w-sm mx-auto bg-slate-800 shadow-lg rounded-lg overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="bg-gray-500 text-white px-4 py-3 font-semibold text-lg mb-3">
          <h1 className="text-center text-white">
            Choose the file to summarize
          </h1>
        </div>

        {/* Body */}
        <form action="">
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="file" className="text-gray-300 font-medium">
              Upload File
            </label>

            {/* Custom File Input Button */}
            <label
              htmlFor="file"
              className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Choose File
            </label>

            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Display File Name & Size */}
            {file && (
              <div className="text-gray-400 text-sm mt-2 mb-2">
                <p>
                  <strong>File:</strong> {file.name}
                </p>
                <p>
                  <strong>Size:</strong> {file.size}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-500 px-4 py-3 text-center">
            <button
              className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-600 mx-4"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
            <button
              className="px-4 py-2 outline outline-slate-900 bg-slate-500 text-white rounded-md hover:bg-slate-900"
              onClick={() => setFile(null)}
            >
              CANCEL
            </button>
          </div>
        </form>
        {/* Display Summarized Text */}
        {/* {summary && <SummarizedText text={summary}/>} */}
      </div>
      <div className="form d-flex justify-content-center align-items-center">
        <SummarizedText text={summary} />
      </div>
    </div>
  );
}
