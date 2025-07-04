function Hero() {
  const [text, setText] = React.useState('');
  const fullText = "Creative Developer & Designer";
  
  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  try {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-left">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6">
                <span className="gradient-text">Hello,</span>
                <br />
                <span className="text-white">I'm Alex</span>
              </h1>
              
              <div className="h-12 sm:h-16 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-2xl lg:text-3xl text-cyan-400 font-light">
                  {text}
                  <span className="animate-pulse ml-1">|</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl">
                Crafting digital experiences that blend creativity with cutting-edge technology. 
                Specializing in interactive design and immersive web solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold hover:scale-105 transition-all duration-300 pulse-glow">
                  View My Work
                </button>
                <button className="px-8 py-4 glass-card rounded-full font-semibold hover:scale-105 transition-all duration-300 border border-cyan-400/50">
                  Download CV
                </button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-6 mt-8">
                {['github', 'linkedin', 'twitter', 'dribbble'].map((social, index) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`icon-${social} text-cyan-400 text-xl`}></div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-slide-right">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden glass-card floating-animation">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-full flex items-center justify-center animate-rotate-in">
                  <div className="icon-zap text-yellow-400 text-2xl pulse-glow"></div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 glass-card rounded-full flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.5s' }}>
                  <div className="icon-heart text-red-400 text-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}