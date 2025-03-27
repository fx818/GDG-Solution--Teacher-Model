import { Facebook, Twitter, YouTube, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-2 md:px-16">
      <div className="container mx-auto px-4">
        {/* Social Icons */}
        <div className="w-full flex flex-wrap justify-center space-x-2 md:space-x-6 mb-6">
          {[Facebook, Twitter, Instagram,LinkedIn].map((Icon, index) => (
              <Icon  key={index} />
          ))}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-300 justify-center md:justify-start">
          <div className="text-left">
            <h3 className="font-semibold text-white mb-2">AI Tutor</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Partners</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-white mb-2">Social</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-white mb-2">Service</h3>
            <ul>
              <li><a href="#" className="hover:text-white">All AI solutions</a></li>
              <li><a href="#" className="hover:text-white">3D Design and Drawing Solutions</a></li>
              <li><a href="#" className="hover:text-white">Allied Services</a></li>
            </ul>
          </div>

          {/* <div className="text-center md:text-left">
            <h3 className="font-semibold text-white mb-2">Activity</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Influencers</a></li>
              <li><a href="#" className="hover:text-white">Affiliate</a></li>
              <li><a href="#" className="hover:text-white">Co-branding</a></li>
              <li><a href="#" className="hover:text-white">Honor</a></li>
              <li><a href="#" className="hover:text-white">Giveaway</a></li>
            </ul>
          </div> */}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">Subscribe to our newsletter</p>
          <div className="flex mt-3 md:mt-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-800 text-white rounded-l-lg outline-none border border-gray-600"
            />
            <button className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6">
          <p>
            Copyright © 2025
            <span className="font-semibold">AI Tutor</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}