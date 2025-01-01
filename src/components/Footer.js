import React from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="backdrop-blur-sm text-gray-900 py-10 mt-8 bg-white">
      <div id="contact" className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          
          
          <div className="max-w-md text-center md:text-left">
            <span className="text-2xl font-bold text-gray-800">
              About <span className="text-blue-500">Book Finder</span>
            </span>
            <p className="text-gray-600">
              Book Finder helps users explore a wide range of books, discover new titles, and easily manage their personal book collection. Whether you're a reader, a collector, or someone looking for recommendations, Book Finder has you covered.
            </p>
          </div>

        
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Me</h2>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/tharindu-sandeepa99/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-800 hover:text-blue-500 transition"
              >
                <FaLinkedin className="mr-2 text-xl" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:katharindusandeepa@gmail.com"
                className="flex items-center text-gray-800 hover:text-blue-500 transition"
              >
                <FaEnvelope className="mr-2 text-xl" />
                <span>katharindusandeepa@gmail.com</span>
              </a>
              <a
                href="https://github.com/Tharindu-Sandeepa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-800 hover:text-blue-500 transition"
              >
                <FaGithub className="mr-2 text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

       
        <div className="flex flex-col items-center mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tharindu Sandeepa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;