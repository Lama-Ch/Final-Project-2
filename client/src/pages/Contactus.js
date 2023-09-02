import React from 'react';
import "./contactus.css";


const Contactus = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, 
        please don't hesitate to get in touch with us.</p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
}

export default Contactus;