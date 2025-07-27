function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  try {
    return (
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card py-2' : 'bg-transparent py-4'
      }`} data-name="navbar" data-file="components/Navbar.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 animate-slide-left">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center pulse-glow">
                <div className="icon-code text-white text-lg"></div>
              </div>
              <span className="text-xl font-bold gradient-text">Kishore Ravi</span>
            </div>

            <div className="hidden md:flex space-x-6">
              {['Home', 'About', 'Skills', 'Projects', 'Blog',  'Contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {item}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass-card"
            >
              <div className={`icon-${isOpen ? 'x' : 'menu'} text-white text-xl`}></div>
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden mt-4 glass-card rounded-xl p-4 animate-scale-in">
              {['Home', 'About', 'Skills', 'Projects', 'Blog',  'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  } catch (error) {
    console.error('Navbar component error:', error);
    return null;
  }
}