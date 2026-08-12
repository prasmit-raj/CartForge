import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form Submitted:", formData);

    // Add your backend/API request here later
    alert("Thank you for contacting CartForge!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or need help with your order?
            Get in touch with the CartForge team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              We're here to help. Whether you have a question about a
              product, your order, or CartForge in general, feel free to
              contact us.
            </p>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                ✉
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Email
                </h3>

                <a
                  href="mailto:your-email@example.com"
                  className="text-gray-600 hover:text-blue-600"
                >
                  your-email@example.com
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                ?
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Customer Support
                </h3>

                <p className="text-gray-600">
                  We're happy to help with your questions and concerns.
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                ⏱
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Response Time
                </h3>

                <p className="text-gray-600">
                  We aim to respond to inquiries as soon as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your message about?"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="6"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;