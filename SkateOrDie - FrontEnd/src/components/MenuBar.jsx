export default function Menubar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-slate-900 bg-opacity-80 backdrop-blur-sm px-6 py-4">
      <ul className="flex space-x-6 text-white font-medium">
        <li className="relative group">
          <a href="#" className="hover:text-slate-300">
            HERR
          </a>
          <ul className="absolute left-0 top-full mt-2 w-40 rounded-md bg-slate-800 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Kläder
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Accessoarer
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Skor
              </a>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <a href="#" className="hover:text-slate-300">
            DAM
          </a>
          <ul className="absolute left-0 top-full mt-2 w-40 rounded-md bg-slate-800 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Kläder
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Accessoarer
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-1 hover:bg-slate-700">
                Skor
              </a>
            </li>
          </ul>
        </li>

        <li>
          <a href="#" className="hover:text-slate-300">
            NYHETER
          </a>
        </li>
      </ul>
    </nav>
  );
}
