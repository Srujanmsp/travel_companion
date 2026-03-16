export default function Contact() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">Contact Us</h1>
      <p className="mb-6 text-gray-700">We’d love to hear from you. Reach out with questions, feedback, or partnership ideas.</p>
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-3 rounded" />
        <input type="email" placeholder="Your Email" className="w-full border p-3 rounded" />
        <textarea rows="5" placeholder="Your Message" className="w-full border p-3 rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
