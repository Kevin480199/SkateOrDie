import { useEffect, useState } from "react";
import { loadDb } from "../services/dbStore";
import { Link } from "react-router-dom";

export default function Menubar() {
  const db = loadDb();
  const categories = db.categories;
  return (
    <div>
      <nav className="bg-black p-4 flex items-center justify-center relative">
        {/* Logo / Title */}
        <Link
          to="/"
          className="absolute left-4 px-4 py-2 block font-bold italic hover:bg-gray-900 rounded"
        >
          <span className="text-white">SKATE </span>
          <span className="text-red-500">OR </span>
          <span className="text-white">DIE</span>
        </Link>

        {/* Menu items */}
        <ul className="flex space-x-4 text-white">
          <li className="relative group">
            <a href="#" className="px-4 py-2 block hover:bg-gray-900 rounded">
              Kläder
            </a>

            <ul
              className="absolute left-0 top-full w-40 bg-gray-900 rounded shadow-lg
                 opacity-0 translate-y-2 scale-95
                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                 pointer-events-none group-hover:pointer-events-auto
                 transition-all duration-200 ease-out z-10"
            >
              {categories
                .filter((category) => category.parentId === 1) // filter by parentId
                .map((category) => (
                  <li key={category.id}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-800 rounded"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </li>

          <li className="relative group">
            <a href="#" className="px-4 py-2 block hover:bg-gray-900 rounded">
              Skateboards
            </a>
            <ul
              className="absolute left-0 top-full w-40 bg-gray-900 rounded shadow-lg
                     opacity-0 translate-y-2 scale-95
                     group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                     transition-all duration-200 pointer-events-none group-hover:pointer-events-auto
                     z-10"
            >
              {categories
                .filter((category) => category.parentId === 4) // filter by parentId
                .map((category) => (
                  <li key={category.id}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-800 rounded"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </li>
          <li className="relative group">
            <Link
              to="/contact"
              className="px-4 py-2 block hover:bg-gray-900 rounded"
            >
              Kontakta oss
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
