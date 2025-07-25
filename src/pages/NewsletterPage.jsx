import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Users, 
  Calendar,
  Sparkles,
  Bell,
  Star,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const features = [
    {
      icon: Bell,
      title: 'Weekly Tech Roundup',
      description: 'Get the most important tech news and updates delivered every Tuesday.'
    },
    {
      icon: Star,
      title: 'Exclusive Content',
      description: 'Access subscriber-only articles, early previews, and behind-the-scenes content.'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Join discussions with fellow tech enthusiasts and share your thoughts.'
    },
    {
      icon: Shield,
      title: 'No Spam Promise',
      description: 'We respect your inbox. Unsubscribe anytime with a single click.'
    }
  ];

  const stats = [
    { number: '25K+', label: 'Subscribers' },
    { number: '98%', label: 'Open Rate' },
    { number: '3+', label: 'Years Running' },
    { number: '0', label: 'Spam Complaints' }
  ];

  const recentIssues = [
    {
      title: 'AI Revolution: How ChatGPT Changed Everything',
      date: 'January 15, 2025',
      topics: ['AI', 'Machine Learning', 'ChatGPT'],
      excerpt: 'A deep dive into the impact of conversational AI on various industries...'
    },
    {
      title: 'The Future of Mobile: Foldable Phones in 2025',
      date: 'January 8, 2025',
      topics: ['Mobile', 'Hardware', 'Innovation'],
      excerpt: 'Exploring the latest developments in foldable phone technology...'
    },
    {
      title: 'Cybersecurity Trends to Watch This Year',
      date: 'January 1, 2025',
      topics: ['Security', 'Privacy', 'Trends'],
      excerpt: 'Essential cybersecurity insights for individuals and businesses...'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Newsletter - Tech Blog</title>
        <meta name="description" content="Subscribe to our weekly tech newsletter for the latest news, insights, and exclusive content delivered to your inbox." />
        <meta name="keywords" content="newsletter, tech news, weekly updates, technology insights, subscribe" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Weekly Tech Insights</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Stay Ahead of Tech
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands of tech enthusiasts who get the latest insights, trends, and exclusive content 
                delivered to their inbox every week.
              </p>
              
              {/* Subscription Form */}
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 px-4 py-3 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="px-6 py-3 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Free forever. No spam. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-lg font-semibold">Successfully Subscribed!</span>
                  </div>
                  <p className="text-muted-foreground">
                    Thank you for subscribing! You'll receive your first newsletter on Tuesday.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Issues Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Recent Newsletter Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentIssues.map((issue, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{issue.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold line-clamp-2">{issue.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm line-clamp-3">{issue.excerpt}</p>
                    <div className="flex flex-wrap gap-1">
                      {issue.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">How often will I receive newsletters?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We send out our newsletter every Tuesday morning. You'll receive one email per week 
                    with the latest tech news, insights, and exclusive content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Can I unsubscribe anytime?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely! Every newsletter includes an unsubscribe link at the bottom. 
                    You can unsubscribe with a single click, no questions asked.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Do you share my email with third parties?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Never. We respect your privacy and will never share, sell, or rent your email 
                    address to any third parties. Your information is safe with us.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">What type of content do you cover?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our newsletter covers the latest in technology news, AI developments, gadget reviews, 
                    how-to guides, industry insights, and exclusive content not available on our website.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Is the newsletter free?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, our newsletter is completely free and always will be. We believe in making 
                    quality tech content accessible to everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final CTA Section */}
          {!isSubscribed && (
            <section className="text-center">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="pt-8 pb-8">
                  <h2 className="text-2xl font-bold mb-4">Ready to Stay Informed?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join our community of tech enthusiasts and never miss out on the latest developments 
                    in technology. Subscribe now and get your first newsletter this Tuesday!
                  </p>
                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-4 py-3 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="px-6 py-3 flex items-center space-x-2"
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Mail className="h-4 w-4" />
                            <span>Subscribe Now</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsletterPage;

