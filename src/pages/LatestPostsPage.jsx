import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Filter,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { postsAPI, categoriesAPI } from '../services/api';
import { formatDate, formatRelativeTime, formatReadingTime, getImageUrl } from '../utils/helpers';

const LatestPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch posts and categories
        const [postsRes, categoriesRes] = await Promise.all([
          postsAPI.getPosts({ 
            limit: 12, 
            sort: 'latest',
            page: currentPage,
            category: selectedCategory || undefined
          }),
          categoriesAPI.getCategoriesWithCounts()
        ]);

        setPosts(postsRes.data.data.posts);
        setTotalPages(postsRes.data.data.pagination.totalPages);
        setCategories(categoriesRes.data.data.categories);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedCategory]);

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading latest posts...</p>
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
        <title>Latest Posts - Tech Blog</title>
        <meta name="description" content="Browse the latest technology posts, news, and guides. Stay updated with the newest content from our tech blog." />
        <meta name="keywords" content="latest posts, tech news, technology articles, blog posts" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Latest Posts
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover our newest articles covering the latest in technology, tutorials, and industry insights.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category:</span>
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryFilter('')}
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={selectedCategory === category._id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryFilter(category._id)}
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

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {selectedCategory ? 'No posts found in this category.' : 'No posts available.'}
              </p>
              {selectedCategory && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => handleCategoryFilter('')}
                >
                  View All Posts
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {posts.map((post) => (
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
                          className="text-primary hover:underline font-medium flex items-center space-x-1"
                        >
                          <span>Read more</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestPostsPage;

