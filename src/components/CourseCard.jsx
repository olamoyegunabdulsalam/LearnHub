import React from "react";

function CourseCard({
  courseTitle,
  courseCode,
  lecturer,
  pdfUrl,
  fileUrl,
  onPreview,
  image,
}) {
  const downloadLink = fileUrl || pdfUrl;
  const displayImage = image || "https://img.icons8.com/ios-filled/100/000000/pdf.png";
  return (
    <div className="bg-white  rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <img className="w-full h-40 object-cover" src={image} alt={courseTitle} />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {courseCode}
        </h2>
        <p className="text-gray-600 mb-1">{courseTitle}</p>
        <p className="text-gray-500 text-sm mb-3">
          <strong>Lecturer:</strong> {lecturer}
        </p>
      </div>

      <div className="flex gap-3 justify-center pb-4">
        <button
          className="bg-purple-700 cursor-pointer text-white px-5 py-2 rounded hover:bg-purple-600 flex items-center gap-2 transition"
          onClick={onPreview}
        >
          <i className="fa-solid fa-eye"></i>
          Preview
        </button>
        {downloadLink && (
          <a
            className="bg-green-600 cursor-pointer text-white px-5 py-2 rounded hover:bg-green-700 flex items-center gap-2 transition"
            href={downloadLink}
            download
          >
            <i className="fa-solid fa-download"></i>
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
