import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Eye, 
  X,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { postsAPI } from '../services/api';
import { formatDate, formatRelativeTime, formatReadingTime, getImageUrl, debounce } from '../utils/helpers';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery, page = 1, sort = 'latest') => {
    if (!searchQuery.trim()) {
      setPosts([]);
      setPagination({});
      setHasSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await postsAPI.getPosts({
        search: searchQuery,
        page,
        limit: 12,
        sort
      });

      setPosts(response.data.data.posts);
      setPagination(response.data.data.pagination);
      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setPosts([]);
      setPagination({});
    } finally {
      setIsLoading(false);
    }
  }, 500);

  // Effect for initial search and URL changes
  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    if (searchQuery) {
      debouncedSearch(searchQuery, currentPage, sortBy);
    }
  }, [searchParams, currentPage, sortBy]);

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setCurrentPage(1);
    }
  };

  // Handle query change
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
      setCurrentPage(1);
    } else {
      setSearchParams({});
      setPosts([]);
      setPagination({});
      setHasSearched(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
    setPosts([]);
    setPagination({});
    setHasSearched(false);
  };

  const currentQuery = searchParams.get('q') || '';

  return (
    <>
      <Helmet>
        <title>{currentQuery ? `Search results for "${currentQuery}" - Tech Blog` : 'Search - Tech Blog'}</title>
        <meta name="description" content={currentQuery ? `Search results for "${currentQuery}" on Tech Blog` : 'Search for articles on Tech Blog'} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <Search className="h-6 w-6 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold">Search Articles</h1>
              </div>
              
              <p className="text-muted-foreground">
                Find the latest tech news, guides, and AI tool reviews
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={query}
                  onChange={handleQueryChange}
                  className="pl-10 pr-10 h-12 text-lg"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search Results Header */}
          {hasSearched && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Search Results
                  </h2>
                  <p className="text-muted-foreground">
                    {pagination.totalPosts > 0 
                      ? `Found ${pagination.totalPosts} article${pagination.totalPosts === 1 ? '' : 's'} for "${currentQuery}"`
                      : `No articles found for "${currentQuery}"`
                    }
                  </p>
                </div>

                {/* Sort Options */}
                {posts.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <div className="flex space-x-1">
                      {[
                        { value: 'latest', label: 'Latest' },
                        { value: 'popular', label: 'Popular' },
                        { value: 'oldest', label: 'Oldest' }
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={sortBy === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSortChange(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Searching...</p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && hasSearched && (
            <>
              {posts.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold">No articles found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any articles matching your search. Try different keywords or browse our categories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={clearSearch}>Clear Search</Button>
                    <Button variant="outline" asChild>
                      <Link to="/">Browse All Articles</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                          <div className="flex items-center justify-between">
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
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={!pagination.hasPrevPage}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                        let page;
                        if (pagination.totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= pagination.totalPages - 2) {
                          page = pagination.totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? 'default' : 'outline'}
                            onClick={() => handlePageChange(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        );
                      })}
                      
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
            </>
          )}

          {/* Default State - No Search */}
          {!hasSearched && !isLoading && (
            <div className="text-center py-12 space-y-6">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold">Start Your Search</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter keywords above to search through our collection of tech articles, guides, and reviews.
              </p>
              
              {/* Popular Search Terms */}
              <div className="space-y-4">
                <h4 className="font-medium">Popular searches:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {['AI tools', 'React', 'JavaScript', 'Python', 'Machine Learning', 'Web Development'].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(term);
                        setSearchParams({ q: term });
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button asChild>
                  <Link to="/">Browse All Articles</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;

