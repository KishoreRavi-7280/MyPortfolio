function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: 'ai', content: 'Hi! I\'m Alex\'s AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are Alex's AI assistant for his portfolio website. Alex is a creative developer and designer with 5+ years of experience specializing in React, JavaScript, UI/UX design, and mobile development. 

Key information about Alex:
- Services: Web Development, Mobile Apps, UI/UX Design, Consulting
- Location: San Francisco, CA
- Contact: hello@alexdev.com, +1 (555) 123-4567
- Expertise: React/Next.js, JavaScript/TypeScript, Node.js, Python, Mobile Development
- Completed 150+ projects for 80+ happy clients
- Available for freelance projects and consultations

Answer questions about Alex's services, availability, skills, and how to work with him. Be helpful, professional, and concise.`;

      const response = await invokeAIAgent(systemPrompt, inputMessage);
      
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Sorry, I encountered an error. Please try again or contact Alex directly.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  try {
    return (
      <div className="fixed bottom-6 right-6 z-50" data-name="chatbot" data-file="components/Chatbot.js">
        {isOpen && (
          <div className="mb-4 w-80 h-96 glass-card rounded-2xl flex flex-col animate-scale-in">
            <div className="p-4 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <div className="icon-bot text-white text-sm"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI Assistant</h4>
                    <p className="text-gray-400 text-xs">Ask me about Alex's services</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <div className="icon-x text-lg"></div>
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-600">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="icon-send text-white text-sm"></div>
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 pulse-glow"
        >
          <div className={`icon-${isOpen ? 'x' : 'message-circle'} text-white text-xl`}></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Chatbot component error:', error);
    return null;
  }
}