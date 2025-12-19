import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_7tl19na",      // din Service ID
        "template_l1kyj0s",     // din Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "eUFUcxufDoFOBI5iD"     // din Public Key
      );

      alert("Meddelandet skickades! 🛹📧");

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Något gick fel, försök igen.");
    }
  };

  return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div className="bg-slate-800 shadow-xl rounded-lg w-full max-w-md p-6">
      
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Hjälp & <span className="text-red-500">Support</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Namn
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            E-post
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-200">
            Meddelande
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded
                     hover:bg-red-700 transition font-semibold"
        >
          Skicka
        </button>
      </form>
    </div>
  </div>
);
}
