import { useEffect, useState } from "react";

export default function Menubar(){
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('./data/database.json')
        .then(res => res.json())
        .then(data => setCategory(data.category))
        .catch(err => console.error(err));
    }, []);
    return(
        <div>
            <nav className="bg-black p-4 flex items-center justify-center relative">
  {/* Logo / Title */}
    <a href="#" className="font-bold italic text-xl absolute left-4">
        <span className="text-white">SKATE </span>
        <span className="text-red-500">OR </span>
        <span className="text-white">DIE</span>
    </a>

  {/* Menu items */}
  <ul className="flex space-x-4 text-white">
    <li className="relative group">
    <a href="#" className="px-4 py-2 block hover:bg-gray-900 rounded">Kläder</a>

  <ul className="absolute left-0 top-full w-40 bg-gray-900 rounded shadow-lg
                 opacity-0 translate-y-2 scale-95
                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                 pointer-events-none group-hover:pointer-events-auto
                 transition-all duration-200 ease-out z-10">
    {category.map(cate => (
      <li key={cate.title}>
        <a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">{cate.title}</a>
      </li>
    ))}
    <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Tröjor</a></li>
    <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Byxor</a></li>
    <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Skor</a></li>
  </ul>
</li>


    <li className="relative group">
      <a href="#" className="px-4 py-2 block hover:bg-gray-900 rounded">
        Skateboards
      </a>
      <ul className="absolute left-0 top-full w-40 bg-gray-900 rounded shadow-lg
                     opacity-0 translate-y-2 scale-95
                     group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                     transition-all duration-200 pointer-events-none group-hover:pointer-events-auto
                     z-10">
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Brädor</a></li>
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Hjul</a></li>
        <li><a href="#" className="block px-4 py-2 hover:bg-gray-800 rounded">Accessoarer</a></li>
      </ul>
    </li>
    <li className="relative group">
  <a href="./pages/Contact.jsx" className="px-4 py-2 block hover:bg-gray-900 rounded">Kontakta oss</a>
    </li>
  </ul>
</nav>

        </div>
    )
}