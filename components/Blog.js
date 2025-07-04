function Blog() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('blog');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await trickleListObjects('blog', 10, true);
        const publishedPosts = response.items.filter(post => post.objectData.published);
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      }
    };
    loadPosts();
  }, []);

  try {
    return (
      <section id="blog" className="py-20 relative overflow-hidden" data-name="blog" data-file="components/Blog.js">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Latest Blog Posts</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on modern web development and design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <article 
                key={post.objectId}
                className={`group morph-card overflow-hidden cursor-pointer ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.objectData.image}
                    alt={post.objectData.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                    {post.objectData.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{post.objectData.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.objectData.tags?.split(',').map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full text-sm text-cyan-300 border border-cyan-500/30"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Blog component error:', error);
    return null;
  }
}