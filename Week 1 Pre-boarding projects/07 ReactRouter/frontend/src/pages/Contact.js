function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>

      <img
        src="https://images.pexels.com/photos/30901556/pexels-photo-30901556.jpeg?w=800"
        className="contact-img"
      />

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;