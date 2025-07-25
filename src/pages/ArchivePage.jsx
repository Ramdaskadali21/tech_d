import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Archive, 
  Calendar, 
  Filter,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { postsAPI, categoriesAPI } from '../services/api';
import { formatDate, formatRelativeTime, formatReadingTime, getImageUrl } from '../utils/helpers';

const ArchivePage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [groupedPosts, setGroupedPosts] = useState({});
  const [expandedYears, setExpandedYears] = useState(new Set());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [postsRes, categoriesRes] = await Promise.all([
          postsAPI.getPosts({ 
            limit: 100, 
            sort: 'latest',
            category: selectedCategory || undefined
          }),
          categoriesAPI.getCategoriesWithCounts()
        ]);

        const allPosts = postsRes.data.data.posts;
        setPosts(allPosts);
        setCategories(categoriesRes.data.data.categories);

        // Group posts by year and month
        const grouped = allPosts.reduce((acc, post) => {
          const date = new Date(post.publishedAt);
          const year = date.getFullYear();
          const month = date.getMonth();
          
          if (!acc[year]) {
            acc[year] = {};
          }
          if (!acc[year][month]) {
            acc[year][month] = [];
          }
          
          acc[year][month].push(post);
          return acc;
        }, {});

        setGroupedPosts(grouped);
        
        // Auto-expand current year
        const currentYear = new Date().getFullYear();
        setExpandedYears(new Set([currentYear]));
        
      } catch (error) {
        console.error('Error fetching archive data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const toggleYear = (year) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const getFilteredPosts = () => {
    if (!selectedYear && !selectedMonth) {
      return posts;
    }

    return posts.filter(post => {
      const date = new Date(post.publishedAt);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (selectedYear && year !== parseInt(selectedYear)) {
        return false;
      }
      if (selectedMonth && month !== parseInt(selectedMonth)) {
        return false;
      }
      return true;
    });
  };

  const getAvailableYears = () => {
    return Object.keys(groupedPosts).map(year => parseInt(year)).sort((a, b) => b - a);
  };

  const getAvailableMonths = () => {
    if (!selectedYear) return [];
    const year = parseInt(selectedYear);
    return Object.keys(groupedPosts[year] || {}).map(month => parseInt(month)).sort((a, b) => a - b);
  };

  const filteredPosts = getFilteredPosts();

  return (
    <>
      <Helmet>
        <title>Archive - Tech Blog</title>
        <meta name="description" content="Browse our complete archive of tech articles organized by date and category. Find older posts and explore our content history." />
        <meta name="keywords" content="archive, tech articles, blog posts, date filter, category filter" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Archive className="h-4 w-4" />
                <span>Content Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Article Archive
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore our complete collection of tech articles organized by date and category. 
                Discover insights from our content history.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Archive Navigation */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Filters */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-primary" />
                    <span>Filters</span>
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name} ({category.postCount || 0})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedMonth(''); // Reset month when year changes
                      }}
                      className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">All Years</option>
                      {getAvailableYears().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Month Filter */}
                  {selectedYear && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">All Months</option>
                        {getAvailableMonths().map((monthIndex) => (
                          <option key={monthIndex} value={monthIndex}>
                            {months[monthIndex]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Clear Filters */}
                  {(selectedYear || selectedMonth || selectedCategory) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedYear('');
                        setSelectedMonth('');
                        setSelectedCategory('');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Archive Tree */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Browse by Date</span>
                  </h3>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {getAvailableYears().map((year) => (
                        <div key={year}>
                          <button
                            onClick={() => toggleYear(year)}
                            className="flex items-center space-x-2 w-full text-left p-2 rounded hover:bg-muted/50 transition-colors"
                          >
                            {expandedYears.has(year) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="font-medium">{year}</span>
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {Object.values(groupedPosts[year] || {}).reduce((sum, posts) => sum + posts.length, 0)}
                            </Badge>
                          </button>
                          
                          {expandedYears.has(year) && (
                            <div className="ml-6 space-y-1">
                              {Object.keys(groupedPosts[year] || {})
                                .map(month => parseInt(month))
                                .sort((a, b) => b - a)
                                .map((monthIndex) => (
                                <button
                                  key={monthIndex}
                                  onClick={() => {
                                    setSelectedYear(year.toString());
                                    setSelectedMonth(monthIndex.toString());
                                  }}
                                  className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-muted/50 transition-colors text-sm"
                                >
                                  <span>{months[monthIndex]}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {groupedPosts[year][monthIndex].length}
                                  </Badge>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedYear || selectedMonth || selectedCategory ? 'Filtered Results' : 'All Articles'}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    {selectedYear && ` in ${selectedYear}`}
                    {selectedMonth && ` - ${months[parseInt(selectedMonth)]}`}
                    {selectedCategory && ` in ${categories.find(c => c._id === selectedCategory)?.name}`}
                  </p>
                </div>
              </div>

              {/* Articles List */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Loading articles...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Articles Found</h3>
                    <p className="text-muted-foreground mb-4">
                      No articles match your current filters. Try adjusting your selection.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedYear('');
                        setSelectedMonth('');
                        setSelectedCategory('');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post._id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Featured Image */}
                          {post.featuredImage?.url && (
                            <div className="md:w-48 md:flex-shrink-0">
                              <img
                                src={getImageUrl(post.featuredImage.url, 'http://localhost:5000')}
                                alt={post.featuredImage.alt || post.title}
                                className="w-full h-32 md:h-24 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-3">
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
                              <span className="text-sm text-muted-foreground">
                                {formatDate(post.publishedAt)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formatRelativeTime(post.publishedAt)}
                              </span>
                            </div>
                            
                            <Link 
                              to={`/blog/${post.slug}`}
                              className="block hover:text-primary transition-colors"
                            >
                              <h3 className="text-xl font-semibold line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            
                            <p className="text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 4).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Meta */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchivePage;

