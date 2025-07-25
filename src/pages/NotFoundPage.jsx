import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  FileQuestion,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const popularPages = [
    {
      title: 'Latest Tech News',
      description: 'Stay updated with the newest technology trends',
      href: '/category/tech-news',
      icon: TrendingUp
    },
    {
      title: 'How-To Guides',
      description: 'Step-by-step tutorials for tech enthusiasts',
      href: '/category/tech-how-to-guides',
      icon: FileQuestion
    },
    {
      title: 'AI Tools & Apps',
      description: 'Discover productivity-boosting AI applications',
      href: '/category/ai-tools-productivity-apps',
      icon: Search
    }
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found - Tech Blog</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our latest tech articles, guides, and AI tool reviews instead." />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* 404 Illustration */}
            <div className="space-y-6">
              <div className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
                404
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Oops! Page Not Found
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The page you're looking for seems to have vanished into the digital void. 
                  But don't worry, we've got plenty of great content to explore!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate(-1)} variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/search">
                  <Search className="mr-2 h-4 w-4" />
                  Search Articles
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="pt-8">
              <h2 className="text-2xl font-semibold mb-6">
                Or explore these popular sections:
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularPages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {page.description}
                          </p>
                        </div>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to={page.href}>
                            Explore
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Help Text */}
            <div className="pt-8 border-t">
              <p className="text-muted-foreground">
                If you believe this is an error or you were looking for something specific, 
                please <Link to="/contact" className="text-primary hover:underline">contact us</Link> and 
                we'll help you find what you need.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

