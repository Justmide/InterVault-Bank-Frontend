import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 lg:px-6 md:px-3 px-1">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center mb-4">
            <p className="text-[14px] italic lg:text-[30px] md:text-[20px] sm:text-[17px]">InterVault Bank</p>
          </div>
          <p className="text-sm opacity-90">
            Secure. Smart. Simple. Your trusted partner in modern banking.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {["Open Account", "Savings Plans", "Loan Options", "Support"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:underline hover:ml-1 transition-all duration-300 ease-in-out block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {["About Us", "Careers", "Newsroom", "Terms & Privacy"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:underline hover:ml-1 transition-all duration-300 ease-in-out block"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
          <div className="flex space-x-4 mb-4">
            {[
              "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
              "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
              "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            ].map((d, i) => (
              <a key={i} href="#" className="hover:scale-110 transition-transform duration-300">
                <svg
                  width="24"
                  height="24"
                  fill="rgb(177 29 9)"
                  viewBox="0 0 24 24"
                  className="fill-[rgb(177 29 9)]"
                >
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
          <form className="flex flex-col md:flex-row md:space-y-0 md:space-x-2 sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg text-black placeholder-gray-600 border-2 border-red-400 focus:outline-none focus:ring-2 focus:ring-red-700"
            />
            <button className="w-full bg-red-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="italic text-center text-sm mt-10 border-t border-black/20 pt-6">
        © {new Date().getFullYear()} InterVault Bank. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
