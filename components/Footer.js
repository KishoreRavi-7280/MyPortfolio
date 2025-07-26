function Footer() {
  try {
    return (
      <footer className="py-16 relative overflow-hidden bg-gradient-to-t from-gray-900/50 to-transparent" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center pulse-glow">
                  <div className="icon-code text-white text-lg"></div>
                </div>
                <span className="text-xl font-bold gradient-text">Kishore Ravi</span>
              </div>
              <p className="text-gray-300 mb-6">
                Creative developer crafting digital experiences that inspire and engage users through innovative design.
              </p>
              <div className="flex space-x-4">
                {['github', 'linkedin', 'twitter', 'dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                  >
                    <div className={`icon-${social} text-cyan-400 text-lg`}></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Skills', 'Projects'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {['Web Development', 'UI/UX Design', 'Mobile Apps', 'Consulting'].map((service) => (
                  <li key={service}>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-mail text-cyan-400 text-lg"></div>
                  <span className="text-gray-300">kishoresde006@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="icon-phone text-cyan-400 text-lg"></div>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="icon-map-pin text-cyan-400 text-lg"></div>
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Kishore Ravi. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}