function Newsletter() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('newsletter');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  const sendWelcomeEmail = async (subscriberData) => {
    try {
      const systemPrompt = `You are an AI assistant for Alex's portfolio website. Generate a professional welcome email for a new newsletter subscriber. The email should be warm, welcoming, and explain what they can expect from the newsletter.

Include:
- Welcome message
- What they'll receive (web development tips, design insights, tutorials)
- Frequency of emails
- Personal touch from Alex
- Professional signature

Keep it concise and engaging.`;

      const userPrompt = `Generate a welcome email for ${subscriberData.name} who just subscribed to Alex's newsletter at ${subscriberData.email}`;
      
      const emailContent = await invokeAIAgent(systemPrompt, userPrompt);
      
      // Store the welcome email in database for tracking
      await trickleCreateObject('email_log', {
        recipient: subscriberData.email,
        subject: 'Welcome to Alex\'s Newsletter!',
        content: emailContent,
        type: 'welcome',
        sent_at: new Date().toISOString()
      });
      
      console.log('Welcome email generated and logged:', emailContent);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const subscriberData = {
        ...formData,
        subscribed_at: new Date().toISOString(),
        status: 'active'
      };
      
      await trickleCreateObject('newsletter', subscriberData);
      await sendWelcomeEmail(subscriberData);
      
      setIsSubscribed(true);
      setFormData({ name: '', email: '' });
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  try {
    return (
      <section id="newsletter" className="py-20 relative overflow-hidden" data-name="newsletter" data-file="components/Newsletter.js">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-purple-900/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="morph-card p-8 md:p-12">
              {!isSubscribed ? (
                <div>
                  <div className="mb-8">
                    <div className="icon-mail text-4xl text-cyan-400 mb-4 pulse-glow mx-auto"></div>
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Stay Updated</h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                      Get the latest insights on web development, design trends, and tech tutorials delivered straight to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="space-y-4 mb-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass-card rounded-lg bg-transparent text-white placeholder-gray-400 border border-cyan-400/30 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 glass-card rounded-lg bg-transparent text-white placeholder-gray-400 border border-cyan-400/30 focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300 pulse-glow disabled:opacity-50"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                    </button>
                  </form>

                  <p className="text-sm text-gray-400 mt-4">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </div>
              ) : (
                <div className="animate-scale-in">
                  <div className="icon-check-circle text-5xl text-green-400 mb-4 mx-auto"></div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You for Subscribing!</h3>
                  <p className="text-gray-300">
                    You'll receive our latest content and updates directly in your inbox.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Newsletter component error:', error);
    return null;
  }
}