const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                OVOS Skills Store
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover and share amazing skills for OpenVoiceOS
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Issues
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 OpenVoiceOS Skills Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
