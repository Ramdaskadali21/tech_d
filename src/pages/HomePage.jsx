import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  TrendingUp, 
  Filter,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { postsAPI, categoriesAPI } from '../services/api';
import { formatDate, formatRelativeTime, formatReadingTime, getImageUrl } from '../utils/helpers';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [postsRes, trendingRes, categoriesRes, tagsRes] = await Promise.all([
          postsAPI.getPosts({ limit: 12, sort: 'latest' }),
          postsAPI.getTrendingPosts(5),
          categoriesAPI.getCategoriesWithCounts(),
          postsAPI.getTags()
        ]);

        setPosts(postsRes.data.data.posts);
        setTrendingPosts(trendingRes.data.data.posts);
        setCategories(categoriesRes.data.data.categories);
        setTags(tagsRes.data.data.tags.slice(0, 20)); // Show top 20 tags
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts by category
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category._id === selectedCategory)
    : posts;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading latest content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tech Blog - Latest Technology News, How-To Guides & AI Tools</title>
        <meta name="description" content="Stay updated with the latest technology news, comprehensive how-to guides, and reviews of cutting-edge AI tools and productivity apps." />
        <meta name="keywords" content="technology, tech news, AI tools, how-to guides, gadgets, programming, productivity" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Welcome to Tech Blog</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Latest Tech News & Guides
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover the latest technology trends, learn with our comprehensive guides, 
                and explore cutting-edge AI tools to boost your productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="#latest-posts">
                    Explore Articles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant={selectedCategory === category._id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category._id)}
                    className="flex items-center space-x-1"
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.postCount || 0}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Latest Posts */}
              <section id="latest-posts">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {selectedCategory ? 'Filtered Posts' : 'Latest Articles'}
                  </h2>
                  {selectedCategory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory('')}
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found in this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post, index) => (
                      <Card key={post._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                        {post.featuredImage?.url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={getImageUrl(post.featuredImage.url, 'http://localhost:5000')}
                              alt={post.featuredImage.alt || post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="secondary"
                              style={{ 
                                backgroundColor: `${post.category.color}20`,
                                color: post.category.color,
                                borderColor: `${post.category.color}40`
                              }}
                            >
                              {post.category.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(post.publishedAt)}
                            </span>
                          </div>
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="block group-hover:text-primary transition-colors"
                          >
                            <h3 className="text-xl font-semibold line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                          </Link>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Post Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatReadingTime(post.readingTime)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{post.views || 0}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{post.likes || 0}</span>
                              </div>
                            </div>
                            <Link 
                              to={`/blog/${post.slug}`}
                              className="text-primary hover:underline font-medium"
                            >
                              Read more →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trending Posts */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Trending This Week</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trendingPosts.map((post, index) => (
                    <div key={post._id}>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="block group space-y-2"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                              <span>{post.views || 0} views</span>
                              <span>•</span>
                              <span>{formatRelativeTime(post.publishedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {index < trendingPosts.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Popular Tags</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link
                        key={tag.name}
                        to={`/search?q=${encodeURIComponent(tag.name)}`}
                        className="inline-block"
                      >
                        <Badge 
                          variant="outline" 
                          className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          #{tag.name}
                          <span className="ml-1 text-xs opacity-70">
                            {tag.count}
                          </span>
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardHeader>
                  <h3 className="font-semibold">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    Get the latest tech insights delivered to your inbox.
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    No spam, unsubscribe anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

