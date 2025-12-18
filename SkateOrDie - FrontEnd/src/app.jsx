import {createRoot} from 'react-dom/client';
import Menubar from './components/MenuBar';
import Admin from "./pages/Admin";


function App(){
    if (window.location.pathname === "/admin") {
    return <Admin />;
  }
    return(
        <div>
            <Menubar/>
            <p>Freestyling skater</p>
            <img src="https://wallpapercrafter.com/th800/283388-jump-skate-skateboard-and-skater-hd.jpg" alt="" width={500} />
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 