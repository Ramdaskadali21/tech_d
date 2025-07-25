import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Filter,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { categoriesAPI } from '../services/api';
import { formatDate, formatRelativeTime, formatReadingTime, getImageUrl } from '../utils/helpers';

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch category info and posts
        const [categoryRes, postsRes] = await Promise.all([
          categoriesAPI.getCategory(slug),
          categoriesAPI.getCategoryPosts(slug, { page: currentPage, limit: 12 })
        ]);

        setCategory(categoryRes.data.data.category);
        setPosts(postsRes.data.data.posts);
        setPagination(postsRes.data.data.pagination);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Category not found');
        } else {
          setError('Failed to load category. Please try again later.');
        }
        console.error('Error fetching category data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Oops!</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{category.seo?.metaTitle || `${category.name} - Tech Blog`}</title>
        <meta name="description" content={category.seo?.metaDescription || category.description} />
        <meta name="keywords" content={category.seo?.metaKeywords?.join(', ') || category.name} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <Badge 
                  variant="secondary"
                  className="text-sm"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    borderColor: `${category.color}40`
                  }}
                >
                  Category
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                {category.name}
              </h1>
              
              {category.description && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {category.description}
                </p>
              )}

              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <span>{pagination.totalPosts || 0} articles</span>
                <span>•</span>
                <span>{category.totalViews || 0} total views</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {posts.length} of {pagination.totalPosts || 0} articles
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category.</p>
              <Button asChild className="mt-4">
                <Link to="/">Browse All Articles</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {posts.map((post) => (
                  <Card key={post._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {viewMode === 'grid' ? (
                      // Grid view
                      <>
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
                          <div className="flex items-center justify-between">
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
                            </div>
                            <Link 
                              to={`/blog/${post.slug}`}
                              className="text-primary hover:underline font-medium"
                            >
                              Read more →
                            </Link>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      // List view
                      <div className="flex space-x-4 p-6">
                        {post.featuredImage?.url && (
                          <div className="flex-shrink-0 w-32 h-24 overflow-hidden rounded-lg">
                            <img
                              src={getImageUrl(post.featuredImage.url, 'http://localhost:5000')}
                              alt={post.featuredImage.alt || post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="block group-hover:text-primary transition-colors"
                          >
                            <h3 className="text-lg font-semibold line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      onClick={() => handlePageChange(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    disabled={!pagination.hasNextPage}
                    onClick={() => handlePageChange(currentPage + 1)}
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

export default CategoryPage;

