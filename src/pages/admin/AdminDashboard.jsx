import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Eye, 
  TrendingUp, 
  Plus,
  Edit,
  Calendar,
  Clock,
  Heart,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { postsAPI, categoriesAPI } from '../../services/api';
import { formatDate, formatRelativeTime, formatNumber } from '../../utils/helpers';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dashboard data
        const [postsRes, categoriesRes, statsRes] = await Promise.all([
          postsAPI.getPosts({ limit: 5, sort: 'latest' }),
          categoriesAPI.getCategoriesWithCounts(),
          postsAPI.getStats()
        ]);

        setRecentPosts(postsRes.data.data.posts);
        setCategories(categoriesRes.data.data.categories);
        setStats(statsRes.data.data.stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Total Likes',
      value: stats.totalLikes,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Comments',
      value: stats.totalComments,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      title: 'New Post',
      description: 'Create a new blog post',
      href: '/admin/posts/new',
      icon: Plus,
      color: 'bg-primary text-primary-foreground'
    },
    {
      title: 'Manage Posts',
      description: 'View and edit existing posts',
      href: '/admin/posts',
      icon: Edit,
      color: 'bg-secondary text-secondary-foreground'
    },
    {
      title: 'Categories',
      description: 'Manage blog categories',
      href: '/admin/categories',
      icon: BarChart3,
      color: 'bg-accent text-accent-foreground'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Tech Blog</title>
        <meta name="description" content="Admin dashboard for managing Tech Blog content" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your blog.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button asChild>
                  <Link to="/admin/posts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">View Site</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(stat.value)}
                        </p>
                        <p className={`text-xs ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Posts</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/posts">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={post._id}>
                        <div className="flex items-start space-x-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
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
                              <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                {post.status}
                              </Badge>
                            </div>
                            <Link 
                              to={`/admin/posts/edit/${post._id}`}
                              className="block hover:text-primary transition-colors"
                            >
                              <h4 className="font-medium line-clamp-1">
                                {post.title}
                              </h4>
                            </Link>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
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
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/admin/posts/edit/${post._id}`}>
                              <Edit className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                        {index < recentPosts.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto p-4"
                        asChild
                      >
                        <Link to={action.href}>
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{action.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {action.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Categories Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.slice(0, 5).map((category) => (
                      <div key={category._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {category.postCount || 0}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                      <Link to="/admin/categories">Manage Categories</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>New post published</span>
                      <span className="text-muted-foreground ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Post updated</span>
                      <span className="text-muted-foreground ml-auto">4h ago</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>New category created</span>
                      <span className="text-muted-foreground ml-auto">1d ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

