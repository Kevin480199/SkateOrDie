import {createRoot} from 'react-dom/client';
import Menubar from './components/MenuBar';


function App(){
    return(
        <div>
            <Menubar/>
            <p>Some text</p>
            <img src="https://wallpapercrafter.com/th800/283388-jump-skate-skateboard-and-skater-hd.jpg" alt="" width={500} />
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 