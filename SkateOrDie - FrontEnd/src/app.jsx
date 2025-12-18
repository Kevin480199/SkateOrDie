import {createRoot} from 'react-dom/client';
import Menubar from './components/MenuBar';
import Contact from "./pages/Contact";

function App(){
    return(
        <div>
            <Menubar/>
            <Contact/>
            <p>Freestyling skater</p>
            <img src="https://wallpapercrafter.com/th800/283388-jump-skate-skateboard-and-skater-hd.jpg" alt="" width={500} />
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 