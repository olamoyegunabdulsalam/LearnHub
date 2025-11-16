import React, { useState } from "react";

function UploadModal({ onClose, addUpload }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleUpload = () => {
    if (!pdfFile || !title) return;

    const newPDF = {
      id: Date.now(),
      courseTitle: title,
      courseCode: code,
      lecturer: lecturer,
      pdfUrl: URL.createObjectURL(pdfFile),
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : "/img/default-course.png",
      uploaded: true,
    };

    addUpload(newPDF);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Upload Your Course PDF
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Course Code"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <input
            type="text"
            placeholder="Lecturer Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Image (optional):
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="cursor-pointer px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-upload"></i> Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
