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
    <div>
      <h1>Contact Support</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Namn</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>E-post</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Meddelande</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Skicka</button>
      </form>
    </div>
  );
}
