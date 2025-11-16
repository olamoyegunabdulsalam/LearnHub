import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import CourseList from "./components/CourseList";
import { pdfList } from "./data/pdf";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadModal from "./components/UploadModal";

function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const addUpload = (pdf) => {
    setUploads((prev) => [...prev, pdf]);
  };

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFav);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const savedUploads = JSON.parse(localStorage.getItem("uploads")) || [];
    setUploads(savedUploads);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploads", JSON.stringify(uploads));
  }, [uploads]);

  const toggleFavorite = (course) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === course.id)
        ? prev.filter((item) => item.id !== course.id)
        : [...prev, course]
    );
  };

  const allCourses = [...pdfList, ...uploads];
  const filteredCourses = allCourses.filter(
    (course) =>
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      {/* LOGIN PAGE */}
      {!loggedIn && page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          onLogin={() => setLoggedIn(true)}
        />
      )}

      {/* SIGNUP PAGE */}
      {!loggedIn && page === "signup" && (
        <Signup
          goToLogin={() => setPage("login")}
          onLogin={() => setLoggedIn(true)}
        />
      )}

      {/* DASHBOARD ONLY AFTER LOGIN */}
      {loggedIn && (
        <div className="w-full bg-gray-100 text-black transition-colors duration-500">
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onProfileClick={() => setShowProfile(true)}
          />

          {showProfile && (
            <Profile
              onClose={() => setShowProfile(false)}
              favorites={favorites}
              setLoggedIn={setLoggedIn}
              setPage={setPage}
              openUpload={() => setShowUpload(true)}
            />
          )}

          {showUpload && (
            <UploadModal
              onClose={() => setShowUpload(false)}
              addUpload={addUpload}
            />
          )}

          <CourseList
            courses={filteredCourses}
            favorites={favorites}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleFavorite={toggleFavorite}
          />
        </div>
      )}
    </div>
  );
}

export default App;
