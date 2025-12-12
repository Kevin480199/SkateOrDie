
export default function Menubar(){

    return(
        <div>
            <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4 text-white">
                <li className="relative group">
                    <a href="#" className="px-4 py-2 block hover:bg-gray-700 rounded">HERR</a>
                    
                    <ul className="absolute left-0 top-full w-40 bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Kläder</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Accessoarer</a></li>
                        <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Skor</a></li>
                    </ul>
                </li>

                <li className="relative group">
                    <a href="#" className="px-4 py-2 block hover:bg-gray-700 rounded">DAM</a>
                <ul className="absolute left-0 top-full w-40 bg-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Kläder</a></li>
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Accessoarer</a></li>
                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-600 rounded">Skor</a></li>
                </ul></li>
            </ul>
            </nav>
        </div>
    )
}