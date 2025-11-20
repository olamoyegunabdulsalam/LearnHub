import React, { useEffect, useRef, useState } from "react";

function Profile({ onClose, setLoggedIn, setPage, openUpload }) {
  const CardRef = useRef(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (CardRef.current && !CardRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavs);
    const savedUser = JSON.parse(localStorage.getItem("demoUser"));
    setUser(savedUser);
  }, []);

  return (
    <div
      ref={CardRef}
      className="z-20 fixed bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-purple-600/30 p-5 w-80 float-right right-0 transition-colors duration-200"
    >
      <img
        src="img/Avatar.png"
        alt="Avatar"
        className="w-24 h-24 mx-auto rounded-full border-4 border-white dark:border-gray-700 drop-shadow-md"
      />
      <div className="pt-4">
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
            {user?.fullName || "Your Name"}
          </h2>
          <h4 className="text-purple-600 dark:text-purple-400 font-medium">
            {user?.course || "Course of Study"}
          </h4>
          <h6 className="text-gray-500 dark:text-gray-400">
            {user?.matricNumber || "Matric"}
          </h6>
        </div>

        <div className="grid grid-flow-row divide-y divide-gray-200 dark:divide-gray-700 text-center">
          <button className="p-3 hover:cursor-pointer bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-all duration-200">
            <i className="fa-regular fa-heart text-purple-600 dark:text-purple-400 mr-2"></i>
            Favorite
          </button>

          <button
            onClick={openUpload}
            className="p-3 bg-purple-700 dark:bg-purple-600 cursor-pointer text-white rounded-md hover:bg-purple-600 dark:hover:bg-purple-500 transition-colors duration-200"
          >
            Upload PDF
          </button>

          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("loggedIn");
              localStorage.removeItem("demoUser");
              setPage("login");
              onClose();
            }}
            className="p-3 hover:cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-red-500 dark:text-red-400 mr-2"></i>
            Logout
          </button>
        </div>

        <div className="mt-4 mb-6 max-h-40 overflow-y-auto text-left">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 dark:border-gray-700 py-2 text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center"
              >
                <span>{item.courseTitle}</span>
                <i className="fa-solid fa-heart text-purple-600 dark:text-purple-400"></i>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
              No favorites yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
