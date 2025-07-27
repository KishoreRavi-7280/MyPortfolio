function Skills() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [animatedBars, setAnimatedBars] = React.useState({});

  const skills = [
    { name: 'Html5/CSS3', level: 95, color: 'from-blue-400 to-cyan-400' },
    { name: 'React/Tailwindcss', level: 88, color: 'from-yellow-400 to-orange-400' },
    { name: 'JavaScript/TypeScript', level: 83, color: 'from-pink-400 to-purple-400' },
    { name: 'Node.js/Express', level: 80, color: 'from-green-400 to-emerald-400' },
    { name: 'Python/Django', level: 76, color: 'from-blue-600 to-blue-400' },
    { name: 'Mobile Development', level: 70, color: 'from-indigo-400 to-purple-400' }
  ];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedBars(prev => ({ ...prev, [skill.name]: true }));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('skills');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  try {
    return (
      <section id="skills" className="py-20 relative overflow-hidden" data-name="skills" data-file="components/Skills.js">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/10 to-purple-900/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-5xl font-bold gradient-text mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mastering the latest technologies and design principles to deliver exceptional digital solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
              <h3 id="txt" className="text-3xl font-bold text-white mb-8">Technical Proficiency</h3>
              
              <div id="skill" className="space-y-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-white">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className=" w-60 h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out ${
                          animatedBars[skill.name] ? '' : 'w-0'
                        }`}
                        style={{ 
                          width: animatedBars[skill.name] ? `${skill.level}%` : '0%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="skillbox" className={`${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: 'monitor', title: 'Frontend Development', desc: 'React, Vue, Angular' },
                  { icon: 'server', title: 'Backend Development', desc: 'Node.js, Python, PHP' },
                  { icon: 'smartphone', title: 'Mobile Development', desc: 'React Native, Flutter' },
                  { icon: 'database', title: 'Database Design', desc: 'MongoDB, PostgreSQL' },
                  { icon: 'cloud', title: 'Cloud Services', desc: 'AWS, Google Cloud' },
                  { icon: 'git-branch', title: 'Version Control', desc: 'Git, GitHub, GitLab' }
                ].map((item, index) => (
                  <div 
                    key={item.title}
                    className={`morph-card p-6 text-center hover:scale-105 transition-all duration-300 ${
                      isVisible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className={`icon-${item.icon} text-3xl text-cyan-400 mb-4 pulse-glow`}></div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Skills component error:', error);
    return null;
  }
}