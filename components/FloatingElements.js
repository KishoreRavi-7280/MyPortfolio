function FloatingElements() {
  const shapes = [
    { size: 'w-4 h-4', color: 'bg-cyan-400', delay: 0 },
    { size: 'w-6 h-6', color: 'bg-purple-500', delay: 0.5 },
    { size: 'w-3 h-3', color: 'bg-yellow-400', delay: 1 },
    { size: 'w-5 h-5', color: 'bg-pink-500', delay: 1.5 },
    { size: 'w-2 h-2', color: 'bg-green-400', delay: 2 }
  ];

  try {
    return (
      <div className="fixed inset-0 pointer-events-none z-0" data-name="floating-elements" data-file="components/FloatingElements.js">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute ${shape.size} ${shape.color} rounded-full opacity-20 floating-animation`}
            style={{
              left: `${10 + index * 20}%`,
              top: `${20 + index * 15}%`,
              animationDelay: `${shape.delay}s`
            }}
          />
        ))}
        
        <div className="absolute top-1/4 right-10 w-32 h-32 border border-cyan-400/20 rounded-full floating-animation opacity-30"></div>
        <div className="absolute bottom-1/4 left-10 w-24 h-24 border border-purple-500/20 rounded-full floating-animation opacity-30" style={{ animationDelay: '1s' }}></div>
        
        <div className="absolute top-1/2 left-1/4 w-1 h-20 bg-gradient-to-b from-cyan-400/30 to-transparent floating-animation"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-16 bg-gradient-to-b from-purple-500/30 to-transparent floating-animation" style={{ animationDelay: '0.5s' }}></div>
      </div>
    );
  } catch (error) {
    console.error('FloatingElements component error:', error);
    return null;
  }
}
