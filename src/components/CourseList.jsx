import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses, searchTerm, setSearchTerm }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const toggleFavorite = (course) => {
    setFavorites((prev) => {
      const isFav = prev.some((c) => c.id === course.id);
      const updated = isFav
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course];

      setToastMessage(
        `${course.courseTitle} ${
          isFav ? "removed from" : "added to"
        } favorites!`
      );
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);

      return updated;
    });
  };

  const openPreview = (course) => setSelectedCourse(course);
  const closePreview = () => setSelectedCourse(null);

  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {showToast && (
        <div className="d-flex justify-center z-30 fixed font-bold left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl transition-all duration-300 animate-fade-in-out">
          {toastMessage}
        </div>
      )}
      <div className="flex justify-center h-15 pt-5">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 p-5 bg-white mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 shadow-sm transition placeholder:italic"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="p-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const isFav = favorites.some((f) => f.id === course.id);
            return (
              <div key={course.id} className="relative">
                <button
                  onClick={() => toggleFavorite(course)}
                  className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-all cursor-pointer ${
                    isFav
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-purple-600"
                  }`}
                >
                  <i
                    className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`}
                  ></i>
                </button>
                <CourseCard {...course} onPreview={() => openPreview(course)} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No courses found.</p>
      )}

      {selectedCourse && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-70 flex justify-center items-center z-50"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-lg w-[90%] md:w-[70%] lg:w-[60%] h-[80%] relative p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-3 right-4 text-red-600 text-xl font-bold hover:text-red-800 cursor-pointer"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-3 text-center">
              {selectedCourse.courseTitle} ({selectedCourse.courseCode})
            </h2>
            <iframe
              src={selectedCourse.pdfUrl || selectedCourse.fileUrl}
              className="w-full h-[90%] border rounded-md"
              title="PDF Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
