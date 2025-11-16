import React, { useState } from "react";

function Header({ onProfileClick }) {
  return (
    <header className="sticky z-20  bg-purple-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <i class="fa-solid fa-book-open"></i>LearnHub
      </h1>

      <button
        className="font-bold cursor-pointer border-2 py-1 rounded-lg hover:bg-purple-700 px-5 border-white-500"
        onClick={onProfileClick}
      >
        My Profile
      </button>
    </header>
  );
}

export default Header;
