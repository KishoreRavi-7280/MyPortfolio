function About() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  try {
    return (
      <section id="about" className="py-20 relative overflow-hidden" data-name="about" data-file="components/About.js">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-5xl font-bold gradient-text mb-4">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate about creating digital experiences that inspire and engage users through innovative design and seamless functionality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
              <div className="relative">
                <div id="img1" className="w-full h-96 rounded-3xl overflow-hidden glass-card">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                    alt="Workspace" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-2 w-32 h-32 glass-card rounded-2xl p-4 floating-animation">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">5+</div>
                    <div className="text-sm text-purple-900">Years <br></br>Experience</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="con2" className={`${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
              <h3 id="txt1" className="text-3xl font-bold text-white mb-6">
                Bringing Ideas to Life Through Code & Design
              </h3>
              
              <p id="txt2" className="text-lg text-gray-300 mb-6">
                With over 5 years of experience in web development and design, I specialize in creating 
                immersive digital experiences that combine aesthetic appeal with functional excellence.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: 'palette', label: 'Creative Design', count: '200+' },
                  { icon: 'code', label: 'Projects Built', count: '150+' },
                  { icon: 'users', label: 'Happy Clients', count: '80+' },
                  { icon: 'award', label: 'Awards Won', count: '15+' }
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={`morph-card p-4 text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`icon-${stat.icon} text-2xl text-cyan-400 mb-2`}></div>
                    <div className="text-2xl font-bold text-white">{stat.count}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button id="btn2" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 pulse-glow">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return null;
  }
}