function Testimonials() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [testimonials, setTestimonials] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await trickleListObjects('testimonial', 10, true);
        setTestimonials(response.items);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      }
    };
    loadTestimonials();
  }, []);

  React.useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`icon-star text-xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      ></div>
    ));
  };

  try {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden" data-name="testimonials" data-file="components/Testimonials.js">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-5xl font-bold gradient-text mb-4">Client Testimonials</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What clients say about working with me and the impact of our collaborations.
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="relative">
                <div className="morph-card p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <img
                      src={testimonials[currentIndex].objectData.avatar}
                      alt={testimonials[currentIndex].objectData.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400/50"
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-1 mb-6">
                    {renderStars(testimonials[currentIndex].objectData.rating)}
                  </div>
                  
                  <blockquote className="text-xl text-gray-300 mb-6 italic">
                    "{testimonials[currentIndex].objectData.message}"
                  </blockquote>
                  
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {testimonials[currentIndex].objectData.name}
                    </h4>
                    <p className="text-cyan-400">
                      {testimonials[currentIndex].objectData.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-cyan-400 scale-125'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Testimonials component error:', error);
    return null;
  }
}