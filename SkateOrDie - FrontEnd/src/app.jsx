import { createRoot } from "react-dom/client";
import Menubar from "./components/MenuBar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Menubar />
      <Home />
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
