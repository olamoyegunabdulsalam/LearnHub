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
      className="z-20 fixed bg-white rounded-2xl shadow-lg p-5 w-80 float-right right-0"
    >
      <img
        src="img/Avatar.png"
        alt="Avatar"
        className="w-24 h-24 mx-auto rounded-full border-4 border-white drop-shadow-md"
      />
      <div className="pt-4">
        <div className="text-center border-b border-gray-200 pb-3">
          <h2 className="font-semibold text-gray-800 text-lg">
            {user?.fullName || "Your Name"}
          </h2>
          <h4 className="text-purple-600 font-medium">
            {user?.course || "Course of Study"}
          </h4>
          <h6 className="text-gray-500">{user?.matricNumber || "Matric"}</h6>
        </div>

        <div className="grid grid-flow-row divide-y divide-gray-200 text-center">
          <button className="p-3 hover:cursor-pointer hover:bg-purple-50 hover:text-purple-700 font-medium transition-all duration-200 bg-purple-50 text-purple-700">
            <i className="fa-regular fa-heart text-purple-600 mr-2"></i>
            Favorite
          </button>
          <button
            onClick={openUpload}
            className="px-3 py-1 bg-purple-700 cursor-pointer text-white rounded-md hover:bg-purple-600"
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
            className="p-3 hover:cursor-pointer hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200"
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-red-500 mr-2"></i>
            Logout
          </button>
        </div>

        <div className="mt-4 mb-6 max-h-40 overflow-y-auto text-left">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="border-b py-2 text-sm text-gray-700 flex justify-between items-center"
              >
                <span>{item.courseTitle}</span>
                <i className="fa-solid fa-heart text-purple-600"></i>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm">
              No favorites yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
