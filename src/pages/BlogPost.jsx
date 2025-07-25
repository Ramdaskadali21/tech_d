import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  ArrowLeft,
  User,
  Tag,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Comments from '@/components/Comments';
import { postsAPI } from '../services/api';
import { 
  formatDate, 
  formatRelativeTime, 
  formatReadingTime, 
  getImageUrl,
  generateMetaTags,
  copyToClipboard,
  getShareUrl
} from '../utils/helpers';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await postsAPI.getPost(slug);
        const postData = response.data.data.post;
        
        setPost(postData);
        setLikes(postData.likes || 0);
        setRelatedPosts(postData.relatedPosts || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Post not found');
        } else {
          setError('Failed to load post. Please try again later.');
        }
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleLike = async () => {
    if (!post || isLiked) return;

    try {
      await postsAPI.likePost(post._id);
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = post.title;
    const description = post.excerpt;

    if (platform === 'copy') {
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return;
    }

    const shareUrl = getShareUrl(platform, url, title, description);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Custom markdown components
  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading article...</p>
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
          <div className="space-x-2">
            <Button onClick={() => navigate('/')}>Go Home</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const metaTags = generateMetaTags(post);

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta name="author" content={metaTags.author} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:type" content={metaTags.type} />
        <meta property="og:url" content={metaTags.url} />
        {metaTags.image && <meta property="og:image" content={getImageUrl(metaTags.image, 'http://localhost:5000')} />}
        <meta property="article:published_time" content={metaTags.publishedTime} />
        <meta property="article:modified_time" content={metaTags.modifiedTime} />
        <meta property="article:section" content={metaTags.section} />
        {metaTags.tags && metaTags.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        {metaTags.image && <meta name="twitter:image" content={getImageUrl(metaTags.image, 'http://localhost:5000')} />}
      </Helmet>

      <article className="min-h-screen bg-background">
        {/* Back Navigation */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link 
                to={`/category/${post.category.slug}`}
                className="hover:text-foreground"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8 space-y-6">
              {/* Category Badge */}
              <Badge 
                variant="secondary"
                className="text-sm"
                style={{ 
                  backgroundColor: `${post.category.color}20`,
                  color: post.category.color,
                  borderColor: `${post.category.color}40`
                }}
              >
                {post.category.name}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatReadingTime(post.readingTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views || 0} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>{likes} likes</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={getImageUrl(post.author.avatar, 'http://localhost:5000')} 
                    alt={post.author.fullName}
                  />
                  <AvatarFallback>
                    {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    Published {formatRelativeTime(post.publishedAt)}
                  </p>
                </div>
              </div>

              {/* Featured Image */}
              {post.featuredImage?.url && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={getImageUrl(post.featuredImage.url, 'http://localhost:5000')}
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.featuredImage.caption && (
                    <p className="text-sm text-muted-foreground text-center mt-2 italic">
                      {post.featuredImage.caption}
                    </p>
                  )}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <ReactMarkdown components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/search?q=${encodeURIComponent(tag)}`}
                    >
                      <Badge 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            {post.externalLinks && post.externalLinks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Related Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.externalLinks
                    .sort((a, b) => {
                      // Sort by default first, then by order
                      if (a.isDefault && !b.isDefault) return -1;
                      if (!a.isDefault && b.isDefault) return 1;
                      return (a.order || 0) - (b.order || 0);
                    })
                    .map((link, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm">{link.title}</h4>
                            {link.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        
                        {link.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {link.description}
                          </p>
                        )}
                        
                        <a
                          href={link.url}
                          target={link.openInNewTab ? "_blank" : "_self"}
                          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <span className="truncate">{link.url}</span>
                          {link.openInNewTab && (
                            <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                          )}
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-muted/50 rounded-lg mb-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  disabled={isLiked}
                  className="flex items-center space-x-2"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="flex items-center space-x-1"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <Comments postId={post._id} />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost._id} className="group hover:shadow-lg transition-all duration-300">
                      {relatedPost.featuredImage?.url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={getImageUrl(relatedPost.featuredImage.url, 'http://localhost:5000')}
                            alt={relatedPost.featuredImage.alt || relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <Link 
                          to={`/blog/${relatedPost.slug}`}
                          className="block group-hover:text-primary transition-colors"
                        >
                          <h4 className="font-semibold line-clamp-2 mb-2">
                            {relatedPost.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {formatRelativeTime(relatedPost.publishedAt)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;

