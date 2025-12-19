import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Menubar from "./components/MenuBar";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

import Modal from "./components/Modal";
import ProductModalContent from "./components/ProductModalContent";
import Admin from "./pages/Admin";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
      if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Menubar />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home onSelectProduct={setSelectedProduct} />}
          />
          <Route
            path="/products"
            element={<ProductsPage onSelectProduct={setSelectedProduct} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />

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
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
