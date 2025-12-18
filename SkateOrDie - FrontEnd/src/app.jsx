import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Menubar from "./components/MenuBar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import Modal from "./components/Modal";
import ProductModalContent from "./components/ProductModalContent";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Menubar />

      <main>
        <Home onSelectProduct={setSelectedProduct} />
        <Contact />
      </main>

      <Modal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct ? (
          <ProductModalContent product={selectedProduct} />
        ) : null}
      </Modal>
    </div>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
