const AnimationUtils = {
  // Intersection Observer for scroll animations
  createScrollObserver: (callback, options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    };
    
    return new IntersectionObserver(callback, defaultOptions);
  },

  // Stagger animation for multiple elements
  staggerAnimation: (elements, className, delay = 100) => {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(className);
      }, index * delay);
    });
  },

  // Parallax scroll effect
  parallaxScroll: (element, speed = 0.5) => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },

  // Smooth scroll to element
  smoothScrollTo: (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  },

  // Mouse follow effect
  mouseFollowEffect: (element, intensity = 0.1) => {
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      element.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  },

  // Typing animation
  typeWriter: (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return timer;
  },

  // Reveal animation on scroll
  revealOnScroll: () => {
    const reveals = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => observer.observe(reveal));
  }
};