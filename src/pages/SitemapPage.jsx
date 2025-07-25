import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Map, 
  Home, 
  FileText, 
  Users, 
  Mail, 
  Shield,
  Scale,
  Rss,
  Archive,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { postsAPI, categoriesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';

const SitemapPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          postsAPI.getPosts({ limit: 50, sort: 'latest' }),
          categoriesAPI.getCategoriesWithCounts()
        ]);
        
        setPosts(postsRes.data.data.posts);
        setCategories(categoriesRes.data.data.categories);
      } catch (error) {
        console.error('Error fetching sitemap data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const mainPages = [
    { name: 'Home', path: '/', icon: Home, description: 'Main landing page with latest articles' },
    { name: 'Latest Posts', path: '/latest-posts', icon: FileText, description: 'Browse all recent blog posts' },
    { name: 'About Us', path: '/about', icon: Users, description: 'Learn about our team and mission' },
    { name: 'Contact', path: '/contact', icon: Mail, description: 'Get in touch with us' }
  ];

  const legalPages = [
    { name: 'Privacy Policy', path: '/privacy', icon: Shield, description: 'Our privacy and data protection policy' },
    { name: 'Terms of Service', path: '/terms', icon: Scale, description: 'Terms and conditions for using our site' }
  ];

  const resourcePages = [
    { name: 'Newsletter', path: '/newsletter', icon: Rss, description: 'Subscribe to our weekly tech newsletter' },
    { name: 'Archive', path: '/archive', icon: Archive, description: 'Browse posts by date and category' },
    { name: 'Sitemap', path: '/sitemap', icon: Map, description: 'Complete site navigation (current page)' }
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap - Tech Blog</title>
        <meta name="description" content="Complete sitemap of our tech blog including all pages, articles, and resources for easy navigation." />
        <meta name="keywords" content="sitemap, navigation, tech blog, articles, pages" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Map className="h-4 w-4" />
                <span>Site Navigation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Sitemap
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Find everything on our site quickly and easily. Browse all pages, articles, and resources.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Main Pages */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Home className="h-6 w-6 text-primary" />
                  <span>Main Pages</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {mainPages.map((page) => (
                  <Link 
                    key={page.path}
                    to={page.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <page.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {page.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {page.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Legal Pages */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Legal & Company</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {legalPages.map((page) => (
                  <Link 
                    key={page.path}
                    to={page.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <page.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {page.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {page.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Resource Pages */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Rss className="h-6 w-6 text-primary" />
                  <span>Resources</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {resourcePages.map((page) => (
                  <Link 
                    key={page.path}
                    to={page.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <page.icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {page.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {page.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <span>Categories</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  categories.map((category) => (
                    <Link 
                      key={category._id}
                      to={`/category/${category.slug}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium group-hover:text-primary transition-colors flex items-center space-x-2">
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.postCount || 0} posts
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {category.description}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Articles */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span>Recent Articles</span>
              </h2>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Loading articles...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.slice(0, 12).map((post) => (
                    <Link 
                      key={post._id}
                      to={`/blog/${post.slug}`}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="secondary"
                            style={{ 
                              backgroundColor: `${post.category.color}20`,
                              color: post.category.color 
                            }}
                            className="text-xs"
                          >
                            {post.category.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {posts.length > 12 && (
                <div className="text-center mt-6">
                  <Link 
                    to="/latest-posts"
                    className="inline-flex items-center space-x-2 text-primary hover:underline"
                  >
                    <span>View all articles</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* XML Sitemap */}
          <Card className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">XML Sitemap</h3>
                <p className="text-muted-foreground">
                  For search engines and automated tools, you can access our machine-readable sitemap.
                </p>
                <a 
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:underline"
                >
                  <span>View XML Sitemap</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;

