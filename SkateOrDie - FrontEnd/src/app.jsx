import {createRoot} from 'react-dom/client';
import Menubar from './components/MenuBar';
import { useState } from "react";
import Modal from "./components/Modal";
import ProductModalContent from './components/ProductModalContent';
import Contact from "./pages/Contact";
import Footer from './components/Footer';

function App(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mockproduct = {
        id: 1,
        name: "T Shirt",
        category: "Kläder - Tröjor",
        image: "/images/skate.jpg",
        description: "Cool t-shirt med dödskallar och vapen!!!"
    };

    
    return(
        <div>
            <Menubar/>
            <Contact/>
            <Footer/>
            <p>Freestyling skater</p>
            <img src="https://wallpapercrafter.com/th800/283388-jump-skate-skateboard-and-skater-hd.jpg" alt="" width={500} className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}/>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ProductModalContent product={mockproduct} />
            </Modal>
        </div>
    )
}

const root = createRoot( document.querySelector("#root") );
root.render(<App/>); 