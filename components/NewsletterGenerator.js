function NewsletterGenerator() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [newsletters, setNewsletters] = React.useState([]);

  React.useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const response = await trickleListObjects('newsletter_content', 5, true);
        setNewsletters(response.items);
      } catch (error) {
        console.error('Failed to load newsletters:', error);
      }
    };
    loadNewsletters();
  }, []);

  const generateNewsletter = async () => {
    setIsGenerating(true);
    
    try {
      const systemPrompt = `You are Alex's AI content generator for his developer newsletter. Generate engaging newsletter content that includes:
      
      1. A catchy subject line
      2. Personal greeting from Alex
      3. 2-3 main topics covering:
         - Web development trends
         - Design tips
         - Tutorial highlights
         - Industry insights
      4. Call-to-action for readers
      5. Professional sign-off
      
      Make it personal, informative, and engaging for web developers and designers.`;

      const userPrompt = `Generate a weekly newsletter for Alex's subscribers focusing on current web development trends, design insights, and practical tips.`;
      
      const content = await invokeAIAgent(systemPrompt, userPrompt);
      
      await trickleCreateObject('newsletter_content', {
        subject: `Alex's Dev Weekly - ${new Date().toLocaleDateString()}`,
        content: content,
        generated_at: new Date().toISOString(),
        status: 'draft'
      });
      
      // Reload newsletters
      const response = await trickleListObjects('newsletter_content', 5, true);
      setNewsletters(response.items);
      
      alert('Newsletter content generated successfully!');
    } catch (error) {
      alert('Failed to generate newsletter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  try {
    return (
      <div className="py-8 px-4 max-w-4xl mx-auto" data-name="newsletter-generator" data-file="components/NewsletterGenerator.js">
        <div className="morph-card p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Newsletter Content Generator</h3>
          
          <button
            onClick={generateNewsletter}
            disabled={isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 mb-6"
          >
            {isGenerating ? 'Generating...' : 'Generate New Newsletter'}
          </button>

          <div className="space-y-4">
            {newsletters.map((newsletter, index) => (
              <div key={newsletter.objectId} className="glass-card p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  {newsletter.objectData.subject}
                </h4>
                <p className="text-gray-300 text-sm mb-2">
                  Generated: {new Date(newsletter.objectData.generated_at).toLocaleDateString()}
                </p>
                <div className="text-gray-400 text-sm line-clamp-3">
                  {newsletter.objectData.content.substring(0, 200)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('NewsletterGenerator component error:', error);
    return null;
  }
}